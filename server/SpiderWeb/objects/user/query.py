import graphene
from .type import UserType
from graphql import GraphQLError


class UserQuery(graphene.ObjectType):

    whoami = graphene.Field(UserType, token=graphene.String(required=True))

    def resolve_whoami(self, info):
        user = info.context.user
        if user.is_anonymous:
            return GraphQLError("User is not logged in")
        return user
