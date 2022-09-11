from graphene_django import DjangoObjectType
from .model import UserModel


class UserType(DjangoObjectType):
    class Meta:
        model = UserModel
        fields = "__all__"
