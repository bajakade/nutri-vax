from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view
from django.contrib.auth.models import User
from .models import (
    Project, AdminLevel, AdminDivision, FacilityType, Facility,
    UserProfile, DistributionRegister, RationCard
)
from .serializers import (
    ProjectSerializer, AdminLevelSerializer, AdminDivisionSerializer,
    FacilityTypeSerializer, FacilitySerializer, UserProfileSerializer,
    DistributionRegisterSerializer, RationCardSerializer, UserSerializer
)
from .permissions import (
    GlobalAdminPermission, ProjectPermission, FacilityPermission
)


@extend_schema_view(
    list=extend_schema(description="List all projects. Only GlobalAdmin can access."),
    create=extend_schema(description="Create a new project. Only GlobalAdmin can access."),
    retrieve=extend_schema(description="Retrieve a specific project. Only GlobalAdmin can access."),
    update=extend_schema(description="Update a project. Only GlobalAdmin can access."),
    partial_update=extend_schema(description="Partially update a project. Only GlobalAdmin can access."),
    destroy=extend_schema(description="Delete a project. Only GlobalAdmin can access."),
)
class ProjectViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Project records.
    
    **Permissions:**
    - GlobalAdmin: Full CRUD access
    
    **Filtering:**
    - `?country={country}` - Filter by country
    - `?is_active={true/false}` - Filter by active status
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated, GlobalAdminPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['country', 'is_active']
    search_fields = ['name', 'country']
    ordering_fields = ['name', 'country', 'created_at']
    ordering = ['name']


@extend_schema_view(
    list=extend_schema(description="List all administrative levels. Filtered by user's project."),
    create=extend_schema(description="Create a new administrative level. Restricted to user's project."),
    retrieve=extend_schema(description="Retrieve a specific administrative level."),
    update=extend_schema(description="Update an administrative level. Restricted to user's project."),
    partial_update=extend_schema(description="Partially update an administrative level. Restricted to user's project."),
    destroy=extend_schema(description="Delete an administrative level. Restricted to user's project."),
)
class AdminLevelViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing AdminLevel records.
    
    **Permissions:**
    - GlobalAdmin: Full CRUD access
    - ProjectManager: Full CRUD access, restricted to their assigned Project
    - Others: Read-only access, restricted to their assigned Project
    
    **Filtering:**
    - `?project={id}` - Filter by project
    - `?is_active={true/false}` - Filter by active status
    """
    queryset = AdminLevel.objects.select_related('project').all()
    serializer_class = AdminLevelSerializer
    permission_classes = [IsAuthenticated, ProjectPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['project', 'is_active']
    search_fields = ['name']
    ordering_fields = ['order', 'name', 'created_at']
    ordering = ['order', 'name']
    
    def get_queryset(self):
        """Filter queryset based on user's project assignment."""
        queryset = super().get_queryset()
        
        # GlobalAdmin can see all
        if self.request.user.is_superuser:
            return queryset
        
        # Filter by user's assigned project
        try:
            profile = self.request.user.profile
            if profile.project:
                queryset = queryset.filter(project=profile.project)
        except UserProfile.DoesNotExist:
            queryset = queryset.none()
        
        return queryset


@extend_schema_view(
    list=extend_schema(description="List all administrative divisions. Filtered by user's project."),
    create=extend_schema(description="Create a new administrative division. Restricted to user's project."),
    retrieve=extend_schema(description="Retrieve a specific administrative division."),
    update=extend_schema(description="Update an administrative division. Restricted to user's project."),
    partial_update=extend_schema(description="Partially update an administrative division. Restricted to user's project."),
    destroy=extend_schema(description="Delete an administrative division. Restricted to user's project."),
)
class AdminDivisionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing AdminDivision records.
    
    **Permissions:**
    - GlobalAdmin: Full CRUD access
    - ProjectManager: Full CRUD access, restricted to their assigned Project
    - Others: Read-only access, restricted to their assigned Project
    
    **Filtering:**
    - `?project={id}` - Filter by project
    - `?level={id}` - Filter by administrative level
    - `?parent_division={id}` - Filter by parent division
    - `?is_active={true/false}` - Filter by active status
    """
    queryset = AdminDivision.objects.select_related('project', 'level', 'parent_division').all()
    serializer_class = AdminDivisionSerializer
    permission_classes = [IsAuthenticated, ProjectPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['project', 'level', 'parent_division', 'is_active']
    search_fields = ['name']
    ordering_fields = ['name', 'level__order', 'created_at']
    ordering = ['level__order', 'name']
    
    def get_queryset(self):
        """Filter queryset based on user's project assignment."""
        queryset = super().get_queryset()
        
        # GlobalAdmin can see all
        if self.request.user.is_superuser:
            return queryset
        
        # Filter by user's assigned project
        try:
            profile = self.request.user.profile
            if profile.project:
                queryset = queryset.filter(project=profile.project)
        except UserProfile.DoesNotExist:
            queryset = queryset.none()
        
        return queryset
    
    @action(detail=True, methods=['get'])
    def children(self, request, pk=None):
        """Get all child divisions."""
        division = self.get_object()
        children = division.children.all()
        serializer = self.get_serializer(children, many=True)
        return Response(serializer.data)


