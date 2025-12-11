from django.contrib import admin
from django.core.exceptions import ObjectDoesNotExist
from .models import (
    Project, AdminLevel, AdminDivision, FacilityType, Facility,
    UserProfile, DistributionRegister, RationCard
)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'country', 'is_active', 'created_at']
    list_filter = ['country', 'is_active', 'created_at']
    search_fields = ['name', 'country']
    ordering = ['name']
    readonly_fields = ['id', 'created_at', 'updated_at']

    fieldsets = (
        ('Project Information', {
            'fields': ('name', 'country', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(AdminLevel)
class AdminLevelAdmin(admin.ModelAdmin):
    list_display = ['name', 'project', 'order', 'is_active']
    list_filter = ['project', 'is_active']
    search_fields = ['name']
    ordering = ['project', 'order', 'name']
    readonly_fields = ['id', 'created_at', 'updated_at']

    def get_queryset(self, request):
        """Override to safely handle related objects."""
        qs = super().get_queryset(request)
        return qs.select_related('project')

    fieldsets = (
        ('Level Information', {
            'fields': ('project', 'name', 'order', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(AdminDivision)
class AdminDivisionAdmin(admin.ModelAdmin):
    list_display = ['name', 'project', 'level', 'get_parent_division', 'is_active']
    list_filter = ['project', 'level', 'is_active']
    search_fields = ['name']
    ordering = ['project', 'level__order', 'name']
    readonly_fields = ['id', 'created_at', 'updated_at']

    def get_queryset(self, request):
        """Override to safely handle related objects."""
        qs = super().get_queryset(request)
        return qs.select_related('project', 'level', 'parent_division')

    fieldsets = (
        ('Division Information', {
            'fields': ('project', 'level', 'parent_division', 'name', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def get_parent_division(self, obj):
        """Safely return parent division name."""
        if obj is None:
            return '-'
        try:
            if hasattr(obj, 'parent_division') and obj.parent_division:
                return str(obj.parent_division.name)
            return '-'
        except (AttributeError, ObjectDoesNotExist, Exception):
            return '-'
    get_parent_division.short_description = 'Parent Division'
    get_parent_division.admin_order_field = 'parent_division__name'


@admin.register(FacilityType)
class FacilityTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'project', 'is_active']
    list_filter = ['project', 'is_active']
    search_fields = ['name']
    ordering = ['project', 'name']
    readonly_fields = ['id', 'created_at', 'updated_at']

    def get_queryset(self, request):
        """Override to safely handle related objects."""
        qs = super().get_queryset(request)
        return qs.select_related('project')

    fieldsets = (
        ('Type Information', {
            'fields': ('project', 'name', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Facility)
class FacilityAdmin(admin.ModelAdmin):
    list_display = ['name', 'get_projects', 'facility_type', 'admin_division', 'is_active']
    list_filter = ['projects', 'facility_type', 'is_active']
    search_fields = ['name']
    ordering = ['name']
    readonly_fields = ['id', 'created_at', 'updated_at']
    filter_horizontal = ['projects']

    def get_queryset(self, request):
        """Override to safely handle related objects."""
        qs = super().get_queryset(request)
        return qs.prefetch_related('projects').select_related('facility_type', 'admin_division')

    def get_projects(self, obj):
        """Return comma-separated list of project names."""
        if obj is None:
            return '-'
        try:
            projects = obj.projects.all()
            return ', '.join([p.name for p in projects]) if projects else '-'
        except (AttributeError, Exception):
            return '-'
    get_projects.short_description = 'Projects'

    fieldsets = (
        ('Facility Information', {
            'fields': ('name', 'facility_type', 'admin_division', 'is_active')
        }),
        ('Projects', {
            'fields': ('projects',)
        }),
        ('Timestamps', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'role', 'get_project', 'get_facility', 'is_active']
    list_filter = ['role', 'project', 'is_active']
    search_fields = ['user__username', 'user__email']
    ordering = ['user__username']
    readonly_fields = ['id', 'created_at', 'updated_at']

    fieldsets = (
        ('User Account', {
            'fields': ('user',)
        }),
        ('Profile Information', {
            'fields': ('role', 'project', 'facility', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def get_queryset(self, request):
        """Override to safely handle related objects."""
        qs = super().get_queryset(request)
        return qs.select_related('user').prefetch_related('project', 'facility')

    def get_project(self, obj):
        """Safely return project name."""
        if obj is None:
            return '-'
        try:
            if hasattr(obj, 'project') and obj.project:
                return str(obj.project.name)
            return '-'
        except (AttributeError, ObjectDoesNotExist, Exception):
            return '-'
    get_project.short_description = 'Project'
    get_project.admin_order_field = 'project__name'

    def get_facility(self, obj):
        """Safely return facility name."""
        if obj is None:
            return '-'
        try:
            if hasattr(obj, 'facility') and obj.facility:
                return str(obj.facility.name)
            return '-'
        except (AttributeError, ObjectDoesNotExist, Exception):
            return '-'
    get_facility.short_description = 'Facility'
    get_facility.admin_order_field = 'facility__name'


@admin.register(DistributionRegister)
class DistributionRegisterAdmin(admin.ModelAdmin):
    list_display = ['child_serial_number', 'project', 'facility', 'date_of_visit', 'muac_status', 'sachets_received', 'get_created_by']
    list_filter = ['project', 'facility', 'date_of_visit', 'muac_status']
    search_fields = ['child_serial_number']
    ordering = ['-date_of_visit', 'facility', 'child_serial_number']
    readonly_fields = ['id', 'created_at', 'updated_at']

    def get_queryset(self, request):
        """Override to safely handle related objects."""
        qs = super().get_queryset(request)
        return qs.select_related('project', 'facility', 'created_by')

    fieldsets = (
        ('Register Information', {
            'fields': ('project', 'facility', 'child_serial_number', 'date_of_visit')
        }),
        ('Assessment Data', {
            'fields': ('muac_status', 'oedema', 'new_admission', 'sachets_received')
        }),
        ('Recorded By', {
            'fields': ('created_by',)
        }),
        ('Timestamps', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def get_created_by(self, obj):
        """Safely return created_by username."""
        if obj is None:
            return '-'
        try:
            if hasattr(obj, 'created_by') and obj.created_by:
                return str(obj.created_by.username)
            return '-'
        except (AttributeError, ObjectDoesNotExist, Exception):
            return '-'
    get_created_by.short_description = 'Created By'
    get_created_by.admin_order_field = 'created_by__username'


@admin.register(RationCard)
class RationCardAdmin(admin.ModelAdmin):
    list_display = ['child_serial_number', 'project', 'facility', 'admission_date', 'gender', 'muac_status', 'visits_count', 'get_created_by']
    list_filter = ['project', 'facility', 'admission_date', 'gender', 'muac_status']
    search_fields = ['child_serial_number']
    ordering = ['-admission_date', 'facility', 'child_serial_number']
    readonly_fields = ['id', 'created_at', 'updated_at']

    def get_queryset(self, request):
        """Override to safely handle related objects."""
        qs = super().get_queryset(request)
        return qs.select_related('project', 'facility', 'created_by')

    fieldsets = (
        ('Card Information', {
            'fields': ('project', 'facility', 'child_serial_number', 'admission_date')
        }),
        ('Child Information', {
            'fields': ('gender', 'muac_status')
        }),
        ('Visit Data', {
            'fields': ('visits_count', 'sachets_received')
        }),
        ('Recorded By', {
            'fields': ('created_by',)
        }),
        ('Timestamps', {
            'fields': ('id', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def get_created_by(self, obj):
        """Safely return created_by username."""
        if obj is None:
            return '-'
        try:
            if hasattr(obj, 'created_by') and obj.created_by:
                return str(obj.created_by.username)
            return '-'
        except (AttributeError, ObjectDoesNotExist, Exception):
            return '-'
    get_created_by.short_description = 'Created By'
    get_created_by.admin_order_field = 'created_by__username'
