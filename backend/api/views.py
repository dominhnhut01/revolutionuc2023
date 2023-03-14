from django.shortcuts import render
from api.OCR import detect_text
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from api.models import Person, Product
from api.serializers import PersonSerializer, ProductSerializer
import base64
from django.core.files.base import ContentFile
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
import os

@csrf_exempt
def get_person(request, id=0):
    if request.method == 'GET':
        try:
            person_uid = request.GET.get('uid', '')
            persons = Person.objects.filter(uid = person_uid)
            if not persons:
                return JsonResponse(data={}, status=status.HTTP_204_NO_CONTENT)
            persons_serializer = PersonSerializer(persons, many=True)
            return JsonResponse(persons_serializer.data, safe=False, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return JsonResponse(data={}, status=status.HTTP_404_NOT_FOUND)
# @csrf_exempt
# def get_person(request, id=0):
#     if request.method == 'GET':
#         print("email", id)
#         person = Person.objects.get(email=id)
#         person_serializer = PersonSerializer(person)
#         return JsonResponse(person_serializer.data, safe=False)
@csrf_exempt
def add_person(request, id=0):
    if request.method == 'POST':
        try:
            person_data = JSONParser().parse(request)
            new_uid = person_data["uid"]
            new_email = person_data["email"]
            new_name = person_data["name"]
            new_age = person_data["age"]
            new_weight = person_data["weight"]
            new_height = person_data["height"]
            new_calories = 0
            new_protein = 0
            new_fat = 0
            new_carbs = 0
            
            to_add = Person(
                uid = new_uid,
                email = new_email,
                name = new_name,
                age = new_age,
                weight = new_weight,
                height = new_height,
                calories = new_calories,
                protein = new_protein,
                fat = new_fat,
                carbs = new_carbs
            )
            to_add.save()
            print('--------------')
            print("Save Susccessfully")
            print('--------------')

            return JsonResponse("Added Successfully", safe=False, status=status.HTTP_200_OK)
        except Exception as e:
            error = "Failed to add, error =" + str(e)
            return JsonResponse(error, safe = False)



@csrf_exempt
def get_product(request, id=0):
    if request.method == 'GET':
        products = Product.objects.all()
        product_serializer = ProductSerializer(products, many=True)
        return JsonResponse(product_serializer.data, safe=False)

@csrf_exempt
def add_product(request):
    if request.method == 'POST':
        # Get the Base64 string from the request body
        data = JSONParser().parse(request)
        uid = data['uid']
        data = data['image']
        # nutrition_dict = detect_text(img_url)
        format, imgstr = data.split(';base64,') 
        ext = format.split('/')[-1] 
        # Decode the Base64 string into a binary format
        binary_data = base64.b64decode(imgstr)

        # Create a ContentFile object from the binary data
        image_file = ContentFile(binary_data)

        # Save the image file to disk
        filename = f'image_{uid}.{ext}'
        with open(filename, 'wb') as f:
            f.write(image_file.read())


        nutrition_dict = detect_text(filename)
        # nutrition_dict = {"Calories": 140, "Total Fat": [6, "mg"], "Protein": [10, "mg"]}

        person = Person.objects.get(uid=uid)
        person.calories += nutrition_dict['Calories'] if 'Calories' in nutrition_dict else 0
        person.fat += nutrition_dict['Total Fat'] if 'Total Fat' in nutrition_dict else 0
        person.protein += nutrition_dict['Protein'] if 'Protein' in nutrition_dict else 0
        person.carbs += nutrition_dict['Total Carbohydrate'] if 'Total Carbohydrate' in nutrition_dict else 0

        person.save()
        # Return a JSON response to the client
        os.remove(filename)
        return JsonResponse(nutrition_dict, status=status.HTTP_200_OK)
    else:
        response_data = {'error': 'Invalid request method'}
        return JsonResponse(response_data, status=status.HTTP_405_METHOD_NOT_ALLOWED)