@extend_schema_view(
    list=extend_schema(description="List all facility types. Filtered by user's project."),
    create=extend_schema(description="Create a new facility type. Restricted to user's project."),
    retrieve=extend_schema(description="Retrieve a specific facility type."),
    update=extend_schema(description="Update a facility type. Restricted to user's project."),
    partial_update=extend_schema(description="Partially update a facility type. Restricted to user's project."),
    destroy=extend_schema(description="Delete a facility type. Restricted to user's project."),
)
class FacilityTypeViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing FacilityType records.
    
    **Permissions:**
    - GlobalAdmin: Full CRUD access
    - ProjectManager: Full CRUD access, restricted to their assigned Project
    - Others: Read-only access, restricted to their assigned Project
    
    **Filtering:**
    - `?project={id}` - Filter by project
    - `?is_active={true/false}` - Filter by active status
    """
    queryset = FacilityType.objects.select_related('project').all()
    serializer_class = FacilityTypeSerializer
    permission_classes = [IsAuthenticated, ProjectPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['project', 'is_active']
    search_fields = ['name']
    ordering_fields = ['name', 'created_at']
    ordering = ['name']
    
    def get_queryset(self):
        """Filter queryset based on user's project assignment."""
        queryset = super().get_queryset()
        
        # GlobalAdmin can see all
        if self.request.user.is_superuser:
            return queryset
        
        # Filter by user's assigned project
        try:
            profile = self.request.user.profile
            if profile.project:
                queryset = queryset.filter(project=profile.project)
        except UserProfile.DoesNotExist:
            queryset = queryset.none()
        
        return queryset
    

@extend_schema_view(
    list=extend_schema(description="List all facilities. Filtered by user's project."),
    create=extend_schema(description="Create a new facility. Restricted to user's project."),
    retrieve=extend_schema(description="Retrieve a specific facility."),
    update=extend_schema(description="Update a facility. Restricted to user's project."),
    partial_update=extend_schema(description="Partially update a facility. Restricted to user's project."),
    destroy=extend_schema(description="Delete a facility. Restricted to user's project."),
)
class FacilityViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing Facility records.
    
    **Permissions:**
    - GlobalAdmin: Full CRUD access
    - ProjectManager: Full CRUD access, restricted to their assigned Project
    - Others: Read-only access, restricted to their assigned Project
    
    **Filtering:**
    - `?projects={id}` - Filter by project (many-to-many)
    - `?facility_type={id}` - Filter by facility type
    - `?admin_division={id}` - Filter by administrative division
    - `?is_active={true/false}` - Filter by active status
    """
    queryset = Facility.objects.prefetch_related('projects').select_related('facility_type', 'admin_division').all()
    serializer_class = FacilitySerializer
    permission_classes = [IsAuthenticated, ProjectPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['projects', 'facility_type', 'admin_division', 'is_active']
    search_fields = ['name']
    ordering_fields = ['name', 'created_at']
    ordering = ['name']
    
    def get_queryset(self):
        """Filter queryset based on user's project assignment."""
        queryset = super().get_queryset()
        
        # GlobalAdmin can see all
        if self.request.user.is_superuser:
            return queryset
        
        # Filter by user's assigned project
        try:
            profile = self.request.user.profile
            if profile.project:
                queryset = queryset.filter(projects=profile.project)
        except UserProfile.DoesNotExist:
            queryset = queryset.none()
        
        return queryset
    

