
import graphene
from graphene import ObjectType, Schema
from graphene.types.datetime import DateTime
from resolvers import register_user, login_user, get_user_profile, logout_user, create_vaca, get_vaca, abonar_vaca, eliminar_vaca, create_plan, get_planes, get_plan, eliminar_plan, create_ciudad, get_ciudades, get_ciudad, eliminar_ciudad, create_lugar, get_lugares, get_lugar, eliminar_lugar, create_parche



##Agrego Mutaciones para microservicio Usuarios
class RegisterMutation(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    response = graphene.String()

    def mutate(self, info, email, username, password):
        response = register_user(info, email, username, password)
        return RegisterMutation(response=response)

class LoginMutation(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    response = graphene.String()
    
    def mutate(self, info, email, password):
        response = login_user(info, email, password)
        return LoginMutation(response=response)

class LogoutMutation(graphene.Mutation):
    class Arguments:
        None
    response = graphene.String() 
    def mutate(self, info):
        response = logout_user(info)
        return LogoutMutation(response=response)




##Agrego Mutaciones para microservicio vaca

class CreateVacaMutation(graphene.Mutation):
    class Arguments:
        idPlan = graphene.Int(required=True)
        nombreVaca = graphene.String(required=True)
        fechaLimite = DateTime(required=False)
        montoTotal = graphene.Float(required=True)
        Alcance = graphene.Int(required=True)

    response = graphene.String()
    def mutate(self, info, idPlan, nombreVaca, fechaLimite, montoTotal, Alcance):
        fecha_limite_iso = fechaLimite.isoformat() if fechaLimite else None
        response = create_vaca(info, idPlan, nombreVaca, fecha_limite_iso, montoTotal, Alcance)
        return CreateVacaMutation(response=response)

class UpdateVacaMutation(graphene.Mutation):
    class Arguments:
        idVaca = graphene.Int(required=True)
        montoTotal = graphene.Float(required=True)

    response = graphene.String()

    def mutate(self, info, idVaca, montoTotal):
        response = abonar_vaca(info, idVaca, montoTotal)
        return UpdateVacaMutation(response=response)



class EliminarVacaMutation(graphene.Mutation):
    class Arguments:
        id_vaca = graphene.Int(required=True)
    response = graphene.String()

    def mutate(self, info, id_vaca):
        response = eliminar_vaca(info, id_vaca)
        return EliminarVacaMutation(response=response)




##Agrego Mutaciones para microservicio comentarios



##Agrego Mutaciones para microservicio planes
class PlanMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        date = graphene.Date(required=True)
        
        chat_link = graphene.String(required=True)
        user_admin = graphene.Int(required=True)
        place = graphene.Int(required=True)

    response = graphene.String()
    def mutate(self, info, name, date, chat_link, user_admin, place):
        fecha_iso = date.isoformat() if date else None
        response = create_plan(info, name, fecha_iso, chat_link, user_admin, place)
        return PlanMutation(response=response)
    
class LugarMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        hood = graphene.String(required=True)
        address = graphene.String(required=True)
        city = graphene.Int(required=True)

    response = graphene.String()
    def mutate(self, info, name, hood, address, city):
        response = create_lugar(info, name, hood, address, city)
        return LugarMutation(response=response)
    
class CiudadMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)

    response = graphene.String()
    def mutate(self, info, name):
        response = create_ciudad(info, name)
        return CiudadMutation(response=response)

class ParcheMutation(graphene.Mutation):
    class Arguments:
        user = graphene.Int(required=True)
        plan = graphene.Int(required=True)

    response = graphene.String()
    def mutate(self, info, user, plan):
        response = create_parche(info, user, plan)
        return ParcheMutation(response=response)


    
##Se agregan todas las mutaciones
class Mutation(graphene.ObjectType):
    register_user = RegisterMutation.Field()
    login_user = LoginMutation.Field()
    logout_user = LogoutMutation.Field()
    
    createVaca = CreateVacaMutation.Field()
    updateVaca = UpdateVacaMutation.Field()
    
    eliminar_vaca = EliminarVacaMutation.Field()
    create_plan = PlanMutation.Field()
    create_lugar = LugarMutation.Field()
    create_ciudad = CiudadMutation.Field()
    create_parche = ParcheMutation.Field()

##Se crean las querys (Solicitudes get)
class Query(ObjectType):
    #user_profile = graphene.String()
    
    getVaca = graphene.JSONString(idVaca=graphene.Int(required=True))
    def resolve_getVaca(self, info, idVaca):
        return get_vaca(info, idVaca)
    
    #plan_info = graphene.String(id=graphene.Int(required=True))
    #planes = graphene.String()
    #ciudad_info = graphene.String(id=graphene.Int(required=True))
    getCiudad = graphene.JSONString(idCiudad=graphene.Int(required=True))
    def resolve_getCiudad(self, info, idCiudad):
        return get_ciudad(info, idCiudad)
    getCiudades = graphene.JSONString()
    def resolve_getCiudades(self, info):
        return get_ciudades(info)
    #lugar_info = graphene.String(id=graphene.Int(required=True))
    #lugares = graphene.String()


schema = graphene.Schema(query=Query, mutation=Mutation)

