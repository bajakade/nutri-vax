# Railway Deployment - Quick Start Guide

## ✅ Pre-Deployment Checklist

Your project is ready! Here's what's already configured:
- ✅ Procfile configured for Railway
- ✅ requirements.txt includes all dependencies
- ✅ Settings.py configured for Railway
- ✅ Many-to-many relationship implemented
- ✅ Migrations ready

## 🚀 Step-by-Step Deployment

### Step 1: Push Code to GitHub

```bash
cd C:\Users\m123456\Desktop\nutri-vax
git add .
git commit -m "Add many-to-many relationship and prepare for Railway deployment"
git push origin master
```

### Step 2: Create Railway Account & Project

1. Go to https://railway.app
2. Sign up/Login (you can use GitHub to sign in)
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Select your repository: `bajakade/nutri-vax`
6. Railway will detect it's a Python project

### Step 3: Add PostgreSQL Database

1. In your Railway project dashboard, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway automatically creates the database
4. The `DATABASE_URL` environment variable is automatically set ✅

### Step 4: Configure Environment Variables

Go to your **Web Service** → **Variables** tab and add:

#### Required Variables:

```
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=*.railway.app,localhost,127.0.0.1
```

#### Generate Secret Key:

Run this locally:
```bash
cd backend
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Copy the output and use it as your `SECRET_KEY` value.

#### Optional Variables (for CORS):

```
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
RAILWAY_PUBLIC_DOMAIN=https://your-app.railway.app
```

### Step 5: Configure Service Settings

1. Go to your **Web Service** → **Settings**
2. Set **Root Directory** to: `backend`
3. Set **Build Command** (optional, Railway auto-detects):
   ```
   pip install -r requirements.txt
   ```
4. Set **Start Command** (already in Procfile, but verify):
   ```
   python manage.py migrate && python manage.py collectstatic --noinput && gunicorn nutrivax_project.wsgi:application --bind 0.0.0.0:$PORT
   ```

### Step 6: Deploy

Railway will automatically:
1. ✅ Install dependencies from requirements.txt
2. ✅ Run migrations (from Procfile)
3. ✅ Collect static files (from Procfile)
4. ✅ Start Gunicorn server (from Procfile)

### Step 7: Create Superuser

After deployment, create an admin user:

**Option 1: Using Railway CLI**
```bash
npm i -g @railway/cli
railway login
railway link
railway run python manage.py createsuperuser
```

**Option 2: Using Railway Dashboard**
1. Go to your service → **Deployments**
2. Click latest deployment → **Shell** tab
3. Run: `python manage.py createsuperuser`

### Step 8: Load Initial Data (Optional)

If you need to load fixtures:
```bash
railway run python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.administrativelevel.json
railway run python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.facilitytype.json
railway run python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.administrativedivision.json
railway run python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.facility01.json
railway run python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.facility02.json
railway run python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.facility03.json
```

### Step 9: Verify Deployment

1. Visit your Railway app URL (shown in Railway dashboard)
2. Check API: `https://your-app.railway.app/api/`
3. Check Admin: `https://your-app.railway.app/admin/`
4. Check API Docs: `https://your-app.railway.app/api/schema/swagger-ui/`

## 🔧 Troubleshooting

### If deployment fails:

1. **Check Logs**: Go to service → **Deployments** → **View Logs**
2. **Common Issues**:
   - Missing environment variables → Add them in Variables tab
   - Database connection error → Check DATABASE_URL is set
   - Migration errors → Check logs for specific error
   - Static files error → WhiteNoise should handle this automatically

### If you need to run migrations manually:

```bash
railway run python manage.py migrate
```

### If you need to check database:

```bash
railway run python manage.py dbshell
```

## 📝 Important Notes

- **Root Directory**: Make sure it's set to `backend` in Railway settings
- **Port**: Railway automatically sets `$PORT` - don't hardcode it
- **Static Files**: WhiteNoise serves them automatically
- **Database**: Railway PostgreSQL is automatically connected via `DATABASE_URL`

## 🎉 You're Done!

Your API will be live at: `https://your-app.railway.app`

The many-to-many relationship between Project and Facility is ready to use!

