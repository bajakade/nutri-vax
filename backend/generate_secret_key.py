#!/usr/bin/env python
"""
Generate a Django secret key for Railway deployment.
Run this and copy the output to Railway environment variables.
"""
from django.core.management.utils import get_random_secret_key

if __name__ == '__main__':
    secret_key = get_random_secret_key()
    print("=" * 60)
    print("Django Secret Key for Railway")
    print("=" * 60)
    print()
    print("Copy this value to Railway environment variables:")
    print()
    print(f"SECRET_KEY={secret_key}")
    print()
    print("=" * 60)

