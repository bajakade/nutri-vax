# Railway Deployment Guide

This guide will help you deploy the NutriVax API to Railway.

## Prerequisites

1. A Railway account (sign up at https://railway.app)
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Create a New Project on Railway

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"** (or your Git provider)
4. Select your repository
5. Railway will automatically detect it's a Python/Django project

## Step 2: Add PostgreSQL Database

1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway will automatically create a PostgreSQL database
4. The `DATABASE_URL` environment variable will be automatically set

## Step 3: Configure Environment Variables

Go to your service → **Variables** tab and add the following:

### Required Variables:

```
SECRET_KEY=your-secret-key-here-generate-a-random-one
DEBUG=False
ALLOWED_HOSTS=your-app.railway.app,localhost,127.0.0.1
```

### Optional Variables (for production):

```
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com,https://www.your-frontend-domain.com
RAILWAY_PUBLIC_DOMAIN=https://your-app.railway.app
```

### Generate a Secret Key:

You can generate a secure secret key using Python:

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

## Step 4: Deploy

Railway will automatically:
1. Detect the `Procfile`
2. Install dependencies from `requirements.txt`
3. Run migrations
4. Collect static files
5. Start the application with Gunicorn

## Step 5: Load Initial Data (Fixtures)

After deployment, you need to load your location data. You can do this via Railway's CLI or by adding a one-time command:

### Option 1: Using Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run the loaddata commands
railway run python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.administrativelevel.json
railway run python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.facilitytype.json
railway run python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.administrativedivision.json
railway run python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.facility01.json
railway run python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.facility02.json
railway run python manage.py loaddata nutrivax_app/fixtures/nutrivax_app.facility03.json
```

### Option 2: Using Railway Dashboard

1. Go to your service
2. Click on **"Deployments"**
3. Click on the latest deployment
4. Open the **"Shell"** tab
5. Run the loaddata commands manually

## Step 6: Create Superuser

Create an admin user:

```bash
railway run python manage.py createsuperuser
```

Or use the provided script:

```bash
railway run python create_superuser.py
```

## Step 7: Verify Deployment

1. Visit your Railway app URL: `https://your-app.railway.app`
2. Check API docs: `https://your-app.railway.app/swagger/`
3. Test an endpoint: `https://your-app.railway.app/api/administrative-levels/`

## Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `SECRET_KEY` | Django secret key | Yes | - |
| `DEBUG` | Debug mode | Yes | `False` |
| `ALLOWED_HOSTS` | Comma-separated list of allowed hosts | Yes | - |
| `DATABASE_URL` | PostgreSQL connection string | Auto-set by Railway | - |
| `RAILWAY_PUBLIC_DOMAIN` | Your Railway app URL | Optional | - |
| `CORS_ALLOWED_ORIGINS` | Comma-separated list of CORS origins | Optional | - |

## Troubleshooting

### Database Connection Issues

- Railway automatically sets `DATABASE_URL`
- Make sure PostgreSQL service is running
- Check that migrations ran successfully

### Static Files Not Loading

- WhiteNoise is configured to serve static files
- Static files are collected during deployment
- Check that `STATIC_ROOT` is set correctly

### CORS Issues

- Add your frontend domain to `CORS_ALLOWED_ORIGINS`
- Make sure the domain includes the protocol (https://)

### Migration Errors

- Check deployment logs for migration errors
- You can run migrations manually: `railway run python manage.py migrate`

## Monitoring

- Check **Logs** tab in Railway dashboard for application logs
- Check **Metrics** tab for resource usage
- Set up alerts in Railway dashboard

## Custom Domain (Optional)

1. Go to your service → **Settings** → **Networking**
2. Click **"Generate Domain"** or **"Add Custom Domain"**
3. Update `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS` with your custom domain

## Continuous Deployment

Railway automatically deploys when you push to your connected branch (usually `main` or `master`).

To deploy a specific branch:
1. Go to service → **Settings** → **Source**
2. Select your branch

## Backup Database

Railway provides automatic backups for PostgreSQL. You can also:
1. Go to your database service
2. Click **"Data"** tab
3. Download backups or set up scheduled backups

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Django Deployment: https://docs.djangoproject.com/en/stable/howto/deployment/

