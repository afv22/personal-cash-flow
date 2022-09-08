from importlib.metadata import requires
import graphene
from graphene_django import DjangoObjectType
from ..models.user import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = "__all__"


class UserInput(graphene.InputObjectType):
    username = graphene.String(required=True)
    password = graphene.String(required=True)
    email = graphene.String(required=True)
    first_name = graphene.String(required=False)
    last_name = graphene.String(required=False)


class UserCreate(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        data = UserInput(required=True)

    @staticmethod
    def mutate(
        self,
        info,
        data,
    ):
        user = User(
            username=data.username,
            email=data.email,
            first_name=data.first_name,
        )
        user.set_password(data.password)
        user.save()

        return UserCreate(user=user)
