#!/usr/bin/env python
"""
Quick script to bulk migrate facility-project relationships.
Use this if the migration is taking too long.
Run this AFTER the facility_project table has been created by the migration.
"""

import os
import sys
import django

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nutrivax_project.settings')
django.setup()

from django.db import connection, transaction

def bulk_migrate():
    """Bulk migrate using raw SQL - much faster."""
    print("=" * 60)
    print("Bulk Migrating Facility-Project Relationships")
    print("=" * 60)

    with connection.cursor() as cursor:
        # Check if facility_project table exists
        cursor.execute("""
            SELECT table_name
            FROM information_schema.tables
            WHERE table_name = 'facility_project'
        """)
        if not cursor.fetchone():
            print("[ERROR] facility_project table does not exist!")
            print("Please run the migration first to create the table.")
            return

        # Check if old project_id column exists
        cursor.execute("""
            SELECT column_name
            FROM information_schema.columns
            WHERE table_name = 'facility'
            AND column_name = 'project_id'
        """)
        if not cursor.fetchone():
            print("[INFO] Old project_id column doesn't exist. Migration may already be complete.")
            return

        # Count existing relationships
        cursor.execute("SELECT COUNT(*) FROM facility_project")
        existing = cursor.fetchone()[0]
        print(f"Existing relationships: {existing}")

        # Count facilities to migrate
        cursor.execute("SELECT COUNT(*) FROM facility WHERE project_id IS NOT NULL")
        to_migrate = cursor.fetchone()[0]
        print(f"Facilities to migrate: {to_migrate}")

        if to_migrate == 0:
            print("[INFO] No facilities to migrate.")
            return

        print("\nStarting bulk migration...")

        with transaction.atomic():
            # Bulk insert - much faster than individual adds
            cursor.execute("""
                INSERT INTO facility_project (facility_id, project_id)
                SELECT f.id, f.project_id
                FROM facility f
                WHERE f.project_id IS NOT NULL
                AND NOT EXISTS (
                    SELECT 1 FROM facility_project fp
                    WHERE fp.facility_id = f.id AND fp.project_id = f.project_id
                )
            """)

            migrated = cursor.rowcount
            print(f"[OK] Successfully migrated {migrated} relationships!")

        # Verify
        cursor.execute("SELECT COUNT(*) FROM facility_project")
        total = cursor.fetchone()[0]
        print(f"[OK] Total relationships in facility_project table: {total}")

if __name__ == '__main__':
    bulk_migrate()
