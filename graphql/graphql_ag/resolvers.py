import graphene
import requests
import json
import os

#URLs de los microservicios
url_vaca=os.environ.get("vaca_ms_URL", "host.docker.internal:8080/parchate/vaca/")
url_comentarios=os.environ.get('COMENTARIOS_MS_URL','host.docker.internal:3001/comentarios/') # 'http://localhost:3001/comentarios/'



#Resolvers para el microservicio vaca

def create_vaca(info,idPlan,nombreVaca,fechaLimite,montoTotal,Alcance):
    response = requests.post(url_vaca+'crear', json={'idPlan': idPlan,'nombreVaca': nombreVaca, 'fechaLimite': fechaLimite,'montoTotal': montoTotal,'Alcance':Alcance})
    return response.json()

def get_vaca(info,idVaca):
    response = requests.get(url_vaca+'buscar/'+str(idVaca))
    return response.json()
    

def abonar_vaca(info,idVaca,montoTotal):
    response = requests.put(url_vaca+'abonar', json={'id':idVaca,'montoTotal':montoTotal})
    return response.json()

def eliminar_vaca(info,id_vaca):
    response = requests.delete(url_vaca+'eliminar/'+str(id_vaca))
    return response.json()

##resolvers para el microservicio comentarios

def create_comentario(info, id_plan, nickname, cuerpo, rating):
    response = requests.post(url_comentarios, json={'id_plan': id_plan, 'nickname': nickname, 'cuerpo': cuerpo,'rating': rating})
    return response.json()

def get_comentario(info, id_comentario):
    response = requests.get(url_comentarios + str(id_comentario))
    return response.json()

def editar_comentario(info, id_comentario, cuerpo):
    response = requests.put(url_comentarios + str(id_comentario), json={'cuerpo':cuerpo})
    return response.json()

def editar_rating(info, id_comentario, rating):
    response = requests.put(url_comentarios + str(id_comentario), json={'rating':rating})
    return response.json()    

def eliminar_comentario(info, id_comentario):
    response = requests.delete(url_comentarios + str(id_comentario))
    return response.json()