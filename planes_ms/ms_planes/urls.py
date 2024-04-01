from rest_framework import routers
from .api import UserViewSet, PlanesViewSet, LugarViewSet, CiudadViewSet, ParcharmeViewSet

router = routers.DefaultRouter()

router.register('usuarios', UserViewSet, 'usuario')
router.register('planes', PlanesViewSet, 'plan')
router.register('lugares', LugarViewSet, 'lugar')
router.register('ciudades', CiudadViewSet, 'ciudad')
router.register('parches', ParcharmeViewSet, 'parches')

urlpatterns = router.urls