@extend_schema_view(
    list=extend_schema(description="List all user profiles. Filtered by user's project."),
    create=extend_schema(description="Create a new user profile. Restricted to GlobalAdmin and ProjectManager."),
    retrieve=extend_schema(description="Retrieve a specific user profile."),
    update=extend_schema(description="Update a user profile. Restricted to GlobalAdmin and ProjectManager."),
    partial_update=extend_schema(description="Partially update a user profile. Restricted to GlobalAdmin and ProjectManager."),
    destroy=extend_schema(description="Delete a user profile. Restricted to GlobalAdmin and ProjectManager."),
)
class UserProfileViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing UserProfile records.
    
    **Permissions:**
    - GlobalAdmin: Full CRUD access
    - ProjectManager: Full CRUD access, restricted to their assigned Project
    - Others: Read-only access to their own profile
    
    **Filtering:**
    - `?project={id}` - Filter by project
    - `?facility={id}` - Filter by facility
    - `?role={role}` - Filter by role
    - `?is_active={true/false}` - Filter by active status
    """
    queryset = UserProfile.objects.select_related('user', 'project', 'facility').all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated, ProjectPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['project', 'facility', 'role', 'is_active']
    search_fields = ['user__username', 'user__email']
    ordering_fields = ['user__username', 'created_at']
    ordering = ['user__username']
    
    def get_queryset(self):
        """Filter queryset based on user's project assignment."""
        queryset = super().get_queryset()
        
        # GlobalAdmin can see all
        if self.request.user.is_superuser:
            return queryset
        
        # Filter by user's assigned project
        try:
            profile = self.request.user.profile
            if profile.project:
                queryset = queryset.filter(project=profile.project)
        except UserProfile.DoesNotExist:
            queryset = queryset.none()
        
        return queryset
    

@extend_schema_view(
    list=extend_schema(description="List all distribution registers. Filtered by user's project/facility."),
    create=extend_schema(description="Create a new distribution register. DataEntryStaff restricted to their facility."),
    retrieve=extend_schema(description="Retrieve a specific distribution register."),
    update=extend_schema(description="Update a distribution register. DataEntryStaff restricted to their facility."),
    partial_update=extend_schema(description="Partially update a distribution register. DataEntryStaff restricted to their facility."),
    destroy=extend_schema(description="Delete a distribution register. Restricted to GlobalAdmin and ProjectManager."),
)
class DistributionRegisterViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing DistributionRegister records.
    
    **Permissions:**
    - GlobalAdmin: Full CRUD access
    - ProjectManager: Full CRUD access, restricted to their assigned Project
    - DataEntryStaff: Create/Update access, restricted to their assigned Facility
    - Viewer: Read-only access, restricted to their assigned Project
    
    **Filtering:**
    - `?project={id}` - Filter by project
    - `?facility={id}` - Filter by facility
    - `?child_serial_number={number}` - Filter by child serial number
    - `?date_of_visit={date}` - Filter by visit date
    - `?muac_status={status}` - Filter by MUAC status
    """
    queryset = DistributionRegister.objects.select_related('project', 'facility', 'created_by').all()
    serializer_class = DistributionRegisterSerializer
    permission_classes = [IsAuthenticated, FacilityPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['project', 'facility', 'child_serial_number', 'date_of_visit', 'muac_status']
    search_fields = ['child_serial_number']
    ordering_fields = ['date_of_visit', 'child_serial_number', 'created_at']
    ordering = ['-date_of_visit', 'child_serial_number']
    
    def get_queryset(self):
        """Filter queryset based on user's project/facility assignment."""
        queryset = super().get_queryset()
        
        # GlobalAdmin can see all
        if self.request.user.is_superuser:
            return queryset
        
        try:
            profile = self.request.user.profile
            if profile.role == 'PROJECT_MANAGER':
                # ProjectManager sees all in their project
                if profile.project:
                    queryset = queryset.filter(project=profile.project)
            elif profile.role == 'DATA_ENTRY_STAFF':
                # DataEntryStaff sees only their facility's records
                if profile.facility:
                    queryset = queryset.filter(facility=profile.facility)
                elif profile.project:
                    # If no facility assigned, filter by project (read-only)
                    queryset = queryset.filter(project=profile.project)
            elif profile.role == 'VIEWER':
                # Viewer sees all in their project (read-only)
                if profile.project:
                    queryset = queryset.filter(project=profile.project)
        except UserProfile.DoesNotExist:
            queryset = queryset.none()
        
        return queryset
    
    def perform_create(self, serializer):
        """Automatically set created_by to current user."""
        serializer.save(created_by=self.request.user)


