from .models import User, Planes, Lugar, Ciudad, Parcharme
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializers import PlanesSerializer, LugarSerializer, CiudadSerializer, ParcharmeSerializer




class PlanesViewSet(viewsets.ModelViewSet):
    queryset = Planes.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = PlanesSerializer

class LugarViewSet(viewsets.ModelViewSet):
    queryset = Lugar.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = LugarSerializer


class CiudadViewSet(viewsets.ModelViewSet):
    queryset = Ciudad.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = CiudadSerializer

class ParcharmeViewSet(viewsets.ModelViewSet):
    queryset = Parcharme.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ParcharmeSerializer