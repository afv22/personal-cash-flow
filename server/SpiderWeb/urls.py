from django.urls import path

from . import views

urlpatterns = [
    # Args: route from app base; function to handle the request; reference name
    #   for anywhere in Django (this will be SpiderWeb:index)
    path('', views.index, name='index'),
]
