from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from . import views

urlpatterns = [
    path("admin/", admin.site.urls),
    # Remove csrf_exempt for production. Adding it now because it blocks the app every time
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path("", views.index),
]
