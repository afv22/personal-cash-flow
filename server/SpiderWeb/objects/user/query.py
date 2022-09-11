import graphene
import graphql_jwt
from graphql import GraphQLError
from .type import UserType


class UserQuery(graphene.ObjectType):

    whoami = graphene.Field(UserType)

    def resolve_whoami(self, info):
        user = info.context.user
        if user.is_anonymous:
            return GraphQLError("User is not logged in")
        return user
