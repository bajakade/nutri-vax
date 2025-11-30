"""
Create only the missing database tables.
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nutrivax_project.settings')
django.setup()

from django.db import connection

def create_missing_tables():
    """Create only the missing tables."""
    with connection.cursor() as cursor:
        # Create project table
        print("Creating project table...")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS "project" (
                "id" uuid NOT NULL PRIMARY KEY,
                "name" varchar(200) NOT NULL UNIQUE,
                "country" varchar(100) NOT NULL,
                "is_active" boolean NOT NULL,
                "created_at" timestamp with time zone NOT NULL,
                "updated_at" timestamp with time zone NOT NULL
            );
        """)
        print("[OK] project table created")
        
        # Create user_profile table
        print("Creating user_profile table...")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS "user_profile" (
                "id" uuid NOT NULL PRIMARY KEY,
                "role" varchar(50) NOT NULL,
                "is_active" boolean NOT NULL,
                "created_at" timestamp with time zone NOT NULL,
                "updated_at" timestamp with time zone NOT NULL,
                "facility_id" uuid NULL,
                "project_id" uuid NULL,
                "user_id" integer NOT NULL UNIQUE,
                CONSTRAINT "user_profile_user_id_8fdce8e2_fk_auth_user_id" 
                    FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED,
                CONSTRAINT "user_profile_project_id_735a53f5_fk_project_id" 
                    FOREIGN KEY ("project_id") REFERENCES "project" ("id") DEFERRABLE INITIALLY DEFERRED,
                CONSTRAINT "user_profile_facility_id_94f8759c_fk_facility_id" 
                    FOREIGN KEY ("facility_id") REFERENCES "facility" ("id") DEFERRABLE INITIALLY DEFERRED
            );
        """)
        cursor.execute('CREATE INDEX IF NOT EXISTS "user_profile_facility_id_94f8759c" ON "user_profile" ("facility_id");')
        cursor.execute('CREATE INDEX IF NOT EXISTS "user_profile_project_id_735a53f5" ON "user_profile" ("project_id");')
        print("[OK] user_profile table created")
        
        # Create distributionRegister table
        print("Creating distributionRegister table...")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS "distributionRegister" (
                "id" uuid NOT NULL PRIMARY KEY,
                "child_serial_number" varchar(100) NOT NULL,
                "date_of_visit" date NOT NULL,
                "muac_status" varchar(10) NOT NULL,
                "oedema" varchar(3) NOT NULL,
                "new_admission" varchar(3) NOT NULL,
                "sachets_received" integer NOT NULL,
                "created_at" timestamp with time zone NOT NULL,
                "updated_at" timestamp with time zone NOT NULL,
                "created_by_id" integer NULL,
                "facility_id" uuid NOT NULL,
                "project_id" uuid NOT NULL,
                CONSTRAINT "distributionRegister_project_id_facility_id_c_3470b2f6_uniq" 
                    UNIQUE ("project_id", "facility_id", "child_serial_number", "date_of_visit"),
                CONSTRAINT "distributionRegister_created_by_id_a68fcd7c_fk_auth_user_id" 
                    FOREIGN KEY ("created_by_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED,
                CONSTRAINT "distributionRegister_facility_id_ce873233_fk_facility_id" 
                    FOREIGN KEY ("facility_id") REFERENCES "facility" ("id") DEFERRABLE INITIALLY DEFERRED,
                CONSTRAINT "distributionRegister_project_id_2efa2048_fk_project_id" 
                    FOREIGN KEY ("project_id") REFERENCES "project" ("id") DEFERRABLE INITIALLY DEFERRED
            );
        """)
        cursor.execute('CREATE INDEX IF NOT EXISTS "distributionRegister_created_by_id_a68fcd7c" ON "distributionRegister" ("created_by_id");')
        cursor.execute('CREATE INDEX IF NOT EXISTS "distributionRegister_facility_id_ce873233" ON "distributionRegister" ("facility_id");')
        cursor.execute('CREATE INDEX IF NOT EXISTS "distributionRegister_project_id_2efa2048" ON "distributionRegister" ("project_id");')
        print("[OK] distributionRegister table created")
        
        # Create rationCard table
        print("Creating rationCard table...")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS "rationCard" (
                "id" uuid NOT NULL PRIMARY KEY,
                "child_serial_number" varchar(100) NOT NULL,
                "admission_date" date NOT NULL,
                "gender" varchar(1) NOT NULL,
                "muac_status" varchar(1) NOT NULL,
                "visits_count" integer NOT NULL,
                "sachets_received" integer NOT NULL,
                "created_at" timestamp with time zone NOT NULL,
                "updated_at" timestamp with time zone NOT NULL,
                "created_by_id" integer NULL,
                "facility_id" uuid NOT NULL,
                "project_id" uuid NOT NULL,
                CONSTRAINT "rationCard_project_id_facility_id_c_ac8baca0_uniq" 
                    UNIQUE ("project_id", "facility_id", "child_serial_number"),
                CONSTRAINT "rationCard_created_by_id_0a387ace_fk_auth_user_id" 
                    FOREIGN KEY ("created_by_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED,
                CONSTRAINT "rationCard_facility_id_afb22b72_fk_facility_id" 
                    FOREIGN KEY ("facility_id") REFERENCES "facility" ("id") DEFERRABLE INITIALLY DEFERRED,
                CONSTRAINT "rationCard_project_id_05105833_fk_project_id" 
                    FOREIGN KEY ("project_id") REFERENCES "project" ("id") DEFERRABLE INITIALLY DEFERRED
            );
        """)
        cursor.execute('CREATE INDEX IF NOT EXISTS "rationCard_created_by_id_0a387ace" ON "rationCard" ("created_by_id");')
        cursor.execute('CREATE INDEX IF NOT EXISTS "rationCard_facility_id_afb22b72" ON "rationCard" ("facility_id");')
        cursor.execute('CREATE INDEX IF NOT EXISTS "rationCard_project_id_05105833" ON "rationCard" ("project_id");')
        print("[OK] rationCard table created")
        
        # Mark migrations as applied
        print("\nMarking migrations as applied...")
        from django.db.migrations.recorder import MigrationRecorder
        MigrationRecorder.Migration.objects.get_or_create(
            app='nutrivax_app',
            name='0001_initial'
        )
        MigrationRecorder.Migration.objects.get_or_create(
            app='nutrivax_app',
            name='0002_alter_userprofile_options'
        )
        print("[OK] Migrations marked as applied")
        
        print("\n[SUCCESS] All missing tables created!")

if __name__ == '__main__':
    try:
        create_missing_tables()
    except Exception as e:
        print(f"\n[ERROR] Failed: {e}")
        import traceback
        traceback.print_exc()

