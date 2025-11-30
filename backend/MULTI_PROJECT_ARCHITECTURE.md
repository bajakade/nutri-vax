# Multi-Project Architecture Explained

## 🎯 The Problem This Solves

**Without this system:**
- You'd need separate databases/servers for each health project
- Data entry staff from "NutriVax Nigeria" could accidentally see/modify data from "NutriVax Kenya"
- No centralized management or reporting across projects
- Expensive to maintain multiple systems

**With this system:**
- ✅ **One database, multiple projects** - All projects share the same infrastructure
- ✅ **Automatic data isolation** - Users only see their project's data
- ✅ **Role-based access** - Different permissions for different roles
- ✅ **Centralized management** - Global admins can oversee all projects
- ✅ **Cost-effective** - One system instead of many

## 🏗️ How Multi-Tenancy Works

### The Core Concept: Project as Tenant

Every piece of data belongs to a **Project**:

```
Project: "NutriVax Nigeria"
  ├── Facilities (hospitals, clinics)
  ├── Admin Divisions (States, LGAs, Wards)
  ├── Distribution Registers (child nutrition records)
  └── Users assigned to this project

Project: "NutriVax Kenya"  
  ├── Facilities (different hospitals)
  ├── Admin Divisions (different regions)
  ├── Distribution Registers (different children)
  └── Users assigned to this project
```

### Database Structure

Every table has a `project_id` foreign key:

```python
# Facility table
id | name              | project_id | facility_type_id | ...
---|-------------------|------------|------------------|----
1  | Lagos Hospital    | uuid-nigeria | ...            | ...
2  | Nairobi Clinic   | uuid-kenya   | ...            | ...
3  | Abuja Health Post | uuid-nigeria | ...            | ...
```

**Key Point:** When a user queries facilities, the system automatically filters by their project!

## 👥 User Roles & Access Levels

### 1. **GLOBAL_ADMIN** (Superuser)
```python
# Can do EVERYTHING across ALL projects
- See all projects
- Create/edit/delete any project
- Access all facilities, users, data
- Manage everything
```

**Use Case:** System administrators, headquarters staff

### 2. **PROJECT_MANAGER**
```python
# Full control over ONE project
- See only their assigned project
- Create/edit facilities in their project
- Manage users in their project
- View all data in their project
- Cannot see other projects
```

**Use Case:** Country program managers, regional coordinators

### 3. **DATA_ENTRY_STAFF**
```python
# Can create/edit records at ONE facility
- See only their assigned facility's records
- Create new distribution registers
- Update ration cards
- Read-only access to other facilities in their project
- Cannot see other projects
```

**Use Case:** Health workers at specific clinics

### 4. **VIEWER**
```python
# Read-only access to ONE project
- See all data in their project (read-only)
- Cannot create, edit, or delete
- Cannot see other projects
```

**Use Case:** Reporters, analysts, auditors

## 🔒 How Data Filtering Works

### Automatic Filtering in Views

When a user requests `/api/facilities/`, here's what happens:

```python
# In FacilityViewSet.get_queryset()
def get_queryset(self):
    queryset = Facility.objects.all()  # Start with ALL facilities
    
    # Check user's role
    if self.request.user.is_superuser:
        return queryset  # Superuser sees ALL projects
    
    # Get user's profile
    profile = self.request.user.profile
    
    # Filter by project
    if profile.project:
        queryset = queryset.filter(project=profile.project)
        # Now queryset only has facilities from user's project!
    
    return queryset
```

**Example:**
- User from "NutriVax Nigeria" requests facilities
- System automatically adds `WHERE project_id = 'nigeria-uuid'`
- User only sees Nigerian facilities, never Kenyan ones

### Permission Checks

Before allowing any action, the system checks:

```python
# In ProjectPermission.has_object_permission()
def has_object_permission(self, request, view, obj):
    profile = request.user.profile
    
    # Can user access THIS specific facility?
    if profile.project == obj.project:
        return True  # ✅ Same project, allowed
    else:
        return False  # ❌ Different project, denied
```

