"""
Script to fix database by creating missing tables.
This will check which tables exist and create only the missing ones.
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nutrivax_project.settings')
django.setup()

from django.db import connection
from django.core.management import execute_from_command_line
import sys

def table_exists(table_name):
    """Check if a table exists in the database."""
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = %s
            );
        """, [table_name])
        return cursor.fetchone()[0]

def main():
    print("Checking database tables...")
    
    tables_to_check = [
        'project',
        'adminLevel',
        'adminDivision',
        'facilityType',
        'facility',
        'user_profile',
        'distributionRegister',
        'rationCard'
    ]
    
    missing_tables = []
    existing_tables = []
    
    for table in tables_to_check:
        if table_exists(table):
            existing_tables.append(table)
            print(f"[OK] {table} exists")
        else:
            missing_tables.append(table)
            print(f"[MISSING] {table} MISSING")
    
    if not missing_tables:
        print("\nAll tables exist! Running migrations to ensure consistency...")
        execute_from_command_line(['manage.py', 'migrate', '--fake'])
        return
    
    print(f"\nFound {len(missing_tables)} missing tables.")
    print("Attempting to create missing tables...")
    
    # Try to run migrations
    try:
        # First, fake-unapply to reset state
        print("Resetting migration state...")
        execute_from_command_line(['manage.py', 'migrate', 'nutrivax_app', 'zero', '--fake'])
        
        # Then apply migrations
        print("Applying migrations...")
        execute_from_command_line(['manage.py', 'migrate', 'nutrivax_app'])
        
        print("\n[SUCCESS] Migrations applied successfully!")
        
    except Exception as e:
        print(f"\n[ERROR] Migration failed: {e}")
        print("\nYou may need to:")
        print("1. Manually create the missing tables using SQL")
        print("2. Or drop all tables and start fresh")
        print("3. Or use a database management tool")
        return
    
    # Verify tables were created
    print("\nVerifying tables...")
    for table in missing_tables:
        if table_exists(table):
            print(f"[OK] {table} now exists")
        else:
            print(f"[ERROR] {table} still missing - manual intervention needed")

if __name__ == '__main__':
    main()

