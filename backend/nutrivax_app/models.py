from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
import uuid


class Project(models.Model):
    """Multi-tenant project model (e.g., 'NutriVax', 'Project B')."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200, unique=True)
    country = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        db_table = 'project'

    def __str__(self):
        return f"{self.name} ({self.country})"


class AdminLevel(models.Model):
    """Administrative level hierarchy (State, LGA, Ward, etc.) - Project-scoped."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='admin_levels')
    name = models.CharField(max_length=200)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['project', 'order', 'name']
        unique_together = [['project', 'name']]
        db_table = 'adminLevel'
        verbose_name = 'Administrative Level'
        verbose_name_plural = 'Administrative Levels'

    def __str__(self):
        return f"{self.name} ({self.project.name})"


class AdminDivision(models.Model):
    """Administrative divisions (States, LGAs, Wards, etc.) - Project-scoped."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='admin_divisions')
    level = models.ForeignKey(AdminLevel, on_delete=models.PROTECT, related_name='divisions')
    parent_division = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True,
                                       related_name='children')
    name = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['project', 'level__order', 'name']
        unique_together = [['project', 'level', 'name', 'parent_division']]
        db_table = 'adminDivision'
        verbose_name = 'Administrative Division'
        verbose_name_plural = 'Administrative Divisions'

    def __str__(self):
        return f"{self.name} ({self.level.name}, {self.project.name})"


class FacilityType(models.Model):
    """Types of facilities (PHCC, Health Post, OTP, etc.) - Project-scoped."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='facility_types')
    name = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['project', 'name']
        unique_together = [['project', 'name']]
        db_table = 'facilityType'
        verbose_name = 'Facility Type'
        verbose_name_plural = 'Facility Types'

    def __str__(self):
        return f"{self.name} ({self.project.name})"


class Facility(models.Model):
    """Health facilities - Can belong to multiple projects."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    projects = models.ManyToManyField(Project, related_name='facilities', db_table='facility_project')
    facility_type = models.ForeignKey(FacilityType, on_delete=models.PROTECT, related_name='facilities')
    admin_division = models.ForeignKey(AdminDivision, on_delete=models.PROTECT, related_name='facilities')
    name = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        db_table = 'facility'
        verbose_name = 'Facility'
        verbose_name_plural = 'Facilities'

    def __str__(self):
        project_names = ', '.join([p.name for p in self.projects.all()])
        return f"{self.name} ({project_names})"


class UserProfile(models.Model):
    """User profile linking users to projects and facilities with roles."""
    ROLE_CHOICES = [
        ('GLOBAL_ADMIN', 'Global Admin'),
        ('PROJECT_MANAGER', 'Project Manager'),
        ('DATA_ENTRY_STAFF', 'Data Entry Staff'),
        ('VIEWER', 'Viewer'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='user_profiles',
                                null=True, blank=True)
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE, related_name='user_profiles',
                                  null=True, blank=True)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['user__username']
        db_table = 'user_profile'
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'

    def __str__(self):
        return f"{self.user.username} - {self.get_role_display()} ({self.project.name if self.project else 'N/A'})"


class DistributionRegister(models.Model):
    """SQ-LNS Distribution Register - Project and Facility scoped."""
    MUAC_STATUS_CHOICES = [
        ('Green', 'Green'),
        ('Yellow', 'Yellow'),
        ('Red', 'Red'),
    ]

    OEDEMA_CHOICES = [
        ('Yes', 'Yes'),
        ('No', 'No'),
    ]

    NEW_ADMISSION_CHOICES = [
        ('Yes', 'Yes'),
        ('No', 'No'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='distribution_registers')
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE, related_name='distribution_registers')
    child_serial_number = models.CharField(max_length=100)
    date_of_visit = models.DateField()
    muac_status = models.CharField(max_length=10, choices=MUAC_STATUS_CHOICES)
    oedema = models.CharField(max_length=3, choices=OEDEMA_CHOICES)
    new_admission = models.CharField(max_length=3, choices=NEW_ADMISSION_CHOICES)
    sachets_received = models.IntegerField(validators=[MinValueValidator(0)], default=0)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True,
                                   related_name='distribution_registers_created')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date_of_visit', 'facility', 'child_serial_number']
        unique_together = [['project', 'facility', 'child_serial_number', 'date_of_visit']]
        db_table = 'distributionRegister'
        verbose_name = 'Distribution Register'
        verbose_name_plural = 'Distribution Registers'

    def __str__(self):
        return f"{self.child_serial_number} - {self.facility.name} - {self.date_of_visit}"


class RationCard(models.Model):
    """Ration Card - Project and Facility scoped."""
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]

    MUAC_STATUS_CHOICES = [
        ('G', 'Green'),
        ('Y', 'Yellow'),
        ('R', 'Red'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='ration_cards')
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE, related_name='ration_cards')
    child_serial_number = models.CharField(max_length=100)
    admission_date = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    muac_status = models.CharField(max_length=1, choices=MUAC_STATUS_CHOICES)
    visits_count = models.IntegerField(validators=[MinValueValidator(0)], default=0)
    sachets_received = models.IntegerField(validators=[MinValueValidator(0)], default=0)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True,
                                   related_name='ration_cards_created')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-admission_date', 'facility', 'child_serial_number']
        unique_together = [['project', 'facility', 'child_serial_number']]
        db_table = 'rationCard'
        verbose_name = 'Ration Card'
        verbose_name_plural = 'Ration Cards'

    def __str__(self):
        return f"{self.child_serial_number} - {self.facility.name} - {self.admission_date}"
