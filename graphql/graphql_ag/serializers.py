from rest_framework import serializers
from .models import Planes, Lugar, Ciudad, Parcharme




class PlanesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Planes
        fields = '__all__'

class LugarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lugar
        fields = '__all__'
        
class CiudadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciudad
        fields = '__all__'

class ParcharmeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parcharme
        fields = '__all__'



