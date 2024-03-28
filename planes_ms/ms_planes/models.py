from django.db import models
from django.contrib.auth.models import User, AbstractUser

# Create your models here.

class User(AbstractUser):
    name = models.CharField(max_length = 255)
    username = models.CharField(max_length = 255, unique = True)
    password = models.CharField(max_length = 255)
    email = models.EmailField(max_length = 255, unique = True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

class Ciudad(models.Model):
    name = models.CharField(max_length = 255)

    def __str__(self):
        return self.name

class Lugar(models.Model):
    name = models.CharField(max_length = 255)
    hood = models.CharField(max_length = 255)
    address = models.CharField(max_length = 255)
    city = models.ForeignKey(Ciudad, on_delete = models.CASCADE)

    def __str__(self):
        return '%s' % (self.city)  
    
class Planes(models.Model):
    name = models.CharField(max_length = 100)
    date = models.DateField()
    chat_link = models.CharField(max_length = 100)
    user_admin = models.ForeignKey(User, on_delete = models.CASCADE)
    place = models.ForeignKey(Lugar, on_delete = models.CASCADE)

class Parcharme(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    plan = models.ForeignKey(Planes, on_delete = models.CASCADE)


    

    


    
    



    
