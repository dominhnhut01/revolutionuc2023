from django.urls import re_path
from api import views

urlpatterns =[
    re_path(r'^user/info/$', views.get_person),
    re_path(r'^user/create$', views.add_person),
    re_path(r'^product/add$', views.add_product),
    re_path(r'^product$', views.get_product),

]


