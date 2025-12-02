from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import (
    ProjectViewSet, AdminLevelViewSet, AdminDivisionViewSet,
    FacilityTypeViewSet, FacilityViewSet, UserViewSet, UserProfileViewSet,
    DistributionRegisterViewSet, RationCardViewSet
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'admin-levels', AdminLevelViewSet, basename='adminlevel')
router.register(r'admin-divisions', AdminDivisionViewSet, basename='admindivision')
router.register(r'facility-types', FacilityTypeViewSet, basename='facilitytype')
router.register(r'facilities', FacilityViewSet, basename='facility')
router.register(r'auth/users', UserViewSet, basename='user')
router.register(r'user-profiles', UserProfileViewSet, basename='userprofile')
router.register(r'distribution-registers', DistributionRegisterViewSet, basename='distributionregister')
router.register(r'ration-cards', RationCardViewSet, basename='rationcard')

urlpatterns = [
    path('', include(router.urls)),
    # JWT Token endpoints
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
