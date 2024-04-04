import requests
import os

##Se definen url's principales para cada microservicio:
url_users=os.environ.get('USERS_MS_URL','host.docker.internal:3000/parchate/user/')
url_vaca=os.environ.get("vaca_ms_URL", "host.docker.internal:8080/parchate/vaca/")
url_planes = os.environ.get('PLANES_MS_URL', 'host.docker.internal:8000/parchate/ms-planes/') # 'http://localhost:5432/parchate/ms-planes/'



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
    response = requests.post(url_vaca+'crear', json={'idPlan': idPlan,'nombreVaca': nombreVaca, 'fechaLimite': fechaLimite,'montoTotal': montoTotal,'Alcance':Alcance})
    return response.json()

def get_vaca(info,id_vaca):
    response = requests.get(url_vaca+'buscar/'+str(id_vaca))
    return response.json()

def abonar_vaca(info,id_vaca,montototal):
    response = requests.put(url_vaca+'abonar', json={'id_vaca':id_vaca,'montototal':montototal})
    return response.json()

def eliminar_vaca(info,id_vaca):
    response = requests.delete(url_vaca+'eliminar/'+str(id_vaca))
    return response.json()


##resolvers para el microservicio comentarios


##resolvers para el microservicio planes

def create_plan(info, name, date, chat_link, user_admin, place):
    response = requests.post(url_planes + 'planes/', json={'name': name, 'date': date, 'chat_link': chat_link, 'user_admin': user_admin, 'place': place})
    return response.json()

def get_planes(info):
    response = requests.get(url_planes + 'planes/')
    return response.json()

def get_plan(info,id):
    response = requests.get(url_planes + 'planes/' + str(id))
    return response.json()

def eliminar_plan(info,id):
    response = requests.delete(url_planes + 'planes/' + str(id))
    return response.json()

def create_lugar(info, name, hood, address, city):
    response = requests.post(url_planes+'lugares/', json={'name': name, 'hood': hood, 'address': address, 'city': city})
    return response.json()

def get_lugares(info):
    response = requests.get(url_planes+'lugares/')
    return response.json()

def get_lugar(info,id):
    response = requests.get(url_planes+'lugares/'+str(id))
    return response.json()

def eliminar_lugar(info,id):
    response = requests.delete(url_planes+'lugares/' + str(id))
    return response.json()

def create_ciudad(info, name):
    response = requests.post(url_planes+'ciudades/', json={'name': name})
    return response.json()

def get_ciudades(info):
    response = requests.get(url_planes+'ciudades/')
    return response.json()

def get_ciudad(info,id):
    response = requests.get(url_planes+'ciudades/'+str(id))
    return response.json()

def eliminar_ciudad(info,id):
    response = requests.delete(url_planes+'ciudades/'+str(id))
    return response.json()

#user = get_user_profile(info)
#user_id = user['id']

def create_parche(info, user_id, plan):
    response = requests.post(url_planes+'parches/', json={'user': user_id, 'plan': plan})
    return response.json()
