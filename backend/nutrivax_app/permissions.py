from rest_framework import permissions
from .models import UserProfile, Project, Facility, DistributionRegister, RationCard


class ProjectPermission(permissions.BasePermission):
    """
    Permission class for project-scoped models.

    - GlobalAdmin: Full CRUD on all projects
    - ProjectManager: Full CRUD on models, restricted to their assigned Project
    - DataEntryStaff: Read-only on project-scoped models
    - Viewer: Read-only on project-scoped models, restricted to their assigned Project
    """

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        # GlobalAdmin (superuser) has full access
        if request.user.is_superuser:
            return True

        try:
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            return False

        # ProjectManager has full access (will be filtered by project in get_queryset)
        if profile.role == 'PROJECT_MANAGER':
            return True

        # DataEntryStaff and Viewer have read-only access
        if profile.role in ['DATA_ENTRY_STAFF', 'VIEWER']:
            return request.method in permissions.SAFE_METHODS

        return False

    def has_object_permission(self, request, view, obj):
        """Check object-level permissions based on project assignment."""
        if not request.user.is_authenticated:
            return False

        # GlobalAdmin (superuser) has full access
        if request.user.is_superuser:
            return True

        try:
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            return False

        # Get the project from the object
        project = None
        if hasattr(obj, 'project'):
            project = obj.project
        elif isinstance(obj, Project):
            project = obj

        if not project:
            return False

        # ProjectManager can access objects from their assigned project
        if profile.role == 'PROJECT_MANAGER':
            if profile.project and profile.project == project:
                return True
            return False

        # Viewer can read objects from their assigned project
        if profile.role == 'VIEWER':
            if request.method in permissions.SAFE_METHODS:
                if profile.project and profile.project == project:
                    return True
            return False

        # DataEntryStaff can read objects from their assigned project
        if profile.role == 'DATA_ENTRY_STAFF':
            if request.method in permissions.SAFE_METHODS:
                if profile.project and profile.project == project:
                    return True
            return False

        return False


class FacilityPermission(permissions.BasePermission):
    """
    Permission class for facility-scoped models (DistributionRegister, RationCard).

    - GlobalAdmin: Full CRUD
    - ProjectManager: Full CRUD on models, restricted to their assigned Project
    - DataEntryStaff: Create/Update on DistributionRegister and RationCard, restricted to their assigned Facility
    - Viewer: Read-only access, restricted to their assigned Project
    """

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        # GlobalAdmin (superuser) has full access
        if request.user.is_superuser:
            return True

        try:
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            return False

        # ProjectManager has full access (will be filtered by project in get_queryset)
        if profile.role == 'PROJECT_MANAGER':
            return True

        # DataEntryStaff can create/update (restricted to their facility in get_queryset)
        if profile.role == 'DATA_ENTRY_STAFF':
            return True

        # Viewer has read-only access
        if profile.role == 'VIEWER':
            return request.method in permissions.SAFE_METHODS

        return False

    def has_object_permission(self, request, view, obj):
        """Check object-level permissions based on facility/project assignment."""
        if not request.user.is_authenticated:
            return False

        # GlobalAdmin (superuser) has full access
        if request.user.is_superuser:
            return True

        try:
            profile = request.user.profile
        except UserProfile.DoesNotExist:
            return False

        # Get the facility and project from the object
        facility = None
        project = None

        if isinstance(obj, (DistributionRegister, RationCard)):
            facility = obj.facility
            project = obj.project
        elif isinstance(obj, Facility):
            facility = obj
            project = obj.project

        if not facility or not project:
            return False

        # ProjectManager can access objects from their assigned project
        if profile.role == 'PROJECT_MANAGER':
            if profile.project and profile.project == project:
                return True
            return False

        # DataEntryStaff can modify objects from their assigned facility
        if profile.role == 'DATA_ENTRY_STAFF':
            if profile.facility and profile.facility == facility:
                # Allow create/update/delete for their facility
                return True
            # Allow read access for objects in their project
            if request.method in permissions.SAFE_METHODS:
                if profile.project and profile.project == project:
                    return True
            return False

        # Viewer can read objects from their assigned project
        if profile.role == 'VIEWER':
            if request.method in permissions.SAFE_METHODS:
                if profile.project and profile.project == project:
                    return True
            return False

        return False


class GlobalAdminPermission(permissions.BasePermission):
    """
    Permission class for GlobalAdmin-only operations (Project management).
    Only GlobalAdmin (superuser) can perform CRUD operations.
    """

    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False

        # Only superuser (GlobalAdmin) has access
        return request.user.is_superuser

    def has_object_permission(self, request, view, obj):
        """Check object-level permissions."""
        if not request.user.is_authenticated:
            return False

        return request.user.is_superuser