**Example:**
- User from "NutriVax Nigeria" tries to access a Kenyan facility
- System checks: `nigeria-project != kenya-project` → **403 Forbidden**

## 📊 Real-World Example

### Scenario: Managing Two Projects

**Project 1: "NutriVax Nigeria"**
- 50 facilities in Nigeria
- 10,000 children registered
- 5 project managers, 20 data entry staff

**Project 2: "NutriVax Kenya"**
- 30 facilities in Kenya  
- 5,000 children registered
- 3 project managers, 15 data entry staff

### How Users Interact:

**1. Global Admin (superuser) logs in:**
```
GET /api/projects/
→ Sees BOTH projects: ["NutriVax Nigeria", "NutriVax Kenya"]

GET /api/facilities/
→ Sees ALL 80 facilities (50 + 30)
```

**2. Project Manager from Nigeria logs in:**
```
GET /api/projects/
→ Sees ONLY: ["NutriVax Nigeria"] (their project)

GET /api/facilities/
→ Sees ONLY 50 Nigerian facilities
→ Cannot see any Kenyan facilities
```

**3. Data Entry Staff from Lagos Hospital logs in:**
```
GET /api/facilities/
→ Sees ONLY: ["Lagos Hospital"] (their facility)

GET /api/distribution-registers/
→ Sees ONLY records from Lagos Hospital
→ Cannot see records from other facilities
```

## 🛠️ How to Use It

### Step 1: Create Projects

```python
# As Global Admin, create projects
POST /api/projects/
{
  "name": "NutriVax Nigeria",
  "country": "Nigeria",
  "is_active": true
}
# Response: {
#   "id": "550e8400-e29b-41d4-a716-446655440000",  # <-- Save this UUID!
#   "name": "NutriVax Nigeria",
#   "country": "Nigeria",
#   ...
# }

POST /api/projects/
{
  "name": "NutriVax Kenya", 
  "country": "Kenya",
  "is_active": true
}
# Response: {
#   "id": "660e8400-e29b-41d4-a716-446655440001",  # <-- Save this UUID!
#   "name": "NutriVax Kenya",
#   ...
# }

# Or list existing projects to get their UUIDs:
GET /api/projects/
# Returns all projects with their UUIDs
```

### Step 2: Create Users & Assign to Projects

```python
# Step 2a: Get the project UUID first
GET /api/projects/
# Response will include projects with their UUIDs:
# {
#   "results": [
#     {
#       "id": "550e8400-e29b-41d4-a716-446655440000",  # <-- This is the UUID you need!
#       "name": "NutriVax Nigeria",
#       "country": "Nigeria",
#       ...
#     }
#   ]
# }

# Step 2b: Create a user account
POST /api/auth/users/
{
  "username": "john_manager",
  "email": "john@nutrivax.org",
  "password": "secure123",
  "first_name": "John",
  "last_name": "Doe"
}
# Response: {"id": 1, "username": "john_manager", ...}

# Step 2c: Create user profile and assign to project
# Use the actual UUID from Step 2a and user ID from Step 2b
POST /api/user-profiles/
{
  "user_id": 1,  # John's user ID from Step 2b
  "project": "550e8400-e29b-41d4-a716-446655440000",  # Real UUID from Step 2a
  "role": "PROJECT_MANAGER",
  "is_active": true
}
```

**Important:** 
- You must use a **real UUID** from an existing project (get it from `GET /api/projects/`)
- The UUID format is: `550e8400-e29b-41d4-a716-446655440000` (not a placeholder string)
- If you don't have a project yet, create one first using `POST /api/projects/`

### Step 3: Users Automatically See Only Their Project

When John (Project Manager for Nigeria) logs in:

```python
# John's token is used in requests
GET /api/facilities/
Authorization: Bearer johns-jwt-token

# System automatically:
# 1. Authenticates John
# 2. Gets John's profile → finds project = "Nigeria"
# 3. Filters: WHERE project_id = 'nigeria-uuid'
# 4. Returns only Nigerian facilities
```

### Step 4: Create Project-Specific Data

