from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from ldap3 import Server, Connection, SIMPLE, SYNC, ALL
import json


@csrf_exempt
def ldap_login_view(request):
    data = json.loads(request.body)
    if request.method == 'POST':
        username = data.get('username')
        password = data.get('password')

        server = Server('host.docker.internal', port=389, get_info=ALL)
        conn = Connection(server, user="cn=admin,dc=parchate,dc=com", password="ThisPassword", authentication=SIMPLE)
        if not conn.bind():
            return HttpResponse('Error de conexión:', conn.result)
        else:
            # Intenta autenticar al usuario
            conn.search('dc=parchate,dc=com', '(uid={})'.format(username))

            if conn.entries:
                user_dn = conn.entries[0].entry_dn
                # Intenta autenticar al usuario con su DN y contraseña
                if conn.rebind(user=user_dn, password=password):
                    return HttpResponse("¡Inicio de sesión exitoso!")
                else:
                    return HttpResponse("Error de autenticación:", conn.result)
            else:
                return HttpResponse("Error al conectarse a la session")




