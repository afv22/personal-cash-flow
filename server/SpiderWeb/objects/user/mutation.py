import graphene
from .model import UserModel
from .type import UserType


class UserInput(graphene.InputObjectType):
    username = graphene.String(required=True)
    password = graphene.String(required=True)
    email = graphene.String(required=False)
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
        user = UserModel(
            username=data.username,
            first_name=data.first_name,
        )
        user.set_password(data.password)
        user.save()

        return UserCreate(user=user)


class UserMutation(graphene.ObjectType):
    create_user = UserCreate.Field()
