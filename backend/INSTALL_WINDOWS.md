# Windows Installation Guide - Fixing psycopg2-binary Issue

## Problem
`psycopg2-binary` requires Microsoft Visual C++ 14.0 or greater to build on Windows.

## Solution Options

### Option 1: Install Visual C++ Build Tools (Recommended)

1. **Download and Install Microsoft C++ Build Tools:**
   - Go to: https://visualstudio.microsoft.com/visual-cpp-build-tools/
   - Download "Build Tools for Visual Studio"
   - During installation, select "C++ build tools" workload
   - Install and restart your computer

2. **Then run the installation again:**
   ```bash
   pip install -r requirements.txt
   ```

### Option 2: Use Pre-built Wheel (Easier - Try This First)

Try installing a newer version that may have pre-built wheels:

```bash
pip install --upgrade pip
pip install psycopg2-binary --upgrade
pip install -r requirements.txt
```

### Option 3: Use SQLite for Development (Quick Start)

If you just want to test the application without PostgreSQL, you can temporarily use SQLite:

1. **Modify `nutrivax_project/settings.py`** temporarily:

   Find the DATABASES section and replace it with:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.sqlite3',
           'NAME': BASE_DIR / 'db.sqlite3',
       }
   }
   ```

2. **Skip psycopg2-binary installation:**
   ```bash
   pip install Django==5.0.1 djangorestframework==3.14.0 django-cors-headers==4.3.1 drf-yasg==1.21.7 djangorestframework-simplejwt==5.3.0 python-decouple==3.8 django-filter==23.5
   ```

3. **Continue with setup:**
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   python manage.py runserver
   ```

   **Note:** Remember to switch back to PostgreSQL for production!

### Option 4: Use Docker (Advanced)

If you have Docker installed, you can use a PostgreSQL container and avoid building psycopg2-binary locally.

## Quick Fix Command

Try this first (upgrades pip and psycopg2-binary):

```bash
python -m pip install --upgrade pip
pip install psycopg2-binary --upgrade --no-cache-dir
pip install -r requirements.txt
```

If that doesn't work, proceed with Option 1 (Visual C++ Build Tools) or Option 3 (SQLite for development).

