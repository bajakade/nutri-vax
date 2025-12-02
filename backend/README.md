# NutriVax-Measles SQ-LNS Supplementation Program API

A comprehensive Django Rest Framework (DRF) application for managing the logistics of the NutriVax-Measles SQ-LNS Supplementation Program, with hierarchical location management and robust user role/permission systems.

## Features

- **Hierarchical Location Management**: Flexible geographical hierarchy (State → LGA → Ward → PHCC → Settlement)
- **Role-Based Access Control**: Three user roles (Admin, PHCC Staff, Supervisor) with granular permissions
- **Complete Data Models**: Child, DistributionVisit, Referral, SQ_LNSStock, and ProgramStaff
- **RESTful API**: Full CRUD operations with filtering, searching, and pagination
- **Swagger Documentation**: Interactive API documentation with drf-yasg
- **CSV Import**: Management command for bulk location import
- **PostgreSQL Database**: Production-ready database configuration

## Requirements

- Python 3.8+
- PostgreSQL 12+
- Django 5.0+
- Django Rest Framework 3.14+

## Installation

1. **Clone the repository and navigate to the project directory**

2. **Create and activate a virtual environment**:
   ```bash
   python -m venv env
   # On Windows
   env\Scripts\activate
   # On Linux/Mac
   source env/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up PostgreSQL database**:
   - Create a PostgreSQL database named `nutrivax_db` (or your preferred name)
   - Update database credentials in `.env` file (see `.env.example`)

5. **Create `.env` file**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and update the database credentials and secret key.

6. **Run migrations**:
   ```bash
   python manage.py migrate
   ```

7. **Create a superuser**:
   ```bash
   python manage.py createsuperuser
   ```

8. **Run the development server**:
   ```bash
   python manage.py runserver
   ```

## Configuration

The application uses environment variables for configuration. Create a `.env` file in the project root with the following variables:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=nutrivax_db
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
```

## User Roles and Permissions

### Admin (is_superuser)
- Full CRUD access to ALL models
- Can manage users, locations, and all program data
- Can import locations via CSV

### PHCC Staff
- **READ** access to all data
- **CREATE/UPDATE** access only for:
  - DistributionVisit records for children in their assigned PHCC
  - Referral records for children in their assigned PHCC
- Cannot create or modify Child records (admin only)

### Supervisor
- **READ** access to ALL data across the state
- **UPDATE** access for SQ_LNSStock records (for auditing)
- No CREATE access except for stock auditing

## API Endpoints

### Authentication
- `POST /api/auth/token/` - Obtain authentication token

### Locations
- `GET /api/locations/` - List all locations
- `GET /api/locations/{id}/` - Retrieve a location
- `POST /api/locations/` - Create a location (Admin only)
- `PUT/PATCH /api/locations/{id}/` - Update a location (Admin only)
- `DELETE /api/locations/{id}/` - Delete a location (Admin only)
- `GET /api/locations/{id}/children/` - Get children of a location
- `GET /api/locations/by_type/?type=STATE` - Filter by type

### Children
- `GET /api/children/` - List all children
- `GET /api/children/{id}/` - Retrieve a child
- `POST /api/children/` - Create a child (Admin only)
- `PUT/PATCH /api/children/{id}/` - Update a child (Admin only)
- `DELETE /api/children/{id}/` - Delete a child (Admin only)
- `GET /api/children/{id}/visits/` - Get distribution visits for a child
- `GET /api/children/{id}/referrals/` - Get referrals for a child

### Distribution Visits
- `GET /api/distribution-visits/` - List all visits
- `GET /api/distribution-visits/{id}/` - Retrieve a visit
- `POST /api/distribution-visits/` - Create a visit (PHCC Staff for their PHCC)
- `PUT/PATCH /api/distribution-visits/{id}/` - Update a visit (PHCC Staff for their PHCC)
- `DELETE /api/distribution-visits/{id}/` - Delete a visit (Admin only)
- `GET /api/distribution-visits/by_phcc/?phcc={id}` - Filter by PHCC

### Referrals
- `GET /api/referrals/` - List all referrals
- `GET /api/referrals/{id}/` - Retrieve a referral
- `POST /api/referrals/` - Create a referral (PHCC Staff for their PHCC)
- `PUT/PATCH /api/referrals/{id}/` - Update a referral (PHCC Staff for their PHCC)
- `DELETE /api/referrals/{id}/` - Delete a referral (Admin only)
- `GET /api/referrals/by_status/?status=PENDING` - Filter by status

