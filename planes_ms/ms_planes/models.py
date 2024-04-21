from django.db import models
from django.contrib.auth.models import User, AbstractUser

# Create your models here.

class User(AbstractUser):
    email = models.EmailField(blank=False, max_length=255, verbose_name='email')

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    

class Ciudad(models.Model):
    name = models.CharField(max_length = 255)


class Lugar(models.Model):
    name = models.CharField(max_length = 255)
    hood = models.CharField(max_length = 255)
    address = models.CharField(max_length = 255)
    city = models.ForeignKey(Ciudad, on_delete = models.CASCADE)

    
class Planes(models.Model):
    name = models.CharField(max_length = 100)
    date = models.DateField()
    chat_link = models.CharField(max_length = 100)
    user_admin = models.ForeignKey(User, on_delete = models.CASCADE)
    place = models.ForeignKey(Lugar, on_delete = models.CASCADE)

class Parcharme(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    plan = models.ForeignKey(Planes, on_delete = models.CASCADE)


    

    


    
    



    
