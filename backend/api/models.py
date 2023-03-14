from django.db import models

# Create your models here.
class Person(models.Model):
    uid = models.CharField(max_length=300)
    email = models.CharField(max_length=500)
    name = models.CharField(max_length = 500)
    age = models.IntegerField()
    weight = models.FloatField()
    height = models.FloatField()
    calories = models.FloatField()
    protein = models.FloatField()
    fat = models.FloatField()
    carbs = models.FloatField()
    
class Product(models.Model):
    name = models.CharField(max_length = 500)
    serveSize = models.IntegerField(default = 1)
    calories = models.FloatField(default = 0)
    protein = models.FloatField(default = 0)
    fat = models.FloatField(default = 0)
    carbs = models.FloatField(default = 0)
    
