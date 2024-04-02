import requests
import os
# ##Se definen url's principales para cada microservicio:
# url_users='http://localhost:3001/parchate/user/'
# url_vaca='http://localhost:8080/parchate/vaca/'
url_comentarios=os.environ.get('COMENTARIOS_MS_URL','host.docker.internal:3001/comentarios/')



# ##resolvers para el microservicio de usuarios
# def register_user(info, email, username, password):
#     response = requests.post(url_users+'register/', json={'email': email,'username': username, 'password': password})
#     return response.json()

# def login_user(info, email, password):
#     response = requests.post(url_users+'login/', json={'email': email, 'password': password})
#     return response.json()

# def get_user_profile(info):
#     response = requests.get(url_users+'profile', headers={'Authorization': info.context.headers.get('Authorization')})
#     return response.json()

# def logout_user(info):
#     response = requests.post(url_users+'logout', json={},headers={'Authorization': info.context.headers.get('Authorization')})
#     return response.json()


# ##resolvers para el microservicio vaca
# def create_vaca(info,idPlan,nombreVaca,fechaLimite,montoTotal,Alcance):
#     response = requests.post(url_vaca+'crear/', json={'idPlan': idPlan,'nombreVaca': nombreVaca, 'fechaLimite': fechaLimite,'montoTotal': montoTotal,'Alcance':Alcance})
#     return response.json()

# def get_vaca(info,id_vaca):
#     response = requests.get(url_vaca+'buscar/'+str(id_vaca))
#     return response.json()

# def abonar_vaca(info,id_vaca,montototal):
#     response = request.put(url_vaca+'abonar', json={'id_vaca':id_vaca,'montototal':montototal})
#     return response.json()

# def eliminar_vaca(info,id_vaca):
#     response = requests.delete(url_vaca+'eliminar/'+str(id_vaca))
#     return response.json()


##resolvers para el microservicio comentarios

def create_comentario(info, id_plan, nickname, comentario, rating):
    response = requests.post(url_comentarios, json={'id_plan': id_plan, 'nickname': nickname, 'comentario': comentario,'rating': rating})
    # return response.json()
    if response.status_code == 200:
        return response.json()
    else:
        # Manejar el error aquí
        return {"error": f"Error al crear el comentario: {response.status_code}, {response.text}"}

def get_comentario(info, id_comentario):
    response = requests.get(url_comentarios + str(id_comentario))
    return response.json()

def editar_comentario(info, id_comentario, comentario):
    response = request.put(url_comentarios , json={'id_comentario':id_comentario,'comentario':comentario})
    return response.json()

def editar_rating(info, id_comentario, rating):
    response = request.put(url_comentarios , json={'id_comentario':id_comentario,'rating':rating})
    return response.json()    

def eliminar_comentario(info, id_comentario):
    response = requests.delete(url_comentarios + str(id_comentario))
    return response.json()

##resolvers para el microservicio planes


