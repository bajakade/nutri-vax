# NutriVax API Endpoints

## Base URL

**Local Development:**
```
http://localhost:8000/api/nutrivax/
```

**Production (Railway):**
```
https://your-app.railway.app/api/nutrivax/
```

## Authentication Endpoints

- `POST /api/nutrivax/auth/token/` - Obtain JWT authentication token
- `POST /api/nutrivax/auth/token/refresh/` - Refresh JWT token
- `POST /api/nutrivax/auth/token/verify/` - Verify JWT token

## API Resources

### Projects
- `GET /api/nutrivax/projects/` - List all projects
- `POST /api/nutrivax/projects/` - Create a project (GlobalAdmin only)
- `GET /api/nutrivax/projects/{id}/` - Retrieve a project
- `PUT /api/nutrivax/projects/{id}/` - Update a project (GlobalAdmin only)
- `PATCH /api/nutrivax/projects/{id}/` - Partially update a project (GlobalAdmin only)
- `DELETE /api/nutrivax/projects/{id}/` - Delete a project (GlobalAdmin only)

### Admin Levels
- `GET /api/nutrivax/admin-levels/` - List all administrative levels
- `POST /api/nutrivax/admin-levels/` - Create an administrative level
- `GET /api/nutrivax/admin-levels/{id}/` - Retrieve an administrative level
- `PUT /api/nutrivax/admin-levels/{id}/` - Update an administrative level
- `PATCH /api/nutrivax/admin-levels/{id}/` - Partially update an administrative level
- `DELETE /api/nutrivax/admin-levels/{id}/` - Delete an administrative level

### Admin Divisions
- `GET /api/nutrivax/admin-divisions/` - List all administrative divisions
- `POST /api/nutrivax/admin-divisions/` - Create an administrative division
- `GET /api/nutrivax/admin-divisions/{id}/` - Retrieve an administrative division
- `GET /api/nutrivax/admin-divisions/{id}/children/` - Get child divisions
- `PUT /api/nutrivax/admin-divisions/{id}/` - Update an administrative division
- `PATCH /api/nutrivax/admin-divisions/{id}/` - Partially update an administrative division
- `DELETE /api/nutrivax/admin-divisions/{id}/` - Delete an administrative division

### Facility Types
- `GET /api/nutrivax/facility-types/` - List all facility types
- `POST /api/nutrivax/facility-types/` - Create a facility type
- `GET /api/nutrivax/facility-types/{id}/` - Retrieve a facility type
- `PUT /api/nutrivax/facility-types/{id}/` - Update a facility type
- `PATCH /api/nutrivax/facility-types/{id}/` - Partially update a facility type
- `DELETE /api/nutrivax/facility-types/{id}/` - Delete a facility type

### Facilities
- `GET /api/nutrivax/facilities/` - List all facilities
- `POST /api/nutrivax/facilities/` - Create a facility (can assign to multiple projects)
- `GET /api/nutrivax/facilities/{id}/` - Retrieve a facility
- `PUT /api/nutrivax/facilities/{id}/` - Update a facility (can update project assignments)
- `PATCH /api/nutrivax/facilities/{id}/` - Partially update a facility
- `DELETE /api/nutrivax/facilities/{id}/` - Delete a facility

**Note:** Facilities can now belong to multiple projects. When creating/updating, use the `projects` field with an array of project IDs.

### User Management
- `GET /api/nutrivax/auth/users/` - List all users (GlobalAdmin only)
- `POST /api/nutrivax/auth/users/` - Create a user (GlobalAdmin only)
- `GET /api/nutrivax/auth/users/{id}/` - Retrieve a user (GlobalAdmin only)
- `PUT /api/nutrivax/auth/users/{id}/` - Update a user (GlobalAdmin only)
- `PATCH /api/nutrivax/auth/users/{id}/` - Partially update a user (GlobalAdmin only)
- `DELETE /api/nutrivax/auth/users/{id}/` - Delete a user (GlobalAdmin only)

### User Profiles
- `GET /api/nutrivax/user-profiles/` - List all user profiles
- `POST /api/nutrivax/user-profiles/` - Create a user profile
- `GET /api/nutrivax/user-profiles/{id}/` - Retrieve a user profile
- `PUT /api/nutrivax/user-profiles/{id}/` - Update a user profile
- `PATCH /api/nutrivax/user-profiles/{id}/` - Partially update a user profile
- `DELETE /api/nutrivax/user-profiles/{id}/` - Delete a user profile

### Distribution Registers
- `GET /api/nutrivax/distribution-registers/` - List all distribution registers
- `POST /api/nutrivax/distribution-registers/` - Create a distribution register
- `GET /api/nutrivax/distribution-registers/{id}/` - Retrieve a distribution register
- `PUT /api/nutrivax/distribution-registers/{id}/` - Update a distribution register
- `PATCH /api/nutrivax/distribution-registers/{id}/` - Partially update a distribution register
- `DELETE /api/nutrivax/distribution-registers/{id}/` - Delete a distribution register

### Ration Cards
- `GET /api/nutrivax/ration-cards/` - List all ration cards
- `POST /api/nutrivax/ration-cards/` - Create a ration card
- `GET /api/nutrivax/ration-cards/{id}/` - Retrieve a ration card
- `PUT /api/nutrivax/ration-cards/{id}/` - Update a ration card
- `PATCH /api/nutrivax/ration-cards/{id}/` - Partially update a ration card
- `DELETE /api/nutrivax/ration-cards/{id}/` - Delete a ration card

## API Documentation

- **Swagger UI**: `/api/nutrivax/schema/swagger-ui/`
- **ReDoc**: `/api/nutrivax/schema/redoc/`
- **OpenAPI Schema**: `/api/nutrivax/schema/`

## Example Usage

### Get Authentication Token
```bash
curl -X POST https://your-app.railway.app/api/nutrivax/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "your_username", "password": "your_password"}'
```

### List Facilities
```bash
curl -X GET https://your-app.railway.app/api/nutrivax/facilities/ \
  -H "Authorization: Bearer your_token_here"
```

### Create Facility with Multiple Projects
```bash
curl -X POST https://your-app.railway.app/api/nutrivax/facilities/ \
  -H "Authorization: Bearer your_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Health Centre A",
    "facility_type": "facility-type-uuid",
    "admin_division": "admin-division-uuid",
    "projects": ["project-uuid-1", "project-uuid-2"],
    "is_active": true
  }'
```
