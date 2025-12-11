from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Project, AdminLevel, AdminDivision, FacilityType, Facility,
    UserProfile, DistributionRegister, RationCard
)


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for Project model."""
    admin_levels_count = serializers.SerializerMethodField()
    facilities_count = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'name', 'country', 'is_active',
            'admin_levels_count', 'facilities_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_admin_levels_count(self, obj):
        return obj.admin_levels.count()

    def get_facilities_count(self, obj):
        return obj.facilities.count()


class AdminLevelSerializer(serializers.ModelSerializer):
    """Serializer for AdminLevel model."""
    project_name = serializers.SerializerMethodField()
    divisions_count = serializers.SerializerMethodField()

    class Meta:
        model = AdminLevel
        fields = [
            'id', 'project', 'project_name', 'name', 'order', 'is_active',
            'divisions_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_project_name(self, obj):
        """Return project name if project exists, otherwise None."""
        return obj.project.name if obj.project else None

    def get_divisions_count(self, obj):
        return obj.divisions.count()


class AdminDivisionSerializer(serializers.ModelSerializer):
    """Serializer for AdminDivision model."""
    project_name = serializers.SerializerMethodField()
    level_name = serializers.SerializerMethodField()
    parent_division_name = serializers.SerializerMethodField()
    children_count = serializers.SerializerMethodField()
    facilities_count = serializers.SerializerMethodField()

    class Meta:
        model = AdminDivision
        fields = [
            'id', 'project', 'project_name', 'level', 'level_name',
            'parent_division', 'parent_division_name', 'name', 'is_active',
            'children_count', 'facilities_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_project_name(self, obj):
        """Return project name if project exists, otherwise None."""
        return obj.project.name if obj.project else None

    def get_level_name(self, obj):
        """Return level name if level exists, otherwise None."""
        return obj.level.name if obj.level else None

    def get_parent_division_name(self, obj):
        """Return parent division name if parent_division exists, otherwise None."""
        return obj.parent_division.name if obj.parent_division else None

    def get_children_count(self, obj):
        return obj.children.count()

    def get_facilities_count(self, obj):
        return obj.facilities.count()


class FacilityTypeSerializer(serializers.ModelSerializer):
    """Serializer for FacilityType model."""
    project_name = serializers.SerializerMethodField()
    facilities_count = serializers.SerializerMethodField()

    class Meta:
        model = FacilityType
        fields = [
            'id', 'project', 'project_name', 'name', 'is_active',
            'facilities_count', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_project_name(self, obj):
        """Return project name if project exists, otherwise None."""
        return obj.project.name if obj.project else None

    def get_facilities_count(self, obj):
        return obj.facilities.count()


class FacilitySerializer(serializers.ModelSerializer):
    """Serializer for Facility model."""
    projects = serializers.PrimaryKeyRelatedField(many=True, queryset=Project.objects.all(), required=False)
    project_names = serializers.SerializerMethodField()
    facility_type_name = serializers.SerializerMethodField()
    admin_division_name = serializers.SerializerMethodField()
    distribution_registers_count = serializers.SerializerMethodField()
    ration_cards_count = serializers.SerializerMethodField()

    class Meta:
        model = Facility
        fields = [
            'id', 'projects', 'project_names', 'facility_type', 'facility_type_name',
            'admin_division', 'admin_division_name', 'name', 'is_active',
            'distribution_registers_count', 'ration_cards_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_project_names(self, obj):
        """Return list of project names."""
        return [p.name for p in obj.projects.all()]

    def get_facility_type_name(self, obj):
        """Return facility type name if facility_type exists, otherwise None."""
        return obj.facility_type.name if obj.facility_type else None

    def get_admin_division_name(self, obj):
        """Return admin division name if admin_division exists, otherwise None."""
        return obj.admin_division.name if obj.admin_division else None

    def get_distribution_registers_count(self, obj):
        return obj.distribution_registers.count()

    def get_ration_cards_count(self, obj):
        return obj.ration_cards.count()

    def create(self, validated_data):
        """Create facility and associate with projects."""
        projects = validated_data.pop('projects', [])
        facility = Facility.objects.create(**validated_data)
        if projects:
            facility.projects.set(projects)
        return facility

    def update(self, instance, validated_data):
        """Update facility and projects."""
        projects = validated_data.pop('projects', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if projects is not None:
            instance.projects.set(projects)
        return instance


class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model."""
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'is_superuser']
        read_only_fields = ['is_superuser']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        """Create a new user with hashed password."""
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        """Update user, handling password separately."""
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for UserProfile model."""
    user = UserSerializer(read_only=True)
    user_id = serializers.IntegerField(write_only=True, required=False)
    project_name = serializers.SerializerMethodField()
    facility_name = serializers.SerializerMethodField()
    role_display = serializers.CharField(source='get_role_display', read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            'id', 'user', 'user_id', 'project', 'project_name',
            'facility', 'facility_name', 'role', 'role_display',
            'is_active', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_project_name(self, obj):
        """Return project name if project exists, otherwise None."""
        return obj.project.name if obj.project else None

    def get_facility_name(self, obj):
        """Return facility name if facility exists, otherwise None."""
        return obj.facility.name if obj.facility else None

    def create(self, validated_data):
        """Create UserProfile with user association."""
        user_id = validated_data.pop('user_id', None)
        if user_id:
            validated_data['user_id'] = user_id
        return super().create(validated_data)


class DistributionRegisterSerializer(serializers.ModelSerializer):
    """Serializer for DistributionRegister model."""
    project_name = serializers.SerializerMethodField()
    facility_name = serializers.SerializerMethodField()
    created_by_username = serializers.SerializerMethodField()

    class Meta:
        model = DistributionRegister
        fields = [
            'id', 'project', 'project_name', 'facility', 'facility_name',
            'child_serial_number', 'date_of_visit', 'muac_status', 'oedema',
            'new_admission', 'sachets_received', 'created_by', 'created_by_username',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    def get_project_name(self, obj):
        """Return project name if project exists, otherwise None."""
        return obj.project.name if obj.project else None

    def get_facility_name(self, obj):
        """Return facility name if facility exists, otherwise None."""
        return obj.facility.name if obj.facility else None

    def get_created_by_username(self, obj):
        """Return created_by username if created_by exists, otherwise None."""
        return obj.created_by.username if obj.created_by else None


class RationCardSerializer(serializers.ModelSerializer):
    """Serializer for RationCard model."""
    project_name = serializers.SerializerMethodField()
    facility_name = serializers.SerializerMethodField()
    gender_display = serializers.CharField(source='get_gender_display', read_only=True)
    muac_status_display = serializers.CharField(source='get_muac_status_display', read_only=True)
    created_by_username = serializers.SerializerMethodField()

    class Meta:
        model = RationCard
        fields = [
            'id', 'project', 'project_name', 'facility', 'facility_name',
            'child_serial_number', 'admission_date', 'gender', 'gender_display',
            'muac_status', 'muac_status_display', 'visits_count', 'sachets_received',
            'created_by', 'created_by_username', 'created_at', 'updated_at'
        ]
        read_only_fields = ['created_by', 'created_at', 'updated_at']

    def get_project_name(self, obj):
        """Return project name if project exists, otherwise None."""
        return obj.project.name if obj.project else None

    def get_facility_name(self, obj):
        """Return facility name if facility exists, otherwise None."""
        return obj.facility.name if obj.facility else None

    def get_created_by_username(self, obj):
        """Return created_by username if created_by exists, otherwise None."""
        return obj.created_by.username if obj.created_by else None
