import requests
import os
##Se definen url's principales para cada microservicio:
url_users=os.environ.get('USERS_MS_URL','host.docker.internal:3000/parchate/user/')
url_vaca='http://localhost:8080/parchate/vaca/'



##resolvers para el microservicio de usuarios
def register_user(info, email, username, password):
    response = requests.post(url_users+'register/', json={'email': email,'username': username, 'password': password})
    return response.json()

def login_user(info, email, password):
    response = requests.post(url_users+'login/', json={'email': email, 'password': password})
    return response.json()

def get_user_profile(info):
    response = requests.get(url_users+'profile', headers={'Authorization': info.context.headers.get('Authorization')})
    return response.json()

def logout_user(info):
    response = requests.post(url_users+'logout', json={},headers={'Authorization': info.context.headers.get('Authorization')})
    return response.json()


##resolvers para el microservicio vaca
def create_vaca(info,idPlan,nombreVaca,fechaLimite,montoTotal,Alcance):
    response = requests.post(url_vaca+'crear/', json={'idPlan': idPlan,'nombreVaca': nombreVaca, 'fechaLimite': fechaLimite,'montoTotal': montoTotal,'Alcance':Alcance})
    return response.json()

def get_vaca(info,id_vaca):
    response = requests.get(url_vaca+'buscar/'+str(id_vaca))
    return response.json()

def abonar_vaca(info,id_vaca,montototal):
    response = request.put(url_vaca+'abonar', json={'id_vaca':id_vaca,'montototal':montototal})
    return response.json()

def eliminar_vaca(info,id_vaca):
    response = requests.delete(url_vaca+'eliminar/'+str(id_vaca))
    return response.json()


##resolvers para el microservicio comentarios


##resolvers para el microservicio planes


