#!/usr/bin/env python
"""
Script to create a Django superuser non-interactively.
Usage: python create_superuser.py
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nutrivax_project.settings')
django.setup()

from django.contrib.auth.models import User

def create_superuser():
    """Create a superuser if it doesn't exist."""
    username = 'admin'
    email = 'admin@nutrivax.com'
    password = 'admin123'  # Change this after first login!
    
    if User.objects.filter(username=username).exists():
        print(f"Superuser '{username}' already exists!")
        print(f"Username: {username}")
        print(f"Password: {password}")
        print("\nIf you forgot the password, you can reset it in Django admin or create a new superuser.")
        return
    
    try:
        User.objects.create_superuser(
            username=username,
            email=email,
            password=password
        )
        print("=" * 50)
        print("Superuser created successfully!")
        print("=" * 50)
        print(f"Username: {username}")
        print(f"Email: {email}")
        print(f"Password: {password}")
        print("=" * 50)
        print("\n⚠️  IMPORTANT: Please change the password after first login!")
        print("You can do this at: http://127.0.0.1:8000/admin/")
        print("\nAccess the admin panel at: http://127.0.0.1:8000/admin/")
    except Exception as e:
        print(f"Error creating superuser: {e}")
        sys.exit(1)

if __name__ == '__main__':
    create_superuser()

