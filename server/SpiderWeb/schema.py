import graphene
import graphql_jwt
from graphql import GraphQLError

from SpiderWeb.objects.node.query import NodeQuery
from SpiderWeb.objects.edge.query import EdgeQuery

from SpiderWeb.objects.edge.mutation import EdgeMutation
from SpiderWeb.objects.node.mutation import NodeMutation

from .objects.user.schema import *


class Query(EdgeQuery, NodeQuery, graphene.ObjectType):

    me = graphene.Field(UserType)

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            return GraphQLError("User is not logged in")
        return user


class Mutation(EdgeMutation, NodeMutation, graphene.ObjectType):

    create_user = UserCreate.Field()

    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