```python
# John creates a facility (automatically assigned to his project)
POST /api/facilities/
Authorization: Bearer johns-jwt-token
{
  "name": "Lagos General Hospital",
  "facility_type": "facility-type-uuid",
  "admin_division": "lagos-division-uuid"
}

# System automatically sets:
# - project = John's project (Nigeria)
# - John can only create facilities in Nigeria
```

## 🔐 Security Features

### 1. **Automatic Project Assignment**
- When creating records, the system uses the user's project
- Users **cannot** manually set a different project
- Prevents cross-project data leakage

### 2. **Query Filtering**
- Every query automatically filters by project
- Even if a user tries to access `/api/facilities/?project=kenya-uuid`
- The system ignores the parameter and uses their assigned project

### 3. **Object-Level Permissions**
- Even if a user somehow gets a facility ID from another project
- The permission check will deny access
- Returns 403 Forbidden

### 4. **Role-Based Actions**
```python
# Data Entry Staff can only create/edit at their facility
if profile.role == 'DATA_ENTRY_STAFF':
    if profile.facility:
        # Can only create records for their facility
        queryset = queryset.filter(facility=profile.facility)
```

## 📈 Benefits

### 1. **Data Isolation**
- Projects are completely separate
- No risk of data mixing
- Each project's data is protected

### 2. **Scalability**
- Add new projects without code changes
- Just create a new Project record
- System automatically handles it

### 3. **Flexibility**
- Users can be reassigned to different projects
- Facilities can be moved between projects (if needed)
- Projects can be activated/deactivated

### 4. **Centralized Reporting**
- Global admins can generate reports across all projects
- Compare performance between projects
- Aggregate statistics

### 5. **Cost Efficiency**
- One database, one server
- Shared infrastructure
- Lower maintenance costs

## 🎯 Practical Use Cases

### Use Case 1: New Country Program
```
1. Global Admin creates: Project "NutriVax Ghana"
2. Creates admin levels: Country → Region → District
3. Creates facilities in Ghana
4. Assigns Ghanaian staff to the project
5. Staff automatically see only Ghana data
```

### Use Case 2: Staff Transfer
```
1. Staff member moves from Nigeria to Kenya
2. Admin updates UserProfile:
   - Changes project from Nigeria → Kenya
   - Staff now sees only Kenya data
   - Old Nigeria data is hidden
```

### Use Case 3: Multi-Project Reporting
```
1. Global Admin queries all projects
2. Aggregates data across projects
3. Generates global nutrition statistics
4. Compares performance: Nigeria vs Kenya vs Ghana
```

## 🔍 How to Verify It's Working

### Test 1: Check User's Project
```python
# Login as a user
GET /api/user-profiles/me/  # (if you have this endpoint)
# Returns: {"project": "nigeria-uuid", "role": "PROJECT_MANAGER"}
```

### Test 2: Verify Filtering
```python
# As Nigeria Project Manager
GET /api/facilities/
# Should only return Nigerian facilities

# Try to access Kenyan facility directly
GET /api/facilities/kenya-facility-uuid/
# Should return 403 Forbidden (if permission check works)
# Or 404 Not Found (if queryset filtering works)
```

### Test 3: Check Cross-Project Access
```python
# As Nigeria user, try to create facility with Kenya project
POST /api/facilities/
{
  "name": "Test",
  "project": "kenya-uuid",  # Different project!
  ...
}
# System should either:
# - Ignore the project parameter (use user's project)
# - Return 403 Forbidden
```

## 📝 Summary

**This system solves:**
- ✅ Managing multiple health projects in one system
- ✅ Automatic data isolation per project
- ✅ Role-based access control
- ✅ Preventing cross-project data access
- ✅ Centralized management with distributed access

**How it works:**
1. Every record has a `project_id`
2. Users are assigned to a project via `UserProfile`
3. Views automatically filter by user's project
4. Permissions check project ownership
5. Users only see/modify their project's data

**Result:**
- One system, multiple isolated projects
- Secure, scalable, cost-effective
- Easy to add new projects
- No code changes needed for new projects

