from rest_framework import serializers
from api.models import Person, Product

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ('id', 'uid', 'email', 'name', 'age', 'weight', 'height', 'calories', 'protein', 'fat', 'carbs')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'serveSize', 'calories', 'protein', 'fat', 'carbs')
    