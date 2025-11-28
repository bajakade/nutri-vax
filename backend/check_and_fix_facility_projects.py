#!/usr/bin/env python
"""
Script to check and fix Facility-Project many-to-many relationships.
This script verifies the migration was successful and fixes any issues.
"""

import os
import sys
import django

# Setup Django
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nutrivax_project.settings')
django.setup()

from django.db import connection, transaction
from nutrivax_app.models import Facility, Project


def check_database_state():
    """Check the current state of the database."""
    print("=" * 60)
    print("Checking Database State")
    print("=" * 60)
    
    with connection.cursor() as cursor:
        # Check if facility table has project_id column (old ForeignKey)
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'facility' 
            AND column_name = 'project_id'
        """)
        has_old_field = cursor.fetchone() is not None
        
        # Check if facility_project table exists (new ManyToMany)
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_name = 'facility_project'
        """)
        has_m2m_table = cursor.fetchone() is not None
        
        print(f"[OK] Old 'project_id' column exists: {has_old_field}")
        print(f"[OK] Many-to-many table 'facility_project' exists: {has_m2m_table}")
        
        if has_old_field:
            # Count facilities with old project_id
            cursor.execute("SELECT COUNT(*) FROM facility WHERE project_id IS NOT NULL")
            count = cursor.fetchone()[0]
            print(f"[OK] Facilities with old project_id: {count}")
        
        if has_m2m_table:
            # Count relationships in many-to-many table
            cursor.execute("SELECT COUNT(*) FROM facility_project")
            count = cursor.fetchone()[0]
            print(f"[OK] Relationships in facility_project table: {count}")
        
        return has_old_field, has_m2m_table


def migrate_data_manually():
    """Manually migrate data from old ForeignKey to new ManyToMany."""
    print("\n" + "=" * 60)
    print("Migrating Data Manually")
    print("=" * 60)
    
    with connection.cursor() as cursor:
        # Check if old field exists
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'facility' 
            AND column_name = 'project_id'
        """)
        if not cursor.fetchone():
            print("[OK] Old 'project_id' field doesn't exist. Migration already complete.")
            return
        
        # Get all facilities with their old project_id
        cursor.execute("""
            SELECT id, project_id 
            FROM facility 
            WHERE project_id IS NOT NULL
        """)
        facilities = cursor.fetchall()
        
        print(f"Found {len(facilities)} facilities to migrate...")
        
        migrated = 0
        for facility_id, project_id in facilities:
            try:
                # Check if relationship already exists
                cursor.execute("""
                    SELECT COUNT(*) 
                    FROM facility_project 
                    WHERE facility_id = %s AND project_id = %s
                """, [facility_id, project_id])
                
                if cursor.fetchone()[0] == 0:
                    # Insert the relationship
                    cursor.execute("""
                        INSERT INTO facility_project (facility_id, project_id)
                        VALUES (%s, %s)
                    """, [facility_id, project_id])
                    migrated += 1
                    print(f"  [OK] Migrated facility {facility_id} -> project {project_id}")
            except Exception as e:
                print(f"  [ERROR] Error migrating facility {facility_id}: {e}")
        
        print(f"\n[OK] Successfully migrated {migrated} relationships")


def verify_relationships():
    """Verify the many-to-many relationships are working correctly."""
    print("\n" + "=" * 60)
    print("Verifying Relationships")
    print("=" * 60)
    
    # Check if the many-to-many table exists first
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_name = 'facility_project'
        """)
        if not cursor.fetchone():
            print("[ERROR] facility_project table does not exist!")
            print("  The migration may not have completed successfully.")
            print("  Please run: python manage.py migrate nutrivax_app")
            return False
    
    try:
        facilities = Facility.objects.prefetch_related('projects').all()
        print(f"Total facilities: {facilities.count()}")
        
        facilities_with_projects = 0
        facilities_without_projects = 0
        
        for facility in facilities:
            project_count = facility.projects.count()
            if project_count > 0:
                facilities_with_projects += 1
                project_names = ', '.join([p.name for p in facility.projects.all()])
                print(f"  [OK] {facility.name}: {project_count} project(s) - {project_names}")
            else:
                facilities_without_projects += 1
                print(f"  [WARN] {facility.name}: No projects assigned")
        
        print(f"\n[OK] Facilities with projects: {facilities_with_projects}")
        if facilities_without_projects > 0:
            print(f"[WARN] Facilities without projects: {facilities_without_projects}")
        
        # Check projects
        projects = Project.objects.prefetch_related('facilities').all()
        print(f"\nTotal projects: {projects.count()}")
        
        for project in projects:
            facility_count = project.facilities.count()
            print(f"  [OK] {project.name}: {facility_count} facility/facilities")
        
        return True
    except Exception as e:
        print(f"[ERROR] Error verifying relationships: {e}")
        import traceback
        traceback.print_exc()
        return False


def fix_issues():
    """Fix any issues found."""
    print("\n" + "=" * 60)
    print("Fixing Issues")
    print("=" * 60)
    
    with connection.cursor() as cursor:
        # Check if old project_id column still exists
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'facility' 
            AND column_name = 'project_id'
        """)
        
        if cursor.fetchone():
            print("[WARN] Old 'project_id' column still exists.")
            print("  This should be removed by the migration.")
            print("  You may need to manually remove it or re-run the migration.")
        else:
            print("[OK] Old 'project_id' column has been removed.")
        
        # Check if facility_project table exists before checking for orphaned relationships
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_name = 'facility_project'
        """)
        
        if not cursor.fetchone():
            print("[ERROR] facility_project table does not exist!")
            print("  Cannot check for orphaned relationships.")
            print("  Please run: python manage.py migrate nutrivax_app")
            return
        
        # Check for orphaned relationships
        cursor.execute("""
            SELECT COUNT(*) 
            FROM facility_project fp
            LEFT JOIN facility f ON fp.facility_id = f.id
            LEFT JOIN project p ON fp.project_id = p.id
            WHERE f.id IS NULL OR p.id IS NULL
        """)
        orphaned = cursor.fetchone()[0]
        
        if orphaned > 0:
            print(f"[WARN] Found {orphaned} orphaned relationships. Cleaning up...")
            cursor.execute("""
                DELETE FROM facility_project
                WHERE facility_id NOT IN (SELECT id FROM facility)
                OR project_id NOT IN (SELECT id FROM project)
            """)
            print("[OK] Cleaned up orphaned relationships.")
        else:
            print("[OK] No orphaned relationships found.")


def main():
    """Main function."""
    print("\n" + "=" * 60)
    print("Facility-Project Many-to-Many Relationship Checker & Fixer")
    print("=" * 60)
    print()
    
    try:
        # Check database state
        has_old_field, has_m2m_table = check_database_state()
        
        # Migrate data if needed
        if has_old_field and has_m2m_table:
            print("\n[INFO] Both old and new structures exist. Migrating data...")
            with transaction.atomic():
                migrate_data_manually()
        
        # Verify relationships
        if verify_relationships():
            print("\n[OK] All relationships verified successfully!")
        else:
            print("\n[ERROR] Some issues found during verification.")
        
        # Fix any issues
        fix_issues()
        
        print("\n" + "=" * 60)
        print("Check Complete!")
        print("=" * 60)
        print("\nYou can now test the API to ensure facilities can belong")
        print("to multiple projects and projects can have multiple facilities.")
        
    except Exception as e:
        print(f"\n[ERROR] Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()

