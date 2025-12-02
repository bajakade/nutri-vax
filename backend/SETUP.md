# Quick Start Guide

Follow these steps to get the NutriVax API up and running.

## Step 1: Activate Virtual Environment

If you haven't already activated your virtual environment:

**Windows:**
```bash
env\Scripts\activate
```

**Linux/Mac:**
```bash
source env/bin/activate
```

You should see `(env)` at the beginning of your command prompt.

## Step 2: Install Dependencies

```bash
pip install -r requirements.txt
```

## Step 3: Set Up PostgreSQL Database

1. **Install PostgreSQL** (if not already installed)
   - Download from: https://www.postgresql.org/download/
   - Or use: `choco install postgresql` (Windows with Chocolatey)

2. **Create the Database**

   Open PostgreSQL command line or pgAdmin and run:
   ```sql
   CREATE DATABASE nutrivax_db;
   ```

   Or using command line:
   ```bash
   # Windows (if PostgreSQL is in PATH)
   psql -U postgres
   # Then in psql:
   CREATE DATABASE nutrivax_db;
   \q
   ```

## Step 4: Create Environment File

Create a `.env` file in the project root directory:

**Windows (PowerShell):**
```powershell
New-Item -Path .env -ItemType File
```

**Linux/Mac:**
```bash
touch .env
```

Then add the following content to `.env`:

```env
SECRET_KEY=django-insecure-change-this-to-a-random-secret-key-in-production
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DB_NAME=nutrivax_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
```

**Important:** Replace `your_postgres_password` with your actual PostgreSQL password.

## Step 5: Run Migrations

Create the database tables:

```bash
python manage.py migrate
```

You should see output like:
```
Operations to perform:
  Apply all migrations: admin, auth, authtoken, contenttypes, nutrivax_app, sessions
Running migrations:
  ...
```

## Step 6: Create Superuser

Create an admin account:

```bash
python manage.py createsuperuser
```

You'll be prompted for:
- Username
- Email (optional)
- Password (enter twice)

## Step 7: Start the Development Server

```bash
python manage.py runserver
```

You should see:
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

## Step 8: Access the Application

Open your web browser and visit:

- **Swagger API Documentation**: http://127.0.0.1:8000/swagger/
- **ReDoc API Documentation**: http://127.0.0.1:8000/redoc/
- **Django Admin Panel**: http://127.0.0.1:8000/admin/
- **API Root**: http://127.0.0.1:8000/api/

## Step 9: Get Your API Token

To use the API, you need an authentication token. You can get it in two ways:

### Option A: Using Swagger UI
1. Go to http://127.0.0.1:8000/swagger/
2. Find the `/api/auth/token/` endpoint
3. Click "Try it out"
4. Enter your username and password
5. Click "Execute"
6. Copy the token from the response

### Option B: Using curl (Command Line)

**Windows (PowerShell):**
```powershell
$body = @{
    username = "your_username"
    password = "your_password"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/auth/token/" -Method Post -Body $body -ContentType "application/json"
```

**Linux/Mac:**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "your_username", "password": "your_password"}'
```

### Option C: Using Django Admin
1. Go to http://127.0.0.1:8000/admin/
2. Log in with your superuser credentials
3. Navigate to "Tokens" under "AUTENTICATION AND AUTHORIZATION"
4. Create a token for your user

## Step 10: Test the API

Once you have your token, you can test the API:

**Example: List all locations**
```bash
curl -H "Authorization: Token your_token_here" http://127.0.0.1:8000/api/locations/
```

Or use the Swagger UI at http://127.0.0.1:8000/swagger/ and click the "Authorize" button, then enter:
```
Token your_token_here
```

## Troubleshooting

### Database Connection Error

If you get a database connection error:
1. Make sure PostgreSQL is running
2. Check your `.env` file has correct database credentials
3. Verify the database exists: `psql -U postgres -l`

### Port Already in Use

If port 8000 is already in use:
```bash
python manage.py runserver 8001
```

### Module Not Found Errors

Make sure you're in the virtual environment and all dependencies are installed:
```bash
pip install -r requirements.txt
```

### Migration Errors

If migrations fail, try:
```bash
python manage.py makemigrations
python manage.py migrate
```

## Next Steps

1. **Import Locations**: Use the CSV import command to populate locations
   ```bash
   python manage.py import_locations locations.csv
   ```

2. **Create Program Staff**: Use Django admin or API to create staff members

3. **Set Up User Roles**: 
   - Create users in Django admin
   - Create ProgramStaff records linked to users
   - Assign appropriate PHCCs and roles

4. **Start Using the API**: Begin creating children, distribution visits, referrals, and stock records through the API