### SQ-LNS Stock
- `GET /api/stock/` - List all stock records
- `GET /api/stock/{id}/` - Retrieve a stock record
- `POST /api/stock/` - Create a stock record (Admin only)
- `PUT/PATCH /api/stock/{id}/` - Update a stock record (Admin/Supervisor)
- `DELETE /api/stock/{id}/` - Delete a stock record (Admin only)
- `GET /api/stock/low_stock/` - Get low/out of stock records
- `GET /api/stock/by_phcc/?phcc={id}` - Filter by PHCC

### Program Staff
- `GET /api/staff/` - List all staff
- `GET /api/staff/{id}/` - Retrieve a staff member
- `POST /api/staff/` - Create a staff member (Admin only)
- `PUT/PATCH /api/staff/{id}/` - Update a staff member (Admin only)
- `DELETE /api/staff/{id}/` - Delete a staff member (Admin only)

## API Documentation

Interactive API documentation is available at:
- **Swagger UI**: http://localhost:8000/swagger/
- **ReDoc**: http://localhost:8000/redoc/

## CSV Location Import

Import locations from a CSV file using the management command:

```bash
python manage.py import_locations path/to/locations.csv
```

### CSV Format

The CSV file should have the following columns:

| Column | Required | Description | Example |
|--------|----------|-------------|---------|
| state_name | Yes | State name | "Yobe" |
| lga_name | Yes | Local Government Area name | "Nguru" |
| ward_name | Yes | Ward name | "Hausari" |
| phcc_name | Yes | Primary Health Care Center name | "AFUNORI" |
| settlement_name | No | Settlement name (optional) | "Example Village" |

### Example CSV

```csv
state_name,lga_name,ward_name,phcc_name,settlement_name
Yobe,Nguru,Hausari,AFUNORI,Example Village
Yobe,Nguru,Hausari,AFUNORI,Another Village
```

### Dry Run

Test the import without creating records:

```bash
python manage.py import_locations path/to/locations.csv --dry-run
```

## Usage Examples

### 1. Authenticate and Get Token

```bash
curl -X POST http://localhost:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "yourpassword"}'
```

### 2. Create a Location (Admin)

```bash
curl -X POST http://localhost:8000/api/locations/ \
  -H "Authorization: Token your-token-here" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Yobe",
    "type": "STATE",
    "parent": null
  }'
```

### 3. Create a Child (Admin)

```bash
curl -X POST http://localhost:8000/api/children/ \
  -H "Authorization: Token your-token-here" \
  -H "Content-Type: application/json" \
  -d '{
    "child_id": "CH001",
    "first_name": "John",
    "last_name": "Doe",
    "date_of_birth": "2020-01-15",
    "gender": "M",
    "phcc": 1,
    "caregiver_name": "Jane Doe",
    "caregiver_relationship": "Mother",
    "admission_criteria": "MUAC_115_124",
    "admission_date": "2024-01-01"
  }'
```

### 4. Create a Distribution Visit (PHCC Staff)

```bash
curl -X POST http://localhost:8000/api/distribution-visits/ \
  -H "Authorization: Token phcc-staff-token" \
  -H "Content-Type: application/json" \
  -d '{
    "child": 1,
    "visit_date": "2024-02-01",
    "visit_number": 1,
    "muac": 120.5,
    "weight": 8.5,
    "sachets_received": 30
  }'
```

## Project Structure

```
nutrivax_project/
├── nutrivax_project/          # Project settings
│   ├── settings.py            # Django settings
│   ├── urls.py                # Main URL configuration
│   └── wsgi.py                # WSGI configuration
├── nutrivax_app/              # Main application
│   ├── models.py              # Data models
│   ├── serializers.py         # DRF serializers
│   ├── views.py               # API viewsets
│   ├── urls.py                # App URL configuration
│   ├── permissions.py         # Custom permissions
│   ├── admin.py               # Django admin configuration
│   └── management/
│       └── commands/
│           └── import_locations.py  # CSV import command
├── manage.py                  # Django management script
├── requirements.txt           # Python dependencies
└── README.md                  # This file
```

## Models Overview

### Location
Hierarchical location model supporting State → LGA → Ward → PHCC → Settlement structure.

### Child
Beneficiary profiles with caregiver information and admission criteria.

### DistributionVisit
Monthly assessments (MUAC, weight, height, Z-score) and ration distribution tracking.

### Referral
Tracks movement of children for SAM/MAM treatment between different facilities.

### SQ_LNSStock
Inventory management for SQ-LNS sachets with stock movements and status tracking.

### ProgramStaff
Staff members linked to PHCCs and User accounts for role-based access control.

## Development

### Running Tests

```bash
python manage.py test
```

### Creating Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Accessing Django Admin

Navigate to http://localhost:8000/admin/ and log in with your superuser credentials.

## License

This project is for internal use by the NutriVax-Measles SQ-LNS Supplementation Program.

## Support

For issues or questions, please contact the development team.

