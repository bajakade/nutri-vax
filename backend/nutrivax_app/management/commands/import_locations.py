import csv
import os
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from nutrivax_app.models import Location


class Command(BaseCommand):
    help = 'Import locations from a CSV file with hierarchical structure'

    def add_arguments(self, parser):
        parser.add_argument(
            'csv_file',
            type=str,
            help='Path to the CSV file to import'
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Run without actually creating records (for testing)',
        )

    def handle(self, *args, **options):
        csv_file_path = options['csv_file']
        self.dry_run = options['dry_run']

        if not os.path.exists(csv_file_path):
            raise CommandError(f'CSV file "{csv_file_path}" does not exist.')

        self.stdout.write(self.style.SUCCESS(f'Reading CSV file: {csv_file_path}'))

        try:
            with open(csv_file_path, 'r', encoding='utf-8') as file:
                reader = csv.DictReader(file)

                # Validate required columns
                required_columns = ['state_name', 'lga_name', 'ward_name', 'phcc_name']
                if not all(col in reader.fieldnames for col in required_columns):
                    missing = [col for col in required_columns if col not in reader.fieldnames]
                    raise CommandError(
                        f'CSV file is missing required columns: {", ".join(missing)}'
                    )

                stats = {
                    'states_created': 0,
                    'lgas_created': 0,
                    'wards_created': 0,
                    'phccs_created': 0,
                    'settlements_created': 0,
                    'states_existing': 0,
                    'lgas_existing': 0,
                    'wards_existing': 0,
                    'phccs_existing': 0,
                    'settlements_existing': 0,
                }

                if self.dry_run:
                    self.stdout.write(self.style.WARNING('DRY RUN MODE - No records will be created'))

                with transaction.atomic():
                    for row_num, row in enumerate(reader, start=2):  # Start at 2 because row 1 is header
                        try:
                            # Get or create State
                            state_name = row['state_name'].strip() if row.get('state_name') else None
                            if state_name:
                                state, created = self.get_or_create_location(
                                    name=state_name,
                                    location_type='STATE',
                                    parent=None
                                )
                                if created:
                                    stats['states_created'] += 1
                                    if not self.dry_run:
                                        self.stdout.write(f'  Created STATE: {state_name}')
                                else:
                                    stats['states_existing'] += 1
                            else:
                                self.stdout.write(
                                    self.style.WARNING(f'Row {row_num}: Missing state_name, skipping row')
                                )
                                continue

                            # Get or create LGA
                            lga_name = row['lga_name'].strip() if row.get('lga_name') else None
                            if lga_name:
                                lga, created = self.get_or_create_location(
                                    name=lga_name,
                                    location_type='LGA',
                                    parent=state
                                )
                                if created:
                                    stats['lgas_created'] += 1
                                    if not self.dry_run:
                                        self.stdout.write(f'  Created LGA: {lga_name} (under {state_name})')
                                else:
                                    stats['lgas_existing'] += 1
                            else:
                                self.stdout.write(
                                    self.style.WARNING(f'Row {row_num}: Missing lga_name, skipping LGA creation')
                                )

                            # Get or create Ward
                            ward_name = row['ward_name'].strip() if row.get('ward_name') else None
                            if ward_name and lga_name:
                                ward, created = self.get_or_create_location(
                                    name=ward_name,
                                    location_type='WARD',
                                    parent=lga
                                )
                                if created:
                                    stats['wards_created'] += 1
                                    if not self.dry_run:
                                        self.stdout.write(f'  Created WARD: {ward_name} (under {lga_name})')
                                else:
                                    stats['wards_existing'] += 1
                            else:
                                if ward_name:
                                    self.stdout.write(
                                        self.style.WARNING(f'Row {row_num}: Missing lga_name, skipping WARD creation')
                                    )

                            # Get or create PHCC
                            phcc_name = row['phcc_name'].strip() if row.get('phcc_name') else None
                            if phcc_name:
                                # PHCC can be under Ward or LGA (depending on hierarchy)
                                phcc_parent = ward if ward_name and lga_name else lga if lga_name else state
                                phcc, created = self.get_or_create_location(
                                    name=phcc_name,
                                    location_type='PHCC',
                                    parent=phcc_parent
                                )
                                if created:
                                    stats['phccs_created'] += 1
                                    if not self.dry_run:
                                        self.stdout.write(f'  Created PHCC: {phcc_name} (under {phcc_parent.name})')
                                else:
                                    stats['phccs_existing'] += 1
                            else:
                                self.stdout.write(
                                    self.style.WARNING(f'Row {row_num}: Missing phcc_name, skipping PHCC creation')
                                )

                            # Get or create Settlement (optional)
                            settlement_name = row.get('settlement_name', '').strip()
                            if settlement_name:
                                # Settlement is typically under PHCC or Ward
                                settlement_parent = phcc if phcc_name else ward if ward_name else lga if lga_name else state
                                settlement, created = self.get_or_create_location(
                                    name=settlement_name,
                                    location_type='SETTLEMENT',
                                    parent=settlement_parent
                                )
                                if created:
                                    stats['settlements_created'] += 1
                                    if not self.dry_run:
                                        self.stdout.write(f'  Created SETTLEMENT: {settlement_name} (under {settlement_parent.name})')
                                else:
                                    stats['settlements_existing'] += 1

                        except Exception as e:
                            self.stdout.write(
                                self.style.ERROR(f'Error processing row {row_num}: {str(e)}')
                            )
                            if not self.dry_run:
                                raise

                    if self.dry_run:
                        # Rollback transaction in dry-run mode
                        transaction.set_rollback(True)
                        self.stdout.write(self.style.WARNING('\nDRY RUN - Transaction rolled back'))

        except Exception as e:
            raise CommandError(f'Error reading CSV file: {str(e)}')

        # Print summary
        self.stdout.write(self.style.SUCCESS('\n=== Import Summary ==='))
        self.stdout.write(f'States - Created: {stats["states_created"]}, Existing: {stats["states_existing"]}')
        self.stdout.write(f'LGAs - Created: {stats["lgas_created"]}, Existing: {stats["lgas_existing"]}')
        self.stdout.write(f'Wards - Created: {stats["wards_created"]}, Existing: {stats["wards_existing"]}')
        self.stdout.write(f'PHCCs - Created: {stats["phccs_created"]}, Existing: {stats["phccs_existing"]}')
        self.stdout.write(f'Settlements - Created: {stats["settlements_created"]}, Existing: {stats["settlements_existing"]}')

        total_created = (
            stats['states_created'] + stats['lgas_created'] +
            stats['wards_created'] + stats['phccs_created'] +
            stats['settlements_created']
        )
        self.stdout.write(self.style.SUCCESS(f'\nTotal locations created: {total_created}'))

    def get_or_create_location(self, name, location_type, parent=None):
        """
        Get or create a location with the given parameters.
        Uses get_or_create to handle duplicates gracefully.
        """
        if self.dry_run:
            # In dry-run, just check if it exists
            try:
                location = Location.objects.get(
                    name=name,
                    type=location_type,
                    parent=parent
                )
                return location, False
            except Location.DoesNotExist:
                # Create a mock object for dry-run
                class MockLocation:
                    def __init__(self, name, type, parent):
                        self.name = name
                        self.type = type
                        self.parent = parent
                return MockLocation(name, location_type, parent), True

        location, created = Location.objects.get_or_create(
            name=name,
            type=location_type,
            parent=parent,
            defaults={'name': name, 'type': location_type, 'parent': parent}
        )
        return location, created
