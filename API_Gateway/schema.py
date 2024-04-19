
import graphene
from graphene import ObjectType, Schema
from graphene.types.datetime import DateTime
# from resolvers import register_user, login_user, get_user_profile, logout_user, create_vaca, get_vaca, abonar_vaca, eliminar_vaca
from resolvers import create_comentario, get_comentario, editar_comentario, editar_rating, eliminar_comentario

# ##Agrego Mutaciones para microservicio Usuarios
# class RegisterMutation(graphene.Mutation):
#     class Arguments:
#         email = graphene.String(required=True)
#         username = graphene.String(required=True)
#         password = graphene.String(required=True)

#     response = graphene.String()

#     def mutate(self, info, email, username, password):
#         response = register_user(info, email, username, password)
#         return RegisterMutation(response=response)

# class LoginMutation(graphene.Mutation):
#     class Arguments:
#         email = graphene.String(required=True)
#         password = graphene.String(required=True)

#     response = graphene.String()
    
#     def mutate(self, info, email, password):
#         response = login_user(info, email, password)
#         return LoginMutation(response=response)

# class LogoutMutation(graphene.Mutation):
#     class Arguments:
#         None
#     response = graphene.String() 
#     def mutate(self, info):
#         response = logout_user(info)
#         return LogoutMutation(response=response)

# ##Agrego Mutaciones para microservicio vaca

# class CreateVacaMutation(graphene.Mutation):
#     class Arguments:
#         idPlan = graphene.Int(required=True)
#         nombreVaca = graphene.String(required=True)
#         fechaLimite = DateTime(required=False)
#         montoTotal = graphene.Float(required=True)
#         Alcance = graphene.String(required=True)

#     response = graphene.String()
#     def mutate(self, info, idPlan, nombreVaca, fechaLimite, montoTotal, Alcance):
#         response = create_vaca(info, idPlan, nombreVaca, fechaLimite, montoTotal, Alcance)
#         return CreateVacaMutation(response=response)

# class UpdateVacaMutation(graphene.Mutation):
#     class Arguments:
#         id_vaca = graphene.Int(required=True)
#         montototal = graphene.Float(required=True)

#     response = graphene.String()

#     def mutate(self, info, id_vaca, montototal):
#         response = abonar_vaca(info, id_vaca, montototal)
#         return UpdateVacaMutation(response=response)

# class EliminarVacaMutation(graphene.Mutation):
#     class Arguments:
#         id_vaca = graphene.Int(required=True)
#     response = graphene.String()

#     def mutate(self, info, id_vaca):
#         response = eliminar_vaca(info, id_vaca)
#         return EliminarVacaMutation(response=response)

# ##Agrego Mutaciones para microservicio comentarios

class CreateComentarioMutation(graphene.Mutation):
    class Arguments:
        idPlan = graphene.Int(required=True)
        nickname = graphene.String(required=True)
        cuerpo = graphene.String(required=True)
        rating = graphene.Int(required=True)

    response = graphene.String()
    def mutate(self, info, idPlan, nickname, cuerpo, rating):
        response = create_comentario(info, idPlan, nickname, cuerpo, rating)
        return CreateComentarioMutation(response=response)

class UpdateComentarioMutation(graphene.Mutation):
    class Arguments:
        idComentario = graphene.String(required=True)
        cuerpo = graphene.String(required=True)

    response = graphene.String()
    def mutate(self, info, idComentario, cuerpo):
        response = editar_comentario(info, idComentario, cuerpo)
        return UpdateComentarioMutation(response=response)

class UpdateRatingMutation(graphene.Mutation):
    class Arguments:
        idComentario = graphene.String(required=True)
        rating = graphene.Int(required=True)

    response = graphene.String()
    def mutate(self, info, idComentario, rating):
        response = editar_rating(info, idComentario, rating)
        return UpdateRatingMutation(response=response)

class EliminarComentarioMutation(graphene.Mutation):
    class Arguments:
        idComentario = graphene.String(required=True)

    response = graphene.String()
    def mutate(self, info, idComentario):
        response = eliminar_comentario(info, idComentario)
        #return EliminarComentarioMutation(response=response)
        return EliminarComentarioMutation(response="Comentario eliminado correctamente")

# ##Agrego Mutaciones para microservicio planes


# ##Se agregan todas las mutaciones
class Mutation(graphene.ObjectType):
#     register_user = RegisterMutation.Field()
#     login_user = LoginMutation.Field()
#     logout_user = LogoutMutation.Field()
#     create_vaca = CreateVacaMutation.Field()
#     update_vaca = UpdateVacaMutation.Field()
#     eliminar_vaca = EliminarVacaMutation.Field()
    create_comentario = CreateComentarioMutation.Field()
    update_comentario = UpdateComentarioMutation.Field()
    update_rating = UpdateRatingMutation.Field()
    delete_comentario = EliminarComentarioMutation.Field()

# ##Se crean las querys (Solicitudes get)
class Query(ObjectType):
    comentario_info = graphene.String(idComentario = graphene.String(required=True))
#     user_profile = graphene.String()
#     vaca_info = graphene.String(id_vaca=graphene.Int(required=True))

#     def resolve_user_profile(self, info):
#         response = get_user_profile(info)
#         return response

#     def resolve_vaca_info(self, info, id_vaca):
#         response = get_vaca(info, id_vaca)
#         return response

    def resolve_comentario_info(self, info, idComentario):
        response = get_comentario(info, idComentario)
        return response

schema = graphene.Schema(query=Query, mutation=Mutation)

