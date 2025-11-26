# JWT Authentication Guide

Your API has been successfully switched to JWT (Bearer Token) authentication!

## What Changed

- ✅ Authentication changed from Token Authentication to JWT
- ✅ Now uses Bearer Token format (works with Postman's Bearer Token option)
- ✅ Token endpoint updated to `/api/auth/token/`
- ✅ Added token refresh endpoint for long-lived sessions

## How to Get JWT Tokens

### Step 1: Get Access Token

**Endpoint:** `POST http://127.0.0.1:8000/api/auth/token/`

**Request Body (JSON):**
```json
{
    "username": "m123456",
    "password": "your_password"
}
```

**Response:**
```json
{
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Important:** Copy the `access` token - this is what you use for API requests!

### Step 2: Use Bearer Token in Requests

Now you can use **Bearer Token** in Postman's Authorization tab!

**In Postman:**
1. Go to **Authorization** tab
2. Type: Select **Bearer Token**
3. Token: Paste your `access` token (from Step 1)
4. Click **Send**

That's it! It will automatically send: `Authorization: Bearer <your_token>`

## Token Refresh (Optional)

If your access token expires, you can refresh it without logging in again:

**Endpoint:** `POST http://127.0.0.1:8000/api/auth/token/refresh/`

**Request Body (JSON):**
```json
{
    "refresh": "your_refresh_token_here"
}
```

**Response:**
```json
{
    "access": "new_access_token_here"
}
```

## Token Verify (Optional)

Verify if a token is still valid:

**Endpoint:** `POST http://127.0.0.1:8000/api/auth/token/verify/`

**Request Body (JSON):**
```json
{
    "token": "your_access_token_here"
}
```

## Postman Setup

### Method 1: Using Authorization Tab (RECOMMENDED)

1. **Get Token:**
   - Method: `POST`
   - URL: `http://127.0.0.1:8000/api/auth/token/`
   - Body (raw JSON):
     ```json
     {
         "username": "m123456",
         "password": "your_password"
     }
     ```
   - Copy the `access` token from response

2. **Use Token:**
   - Method: `GET` (or any method)
   - URL: `http://127.0.0.1:8000/api/children/`
   - **Authorization tab:**
     - Type: `Bearer Token`
     - Token: Paste your `access` token
   - Click **Send**

### Method 2: Using Headers Tab

1. **Headers tab:**
   - Key: `Authorization`
   - Value: `Bearer your_access_token_here`
   - ✅ Checkbox checked

## Token Lifetime

- **Access Token:** Valid for 1 hour
- **Refresh Token:** Valid for 7 days

After 1 hour, use the refresh token to get a new access token without logging in again.

## Swagger UI

Swagger UI now supports Bearer Token authentication:

1. Go to `http://127.0.0.1:8000/swagger/`
2. Click **Authorize** button
3. Enter: `Bearer your_access_token_here`
4. Click **Authorize**

## Example: Complete Flow in Postman

### 1. Get Token
```
POST http://127.0.0.1:8000/api/auth/token/
Body: {"username": "m123456", "password": "your_password"}
Response: {"access": "...", "refresh": "..."}
```

### 2. Get Children (using Bearer Token)
```
GET http://127.0.0.1:8000/api/children/
Authorization: Bearer <access_token>
```

### 3. Refresh Token (when access token expires)
```
POST http://127.0.0.1:8000/api/auth/token/refresh/
Body: {"refresh": "<refresh_token>"}
Response: {"access": "new_access_token"}
```

## Available Endpoints

- `POST /api/auth/token/` - Get access & refresh tokens
- `POST /api/auth/token/refresh/` - Refresh access token
- `POST /api/auth/token/verify/` - Verify token validity

All other endpoints require Bearer Token authentication.

## Troubleshooting

**Error: "Authentication credentials were not provided"**
- Make sure you're using `Bearer` (not `Token`)
- Check that the Authorization header is set correctly
- Verify the token hasn't expired (access tokens last 1 hour)

**Error: "Token is invalid or expired"**
- Get a new token using `/api/auth/token/`
- Or refresh using `/api/auth/token/refresh/`

**Error: "No active account found"**
- Check your username and password are correct

