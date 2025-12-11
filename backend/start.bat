@echo off
echo ========================================
echo NutriVax API - Quick Start
echo ========================================
echo.

REM Check if virtual environment is activated
if not defined VIRTUAL_ENV (
    echo Activating virtual environment...
    call env\Scripts\activate.bat
)

echo.
echo Step 1: Checking Python version...
python --version

echo.
echo Step 2: Installing/updating dependencies...
pip install -r requirements.txt

echo.
echo Step 3: Checking for .env file...
if not exist .env (
    echo WARNING: .env file not found!
    echo Please create .env file with your database credentials.
    echo See SETUP.md for details.
    pause
    exit /b 1
) else (
    echo .env file found.
)

echo.
echo Step 4: Running migrations...
python manage.py migrate --fake-initial
if errorlevel 1 (
    echo Migration failed, trying regular migrate...
    python manage.py migrate
)

echo.
echo Step 5: Loading fixture files...
echo Loading administrative levels...
python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.administrativelevel.json 2>nul
if errorlevel 1 (
    echo Warning: Could not load administrativelevel.json (may already be loaded or need project)
)

echo Loading facility types...
python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.facilitytype.json 2>nul
if errorlevel 1 (
    echo Warning: Could not load facilitytype.json (may already be loaded or need project)
)

echo Loading administrative divisions...
python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.administrativedivision.json 2>nul
if errorlevel 1 (
    echo Warning: Could not load administrativedivision.json (may already be loaded or need dependencies)
)

echo Loading facilities (part 1)...
python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.facility01.json 2>nul
if errorlevel 1 (
    echo Warning: Could not load facility01.json (may already be loaded or need dependencies)
)

echo Loading facilities (part 2)...
python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.facility02.json 2>nul
if errorlevel 1 (
    echo Warning: Could not load facility02.json (may already be loaded or need dependencies)
)

echo Loading facilities (part 3)...
python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.facility03.json 2>nul
if errorlevel 1 (
    echo Warning: Could not load facility03.json (may already be loaded or need dependencies)
)

echo.
echo Step 6: Collecting static files...
python manage.py collectstatic --noinput

echo.
echo Step 7: Starting development server...
echo.
echo Server will start at http://127.0.0.1:8000/
echo Press CTRL+C to stop the server
echo.
python manage.py runserver

pause
