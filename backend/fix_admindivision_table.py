"""
Fix missing columns in the adminDivision table.
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nutrivax_project.settings')
django.setup()

from django.db import connection

def fix_admindivision_table():
    """Add missing columns to adminDivision table."""
    with connection.cursor() as cursor:
        print("Checking adminDivision table structure...")
        
        # Check and add parent_division_id
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='adminDivision' AND column_name='parent_division_id';
        """)
        if not cursor.fetchone():
            print("Adding parent_division_id column to adminDivision...")
            cursor.execute("""
                ALTER TABLE "adminDivision" 
                ADD COLUMN "parent_division_id" uuid NULL;
            """)
            cursor.execute("""
                ALTER TABLE "adminDivision" 
                ADD CONSTRAINT "adminDivision_parent_division_id_a416d16d_fk_adminDivision_id" 
                FOREIGN KEY ("parent_division_id") REFERENCES "adminDivision" ("id") DEFERRABLE INITIALLY DEFERRED;
            """)
            cursor.execute('CREATE INDEX IF NOT EXISTS "adminDivision_parent_division_id_a416d16d" ON "adminDivision" ("parent_division_id");')
            print("[OK] parent_division_id column added to adminDivision")
        else:
            print("[OK] adminDivision already has parent_division_id column")
        
        # Check and add level_id if missing
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='adminDivision' AND column_name='level_id';
        """)
        if not cursor.fetchone():
            print("Adding level_id column to adminDivision...")
            cursor.execute('SELECT id FROM "adminLevel" LIMIT 1;')
            level_result = cursor.fetchone()
            if level_result:
                default_level_id = level_result[0]
                cursor.execute(f"""
                    ALTER TABLE "adminDivision" 
                    ADD COLUMN "level_id" uuid NOT NULL DEFAULT '{default_level_id}';
                """)
                cursor.execute("""
                    ALTER TABLE "adminDivision" 
                    ADD CONSTRAINT "adminDivision_level_id_e0aba73e_fk_adminLevel_id" 
                    FOREIGN KEY ("level_id") REFERENCES "adminLevel" ("id") DEFERRABLE INITIALLY DEFERRED;
                """)
                cursor.execute('CREATE INDEX IF NOT EXISTS "adminDivision_level_id_e0aba73e" ON "adminDivision" ("level_id");')
                print("[OK] level_id column added to adminDivision")
            else:
                print("[WARNING] No admin level found, cannot add level_id")
        else:
            print("[OK] adminDivision already has level_id column")
        
        print("\n[SUCCESS] adminDivision table columns fixed!")

if __name__ == '__main__':
    try:
        fix_admindivision_table()
    except Exception as e:
        print(f"\n[ERROR] Failed: {e}")
        import traceback
        traceback.print_exc()

