# -*- coding: utf-8 -*-
"""
Created on Sun Apr  7 16:45:34 2024

@author: sruiz
"""

import requests
import json
import os


url_vaca="http://localhost:8080/parchate/vaca/"


def get_vaca(idVaca):
    #response = requests.get(url_vaca+'buscar/'+str(idVaca))
    try:
        response = requests.get(url_vaca + 'buscar/' + str(idVaca))
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        error_msg = {"error": str(e)}
        return json.dumps(error_msg)

print(get_vaca(2))










