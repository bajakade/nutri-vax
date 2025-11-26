import json
import os
import uuid
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from nutrivax_app.models import (
    AdministrativeLevel, AdministrativeDivision, FacilityType, Facility
)


class Command(BaseCommand):
    help = 'Import location data from JSON files (AdminLevel, AdminDivision, FacilityType, Facility)'

    def add_arguments(self, parser):
        parser.add_argument(
            '--admin-level',
            type=str,
            help='Path to location.AdminLevel.json file'
        )
        parser.add_argument(
            '--admin-division',
            type=str,
            help='Path to location.AdminDivision.json file'
        )
        parser.add_argument(
            '--facility-type',
            type=str,
            help='Path to location.FacilityType.json file'
        )
        parser.add_argument(
            '--facility',
            type=str,
            nargs='+',
            help='Path(s) to location.Facility*.json file(s)'
        )
        parser.add_argument(
            '--all',
            type=str,
            help='Directory containing all JSON files (will auto-detect files)'
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Run without actually creating records (for testing)',
        )

    def handle(self, *args, **options):
        self.dry_run = options['dry_run']
        
        if self.dry_run:
            self.stdout.write(self.style.WARNING('DRY RUN MODE - No records will be created'))

        # If --all is specified, auto-detect files
        if options['all']:
            base_dir = options['all']
            options['admin_level'] = options['admin_level'] or os.path.join(base_dir, 'location.AdminLevel.json')
            options['admin_division'] = options['admin_division'] or os.path.join(base_dir, 'location.AdminDivision.json')
            options['facility_type'] = options['facility_type'] or os.path.join(base_dir, 'location.FacilityType.json')
            if not options['facility']:
                facility_files = []
                for i in range(1, 10):  # Check for Facility01.json through Facility09.json
                    file_path = os.path.join(base_dir, f'location.Facility{i:02d}.json')
                    if os.path.exists(file_path):
                        facility_files.append(file_path)
                options['facility'] = facility_files if facility_files else None

        stats = {
            'admin_levels_created': 0,
            'admin_levels_existing': 0,
            'admin_divisions_created': 0,
            'admin_divisions_existing': 0,
            'facility_types_created': 0,
            'facility_types_existing': 0,
            'facilities_created': 0,
            'facilities_existing': 0,
        }

        try:
            with transaction.atomic():
                # Import AdministrativeLevel
                if options['admin_level']:
                    self.import_admin_levels(options['admin_level'], stats)

                # Import FacilityType (needed before Facility)
                if options['facility_type']:
                    self.import_facility_types(options['facility_type'], stats)

                # Import AdministrativeDivision (needed before Facility)
                if options['admin_division']:
                    self.import_admin_divisions(options['admin_division'], stats)

                # Import Facilities
                if options['facility']:
                    for facility_file in options['facility']:
                        self.import_facilities(facility_file, stats)

                if self.dry_run:
                    transaction.set_rollback(True)
                    self.stdout.write(self.style.WARNING('\nDRY RUN - Transaction rolled back'))

        except Exception as e:
            raise CommandError(f'Error importing data: {str(e)}')

        # Print summary
        self.stdout.write(self.style.SUCCESS('\n=== Import Summary ==='))
        self.stdout.write(f'Administrative Levels - Created: {stats["admin_levels_created"]}, Existing: {stats["admin_levels_existing"]}')
        self.stdout.write(f'Administrative Divisions - Created: {stats["admin_divisions_created"]}, Existing: {stats["admin_divisions_existing"]}')
        self.stdout.write(f'Facility Types - Created: {stats["facility_types_created"]}, Existing: {stats["facility_types_existing"]}')
        self.stdout.write(f'Facilities - Created: {stats["facilities_created"]}, Existing: {stats["facilities_existing"]}')
        
        total_created = (
            stats['admin_levels_created'] + stats['admin_divisions_created'] + 
            stats['facility_types_created'] + stats['facilities_created']
        )
        self.stdout.write(self.style.SUCCESS(f'\nTotal records created: {total_created}'))

    def import_admin_levels(self, file_path, stats):
        """Import AdministrativeLevel records from JSON file."""
        if not os.path.exists(file_path):
            raise CommandError(f'File "{file_path}" does not exist.')

        self.stdout.write(self.style.SUCCESS(f'Importing AdministrativeLevel from: {file_path}'))
        
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        for item in data:
            try:
                if 'pk' not in item:
                    self.stdout.write(self.style.WARNING(f'  Skipping item without pk'))
                    continue
                pk = uuid.UUID(item['pk'])
                fields = item.get('fields', {})
                
                if 'name' not in fields:
                    self.stdout.write(self.style.WARNING(f'  Skipping item {pk} without name field'))
                    continue
                
                parent = None
                if fields.get('parent'):
                    try:
                        parent = AdministrativeLevel.objects.get(id=uuid.UUID(fields['parent']))
                    except AdministrativeLevel.DoesNotExist:
                        self.stdout.write(
                            self.style.WARNING(f'  Warning: Parent {fields["parent"]} not found for {fields["name"]}')
                        )

                if self.dry_run:
                    try:
                        AdministrativeLevel.objects.get(id=pk)
                        stats['admin_levels_existing'] += 1
                    except AdministrativeLevel.DoesNotExist:
                        stats['admin_levels_created'] += 1
                else:
                    obj, created = AdministrativeLevel.objects.get_or_create(
                        id=pk,
                        defaults={
                            'is_active': fields.get('is_active', True),
                            'name': fields['name'],
                            'details': fields.get('details', ''),
                            'parent': parent,
                            'order': fields.get('order', 0),
                        }
                    )
                    if created:
                        stats['admin_levels_created'] += 1
                        self.stdout.write(f'  Created: {obj.name}')
                    else:
                        stats['admin_levels_existing'] += 1

            except Exception as e:
                self.stdout.write(self.style.ERROR(f'  Error importing {item.get("pk", "unknown")}: {str(e)}'))
                if not self.dry_run:
                    raise

    def import_admin_divisions(self, file_path, stats):
        """Import AdministrativeDivision records from JSON file."""
        if not os.path.exists(file_path):
            raise CommandError(f'File "{file_path}" does not exist.')

        self.stdout.write(self.style.SUCCESS(f'Importing AdministrativeDivision from: {file_path}'))
        
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        for item in data:
            try:
                if 'pk' not in item:
                    self.stdout.write(self.style.WARNING(f'  Skipping item without pk'))
                    continue
                pk = uuid.UUID(item['pk'])
                fields = item.get('fields', {})
                
                if 'name' not in fields:
                    self.stdout.write(self.style.WARNING(f'  Skipping item {pk} without name field'))
                    continue
                
                parent = None
                if fields.get('parent'):
                    try:
                        parent = AdministrativeDivision.objects.get(id=uuid.UUID(fields['parent']))
                    except AdministrativeDivision.DoesNotExist:
                        self.stdout.write(
                            self.style.WARNING(f'  Warning: Parent {fields["parent"]} not found for {fields["name"]}')
                        )

                level = None
                if fields.get('level'):
                    try:
                        level = AdministrativeLevel.objects.get(id=uuid.UUID(fields['level']))
                    except AdministrativeLevel.DoesNotExist:
                        self.stdout.write(
                            self.style.ERROR(f'  Error: Level {fields["level"]} not found for {fields["name"]}')
                        )
                        continue

                if self.dry_run:
                    try:
                        AdministrativeDivision.objects.get(id=pk)
                        stats['admin_divisions_existing'] += 1
                    except AdministrativeDivision.DoesNotExist:
                        stats['admin_divisions_created'] += 1
                else:
                    obj, created = AdministrativeDivision.objects.get_or_create(
                        id=pk,
                        defaults={
                            'is_active': fields.get('is_active', True),
                            'code': fields.get('code', ''),
                            'name': fields['name'],
                            'details': fields.get('details', ''),
                            'parent': parent,
                            'level': level,
                        }
                    )
                    if created:
                        stats['admin_divisions_created'] += 1
                        if stats['admin_divisions_created'] % 100 == 0:
                            self.stdout.write(f'  Created {stats["admin_divisions_created"]} divisions...')
                    else:
                        stats['admin_divisions_existing'] += 1

            except Exception as e:
                self.stdout.write(self.style.ERROR(f'  Error importing {item.get("pk", "unknown")}: {str(e)}'))
                if not self.dry_run:
                    raise

        self.stdout.write(f'  Total divisions processed: {stats["admin_divisions_created"] + stats["admin_divisions_existing"]}')

    def import_facility_types(self, file_path, stats):
        """Import FacilityType records from JSON file."""
        if not os.path.exists(file_path):
            raise CommandError(f'File "{file_path}" does not exist.')

        self.stdout.write(self.style.SUCCESS(f'Importing FacilityType from: {file_path}'))
        
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        for item in data:
            try:
                if 'pk' not in item:
                    self.stdout.write(self.style.WARNING(f'  Skipping item without pk'))
                    continue
                pk = uuid.UUID(item['pk'])
                fields = item.get('fields', {})
                
                if 'name' not in fields:
                    self.stdout.write(self.style.WARNING(f'  Skipping item {pk} without name field'))
                    continue

                if self.dry_run:
                    try:
                        FacilityType.objects.get(id=pk)
                        stats['facility_types_existing'] += 1
                    except FacilityType.DoesNotExist:
                        stats['facility_types_created'] += 1
                else:
                    obj, created = FacilityType.objects.get_or_create(
                        id=pk,
                        defaults={
                            'is_active': fields.get('is_active', True),
                            'name': fields['name'],
                            'details': fields.get('details', ''),
                            'order': fields.get('order', 0),
                        }
                    )
                    if created:
                        stats['facility_types_created'] += 1
                        self.stdout.write(f'  Created: {obj.name}')
                    else:
                        stats['facility_types_existing'] += 1

            except Exception as e:
                self.stdout.write(self.style.ERROR(f'  Error importing {item.get("pk", "unknown")}: {str(e)}'))
                if not self.dry_run:
                    raise

    def import_facilities(self, file_path, stats):
        """Import Facility records from JSON file."""
        if not os.path.exists(file_path):
            raise CommandError(f'File "{file_path}" does not exist.')

        self.stdout.write(self.style.SUCCESS(f'Importing Facility from: {file_path}'))
        
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        for item in data:
            try:
                # Some Facility records might not have pk, generate one
                if 'pk' not in item:
                    pk = uuid.uuid4()
                    self.stdout.write(self.style.WARNING(f'  Generated UUID for facility without pk'))
                else:
                    pk = uuid.UUID(item['pk'])
                fields = item.get('fields', {})
                
                if 'name' not in fields:
                    self.stdout.write(self.style.WARNING(f'  Skipping facility {pk} without name field'))
                    continue
                
                facility_type = None
                if fields.get('type'):
                    try:
                        facility_type = FacilityType.objects.get(id=uuid.UUID(fields['type']))
                    except FacilityType.DoesNotExist:
                        self.stdout.write(
                            self.style.ERROR(f'  Error: FacilityType {fields["type"]} not found for {fields["name"]}')
                        )
                        continue

                admin_division_1 = None
                if fields.get('admin_division_1'):
                    try:
                        admin_division_1 = AdministrativeDivision.objects.get(id=uuid.UUID(fields['admin_division_1']))
                    except AdministrativeDivision.DoesNotExist:
                        self.stdout.write(
                            self.style.WARNING(f'  Warning: AdminDivision1 {fields["admin_division_1"]} not found for {fields["name"]}')
                        )

                admin_division_2 = None
                if fields.get('admin_division_2'):
                    try:
                        admin_division_2 = AdministrativeDivision.objects.get(id=uuid.UUID(fields['admin_division_2']))
                    except AdministrativeDivision.DoesNotExist:
                        self.stdout.write(
                            self.style.WARNING(f'  Warning: AdminDivision2 {fields["admin_division_2"]} not found for {fields["name"]}')
                        )

                if self.dry_run:
                    try:
                        Facility.objects.get(id=pk)
                        stats['facilities_existing'] += 1
                    except Facility.DoesNotExist:
                        stats['facilities_created'] += 1
                else:
                    obj, created = Facility.objects.get_or_create(
                        id=pk,
                        defaults={
                            'is_active': fields.get('is_active', True),
                            'name': fields['name'],
                            'type': facility_type,
                            'admin_division_1': admin_division_1,
                            'admin_division_2': admin_division_2,
                        }
                    )
                    if created:
                        stats['facilities_created'] += 1
                        if stats['facilities_created'] % 1000 == 0:
                            self.stdout.write(f'  Created {stats["facilities_created"]} facilities...')
                    else:
                        stats['facilities_existing'] += 1

            except Exception as e:
                self.stdout.write(self.style.ERROR(f'  Error importing facility {item.get("pk", "unknown")}: {str(e)}'))
                if not self.dry_run:
                    raise

        self.stdout.write(f'  Total facilities processed: {stats["facilities_created"] + stats["facilities_existing"]}')

