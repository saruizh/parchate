import graphene
import graphql_jwt
import requests
import json
import os
from graphene.types.datetime import DateTime
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from graphql_ag.models import Ciudad, Lugar, Planes, Parcharme
from graphql_ag.serializers import PlanesSerializer, LugarSerializer, CiudadSerializer, ParcharmeSerializer
from graphql_ag.resolvers import create_vaca, get_vaca, abonar_vaca, eliminar_vaca
from graphql_jwt.shortcuts import get_token
from graphql_jwt.decorators import login_required


url_vaca=os.environ.get("vaca_ms_URL", "host.docker.internal:8080/parchate/vaca/")

#Mutaciones para microservicio Usuarios
class AppUserType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        exclude = ("password", )

#Clase para crear un usuario   
class CreateUser(graphene.Mutation):
    app_user = graphene.Field(AppUserType)

    class Arguments:
        email = graphene.String(required=True)
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, email, username, password):
        app_user = get_user_model()
        new_user = app_user(email=email, username=username)
        new_user.set_password(password)
        new_user.save()
        return CreateUser(app_user=new_user)

#Mutaciones para microservicio Vaca


#Clase para crear una vaca
# class CreateVacaMutation(graphene.Mutation):
#     class Arguments:
#         idPlan = graphene.Int(required=True)
#         nombreVaca = graphene.String(required=True)
#         fechaLimite = DateTime(required=False)
#         montoTotal = graphene.Float(required=True)
#         alcance = graphene.Int(required=True)

#     response = graphene.JSONString()
#     def mutate(self, info, idPlan, nombreVaca, fechaLimite, montoTotal, alcance):
#         fecha_limite_iso = fechaLimite.isoformat() if fechaLimite else None
#         plan = Planes.objects.get(id=idPlan)
#         print(plan)
#         response = create_vaca(info, plan, nombreVaca, fecha_limite_iso, montoTotal, alcance)
#         print(response)  # Imprimir el resultado
#         return CreateVacaMutation(response=response)


class CreateVacaMutation(graphene.Mutation):
    class Arguments:
        idPlan = graphene.Int(required=True)
        nombreVaca = graphene.String(required=True)
        fechaLimite = DateTime(required=False)
        montoTotal = graphene.Float(required=True)
        alcance = graphene.Int(required=True)

    response = graphene.JSONString()
    def mutate(self, info, idPlan, nombreVaca, fechaLimite, montoTotal, alcance):
        fecha_limite_iso = fechaLimite.isoformat() if fechaLimite else None
        response = create_vaca(info, idPlan, nombreVaca, fecha_limite_iso, montoTotal, alcance)
        return CreateVacaMutation(response=response)


#Mutaciones para microservicio Planes
class CiudadType(DjangoObjectType):
    class Meta:
        model = Ciudad

class LugarType(DjangoObjectType):
    class Meta:
        model = Lugar

class PlanesType(DjangoObjectType):
    class Meta:
        model = Planes

    
#Clase para crear una ciudad
class CreateCiudad(graphene.Mutation):
    ciudad = graphene.Field(CiudadType)

    class Arguments:
        name = graphene.String(required=True)

    def mutate(self, info, name):
        ciudad = Ciudad(name=name)
        ciudad.save()
        return CreateCiudad(ciudad=ciudad)
    
#Clase para crear un lugar
class CreateLugar(graphene.Mutation):
    lugar = graphene.Field(LugarType)

    class Arguments:
        name = graphene.String(required=True)
        hood = graphene.String(required=True)
        address = graphene.String(required=True)
        city = graphene.Int(required=True)

    @login_required
    def mutate(self, info, name, hood, address, city):
        ciudad = Ciudad.objects.get(id=city)
        lugar = Lugar(name=name, hood=hood, address=address, city=ciudad)
        lugar.save()
        return CreateLugar(lugar=lugar)

#Clase para crear un plan
class CreatePlanes(graphene.Mutation):
    plan = graphene.Field(PlanesType)

    class Arguments:
        name = graphene.String(required=True)
        date = graphene.Date(required=True)
        chat_link = graphene.String(required=True)
        place = graphene.Int(required=True)

    @login_required
    def mutate(self, info, name, date, chat_link, place):
        user = info.context.user
        lugar = Lugar.objects.get(id=place)
        print(lugar)
        plan = Planes(name=name, date=date, chat_link=chat_link, user_admin=user, place=lugar)
        plan.save()
        return CreatePlanes(plan=plan)
    
#Clase para obtener un token
class ObtainJSONWebToken(graphql_jwt.JSONWebTokenMutation):
    app_user = graphene.Field(AppUserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(app_user=info.context.user)


class Mutation(graphene.ObjectType):

    #Mutaciones para microservicio planes
    create_user = CreateUser.Field()
    create_ciudad = CreateCiudad.Field()
    create_lugar = CreateLugar.Field()
    create_planes = CreatePlanes.Field()

    #Obtener token
    token_auth = ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

    #Mutaciones para microservicio vaca
    create_vaca = CreateVacaMutation.Field()

#Querys
class Query(graphene.ObjectType):
    app_users = graphene.List(AppUserType)
    logged_user = graphene.Field(AppUserType)
    ciudades = graphene.List(CiudadType)
    lugares = graphene.List(LugarType)
    planes = graphene.List(PlanesType)
    vaca = graphene.JSONString(idVaca=graphene.Int(required=True))

    def resolve_users(self, info):
        return get_user_model().objects.all()
    
    def resolver_logged_user(self, info):
        return get_user_model().objects.all
    
    def resolve_ciudades(self, info):
        return Ciudad.objects.all()
    
    def resolve_lugares(self, info):
        return Lugar.objects.all()
    
    def resolve_vaca(self, info, idVaca):
        response = get_vaca(info, idVaca)
        return response
    
    
    @login_required
    def resolve_logged_user(self, info):
        return info.context.user
    
    def resolve_planes(self, info):
        return Planes.objects.all()