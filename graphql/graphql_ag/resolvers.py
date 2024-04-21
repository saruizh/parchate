import graphene
import requests
import json
import os

#URLs de los microservicios
url_vaca=os.environ.get("vaca_ms_URL", "host.docker.internal:8080/parchate/vaca/")


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