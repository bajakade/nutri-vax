"""
Fix missing columns in the facility table.
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nutrivax_project.settings')
django.setup()

from django.db import connection

def fix_facility_table():
    """Add missing columns to facility table."""
    with connection.cursor() as cursor:
        print("Checking facility table structure...")
        
        # Get default IDs for foreign keys
        cursor.execute('SELECT id FROM "project" LIMIT 1;')
        default_project_id = cursor.fetchone()[0]
        
        cursor.execute('SELECT id FROM "facilityType" LIMIT 1;')
        facility_type_result = cursor.fetchone()
        default_facility_type_id = facility_type_result[0] if facility_type_result else None
        
        cursor.execute('SELECT id FROM "adminDivision" LIMIT 1;')
        admin_division_result = cursor.fetchone()
        default_admin_division_id = admin_division_result[0] if admin_division_result else None
        
        # Check and add created_at
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='facility' AND column_name='created_at';
        """)
        if not cursor.fetchone():
            cursor.execute('ALTER TABLE "facility" ADD COLUMN "created_at" timestamp with time zone NOT NULL DEFAULT NOW();')
            print("[OK] created_at added to facility")
        
        # Check and add updated_at
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='facility' AND column_name='updated_at';
        """)
        if not cursor.fetchone():
            cursor.execute('ALTER TABLE "facility" ADD COLUMN "updated_at" timestamp with time zone NOT NULL DEFAULT NOW();')
            print("[OK] updated_at added to facility")
        
        # Check and add project_id
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='facility' AND column_name='project_id';
        """)
        if not cursor.fetchone():
            print("Adding project_id column to facility...")
            cursor.execute(f"""
                ALTER TABLE "facility" 
                ADD COLUMN "project_id" uuid NOT NULL DEFAULT '{default_project_id}';
            """)
            cursor.execute("""
                ALTER TABLE "facility" 
                ADD CONSTRAINT "facility_project_id_a81fb102_fk_project_id" 
                FOREIGN KEY ("project_id") REFERENCES "project" ("id") DEFERRABLE INITIALLY DEFERRED;
            """)
            cursor.execute('CREATE INDEX IF NOT EXISTS "facility_project_id_a81fb102" ON "facility" ("project_id");')
            # Check for duplicates before adding unique constraint
            cursor.execute("""
                SELECT project_id, name, COUNT(*) 
                FROM "facility" 
                GROUP BY project_id, name 
                HAVING COUNT(*) > 1;
            """)
            duplicates = cursor.fetchall()
            if not duplicates:
                cursor.execute("""
                    ALTER TABLE "facility" 
                    ADD CONSTRAINT "facility_project_id_name_3a56b6b6_uniq" 
                    UNIQUE ("project_id", "name");
                """)
                print("[OK] project_id column and unique constraint added to facility")
            else:
                print(f"[WARNING] Found {len(duplicates)} duplicate facility names, skipping unique constraint")
                print("[OK] project_id column added to facility (without unique constraint)")
        
        # Check and add facility_type_id
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='facility' AND column_name='facility_type_id';
        """)
        if not cursor.fetchone():
            if default_facility_type_id:
                print("Adding facility_type_id column to facility...")
                cursor.execute(f"""
                    ALTER TABLE "facility" 
                    ADD COLUMN "facility_type_id" uuid NOT NULL DEFAULT '{default_facility_type_id}';
                """)
                cursor.execute("""
                    ALTER TABLE "facility" 
                    ADD CONSTRAINT "facility_facility_type_id_38a86d59_fk_facilityType_id" 
                    FOREIGN KEY ("facility_type_id") REFERENCES "facilityType" ("id") DEFERRABLE INITIALLY DEFERRED;
                """)
                cursor.execute('CREATE INDEX IF NOT EXISTS "facility_facility_type_id_38a86d59" ON "facility" ("facility_type_id");')
                print("[OK] facility_type_id column added to facility")
            else:
                print("[WARNING] No facility type found, cannot add facility_type_id")
        
        # Check and add admin_division_id
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='facility' AND column_name='admin_division_id';
        """)
        if not cursor.fetchone():
            if default_admin_division_id:
                print("Adding admin_division_id column to facility...")
                cursor.execute(f"""
                    ALTER TABLE "facility" 
                    ADD COLUMN "admin_division_id" uuid NOT NULL DEFAULT '{default_admin_division_id}';
                """)
                cursor.execute("""
                    ALTER TABLE "facility" 
                    ADD CONSTRAINT "facility_admin_division_id_fe288b9a_fk_adminDivision_id" 
                    FOREIGN KEY ("admin_division_id") REFERENCES "adminDivision" ("id") DEFERRABLE INITIALLY DEFERRED;
                """)
                cursor.execute('CREATE INDEX IF NOT EXISTS "facility_admin_division_id_fe288b9a" ON "facility" ("admin_division_id");')
                print("[OK] admin_division_id column added to facility")
            else:
                print("[WARNING] No admin division found, cannot add admin_division_id")
        
        print("\n[SUCCESS] Facility table columns fixed!")

if __name__ == '__main__':
    try:
        fix_facility_table()
    except Exception as e:
        print(f"\n[ERROR] Failed: {e}")
        import traceback
        traceback.print_exc()

