"""
Fix missing foreign key columns in existing tables.
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nutrivax_project.settings')
django.setup()

from django.db import connection

def fix_missing_columns():
    """Add missing foreign key columns to existing tables."""
    with connection.cursor() as cursor:
        # Check and add missing columns to facilityType
        print("Checking facilityType table...")
        # First, we need a default project. Let's create one if it doesn't exist
        cursor.execute("""
            INSERT INTO "project" (id, name, country, is_active, created_at, updated_at)
            SELECT gen_random_uuid(), 'Default Project', 'Unknown', true, NOW(), NOW()
            WHERE NOT EXISTS (SELECT 1 FROM "project" LIMIT 1)
            RETURNING id;
        """)
        result = cursor.fetchone()
        if result:
            default_project_id = result[0]
        else:
            cursor.execute('SELECT id FROM "project" LIMIT 1;')
            default_project_id = cursor.fetchone()[0]
        
        # Check and add created_at
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='facilityType' AND column_name='created_at';
        """)
        if not cursor.fetchone():
            cursor.execute('ALTER TABLE "facilityType" ADD COLUMN "created_at" timestamp with time zone NOT NULL DEFAULT NOW();')
            print("[OK] created_at added to facilityType")
        
        # Check and add updated_at
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='facilityType' AND column_name='updated_at';
        """)
        if not cursor.fetchone():
            cursor.execute('ALTER TABLE "facilityType" ADD COLUMN "updated_at" timestamp with time zone NOT NULL DEFAULT NOW();')
            print("[OK] updated_at added to facilityType")
        
        # Check and add project_id
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='facilityType' AND column_name='project_id';
        """)
        if not cursor.fetchone():
            print("Adding project_id column to facilityType...")
            cursor.execute(f"""
                ALTER TABLE "facilityType" 
                ADD COLUMN "project_id" uuid NOT NULL DEFAULT '{default_project_id}';
            """)
            cursor.execute("""
                ALTER TABLE "facilityType" 
                ADD CONSTRAINT "facilityType_project_id_d52b555e_fk_project_id" 
                FOREIGN KEY ("project_id") REFERENCES "project" ("id") DEFERRABLE INITIALLY DEFERRED;
            """)
            cursor.execute('CREATE INDEX IF NOT EXISTS "facilityType_project_id_d52b555e" ON "facilityType" ("project_id");')
            cursor.execute("""
                ALTER TABLE "facilityType" 
                ADD CONSTRAINT "facilityType_project_id_name_c2e400ae_uniq" 
                UNIQUE ("project_id", "name");
            """)
            print("[OK] project_id column added to facilityType")
        else:
            print("[OK] facilityType already has project_id column")
        
        # Check and add missing columns to adminLevel
        print("Checking adminLevel table...")
        cursor.execute('SELECT id FROM "project" LIMIT 1;')
        default_project_id = cursor.fetchone()[0]
        
        # Check and add created_at
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='adminLevel' AND column_name='created_at';
        """)
        if not cursor.fetchone():
            cursor.execute('ALTER TABLE "adminLevel" ADD COLUMN "created_at" timestamp with time zone NOT NULL DEFAULT NOW();')
            print("[OK] created_at added to adminLevel")
        
        # Check and add updated_at
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='adminLevel' AND column_name='updated_at';
        """)
        if not cursor.fetchone():
            cursor.execute('ALTER TABLE "adminLevel" ADD COLUMN "updated_at" timestamp with time zone NOT NULL DEFAULT NOW();')
            print("[OK] updated_at added to adminLevel")
        
        # Check and add project_id
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='adminLevel' AND column_name='project_id';
        """)
        if not cursor.fetchone():
            print("Adding project_id column to adminLevel...")
            cursor.execute(f"""
                ALTER TABLE "adminLevel" 
                ADD COLUMN "project_id" uuid NOT NULL DEFAULT '{default_project_id}';
            """)
            cursor.execute("""
                ALTER TABLE "adminLevel" 
                ADD CONSTRAINT "adminLevel_project_id_d1b7789e_fk_project_id" 
                FOREIGN KEY ("project_id") REFERENCES "project" ("id") DEFERRABLE INITIALLY DEFERRED;
            """)
            cursor.execute('CREATE INDEX IF NOT EXISTS "adminLevel_project_id_d1b7789e" ON "adminLevel" ("project_id");')
            cursor.execute("""
                ALTER TABLE "adminLevel" 
                ADD CONSTRAINT "adminLevel_project_id_name_eb7b7a6d_uniq" 
                UNIQUE ("project_id", "name");
            """)
            print("[OK] project_id column added to adminLevel")
        else:
            print("[OK] adminLevel already has project_id column")
        
        # Check and add missing columns to adminDivision
        print("Checking adminDivision table...")
        cursor.execute('SELECT id FROM "project" LIMIT 1;')
        default_project_id = cursor.fetchone()[0]
        
        # Check and add created_at
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='adminDivision' AND column_name='created_at';
        """)
        if not cursor.fetchone():
            cursor.execute('ALTER TABLE "adminDivision" ADD COLUMN "created_at" timestamp with time zone NOT NULL DEFAULT NOW();')
            print("[OK] created_at added to adminDivision")
        
        # Check and add updated_at
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='adminDivision' AND column_name='updated_at';
        """)
        if not cursor.fetchone():
            cursor.execute('ALTER TABLE "adminDivision" ADD COLUMN "updated_at" timestamp with time zone NOT NULL DEFAULT NOW();')
            print("[OK] updated_at added to adminDivision")
        
        # Check and add project_id
        cursor.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='adminDivision' AND column_name='project_id';
        """)
        if not cursor.fetchone():
            print("Adding project_id column to adminDivision...")
            cursor.execute(f"""
                ALTER TABLE "adminDivision" 
                ADD COLUMN "project_id" uuid NOT NULL DEFAULT '{default_project_id}';
            """)
            cursor.execute("""
                ALTER TABLE "adminDivision" 
                ADD CONSTRAINT "adminDivision_project_id_b937ba66_fk_project_id" 
                FOREIGN KEY ("project_id") REFERENCES "project" ("id") DEFERRABLE INITIALLY DEFERRED;
            """)
            cursor.execute('CREATE INDEX IF NOT EXISTS "adminDivision_project_id_b937ba66" ON "adminDivision" ("project_id");')
            # Check if parent_division_id exists before adding unique constraint
            cursor.execute("""
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name='adminDivision' AND column_name='parent_division_id';
            """)
            has_parent_division = cursor.fetchone()
            
            if has_parent_division:
                # Check for duplicates before adding unique constraint
                cursor.execute("""
                    SELECT project_id, level_id, name, parent_division_id, COUNT(*) 
                    FROM "adminDivision" 
                    GROUP BY project_id, level_id, name, parent_division_id 
                    HAVING COUNT(*) > 1;
                """)
                duplicates = cursor.fetchall()
                if not duplicates:
                    cursor.execute("""
                        ALTER TABLE "adminDivision" 
                        ADD CONSTRAINT "adminDivision_project_id_level_id_name_bb0f505a_uniq" 
                        UNIQUE ("project_id", "level_id", "name", "parent_division_id");
                    """)
                    print("[OK] project_id column and unique constraint added to adminDivision")
                else:
                    print(f"[WARNING] Found {len(duplicates)} duplicates, skipping unique constraint")
                    print("[OK] project_id column added to adminDivision (without unique constraint)")
            else:
                print("[WARNING] parent_division_id column missing, skipping unique constraint")
                print("[OK] project_id column added to adminDivision")
        else:
            print("[OK] adminDivision already has project_id column")
        
        print("\n[SUCCESS] All missing columns fixed!")

if __name__ == '__main__':
    try:
        fix_missing_columns()
    except Exception as e:
        print(f"\n[ERROR] Failed: {e}")
        import traceback
        traceback.print_exc()