@extend_schema_view(
    list=extend_schema(description="List all ration cards. Filtered by user's project/facility."),
    create=extend_schema(description="Create a new ration card. DataEntryStaff restricted to their facility."),
    retrieve=extend_schema(description="Retrieve a specific ration card."),
    update=extend_schema(description="Update a ration card. DataEntryStaff restricted to their facility."),
    partial_update=extend_schema(description="Partially update a ration card. DataEntryStaff restricted to their facility."),
    destroy=extend_schema(description="Delete a ration card. Restricted to GlobalAdmin and ProjectManager."),
)
class RationCardViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing RationCard records.
    
    **Permissions:**
    - GlobalAdmin: Full CRUD access
    - ProjectManager: Full CRUD access, restricted to their assigned Project
    - DataEntryStaff: Create/Update access, restricted to their assigned Facility
    - Viewer: Read-only access, restricted to their assigned Project
    
    **Filtering:**
    - `?project={id}` - Filter by project
    - `?facility={id}` - Filter by facility
    - `?child_serial_number={number}` - Filter by child serial number
    - `?admission_date={date}` - Filter by admission date
    - `?gender={gender}` - Filter by gender
    - `?muac_status={status}` - Filter by MUAC status
    """
    queryset = RationCard.objects.select_related('project', 'facility', 'created_by').all()
    serializer_class = RationCardSerializer
    permission_classes = [IsAuthenticated, FacilityPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['project', 'facility', 'child_serial_number', 'admission_date', 'gender', 'muac_status']
    search_fields = ['child_serial_number']
    ordering_fields = ['admission_date', 'child_serial_number', 'created_at']
    ordering = ['-admission_date', 'child_serial_number']
    
    def get_queryset(self):
        """Filter queryset based on user's project/facility assignment."""
        queryset = super().get_queryset()
        
        # GlobalAdmin can see all
        if self.request.user.is_superuser:
            return queryset
        
        try:
            profile = self.request.user.profile
            if profile.role == 'PROJECT_MANAGER':
                # ProjectManager sees all in their project
                if profile.project:
                    queryset = queryset.filter(project=profile.project)
            elif profile.role == 'DATA_ENTRY_STAFF':
                # DataEntryStaff sees only their facility's records
                if profile.facility:
                    queryset = queryset.filter(facility=profile.facility)
                elif profile.project:
                    # If no facility assigned, filter by project (read-only)
                    queryset = queryset.filter(project=profile.project)
            elif profile.role == 'VIEWER':
                # Viewer sees all in their project (read-only)
                if profile.project:
                    queryset = queryset.filter(project=profile.project)
        except UserProfile.DoesNotExist:
            queryset = queryset.none()
        
        return queryset
    
    def perform_create(self, serializer):
        """Automatically set created_by to current user."""
        serializer.save(created_by=self.request.user)


@extend_schema_view(
    list=extend_schema(description="List all users. Only GlobalAdmin can access."),
    create=extend_schema(description="Create a new user. Only GlobalAdmin can create users."),
    retrieve=extend_schema(description="Retrieve a specific user. Only GlobalAdmin can access."),
    update=extend_schema(description="Update a user. Only GlobalAdmin can update users."),
    partial_update=extend_schema(description="Partially update a user. Only GlobalAdmin can update users."),
    destroy=extend_schema(description="Delete a user. Only GlobalAdmin can delete users."),
)
class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing User records (Django User model).
    
    **Permissions:**
    - GlobalAdmin: Full CRUD access
    
    **Note:** After creating a user, create a UserProfile to assign them to a project and set their role.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, GlobalAdminPermission]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_superuser']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering_fields = ['username', 'email', 'date_joined']
    ordering = ['username']
