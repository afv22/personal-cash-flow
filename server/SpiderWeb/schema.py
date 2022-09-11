import graphene
import graphql_jwt
from graphql import GraphQLError

from SpiderWeb.objects.node.query import NodeQuery
from SpiderWeb.objects.edge.query import EdgeQuery
from SpiderWeb.objects.user.query import UserQuery

from SpiderWeb.objects.edge.mutation import EdgeMutation
from SpiderWeb.objects.node.mutation import NodeMutation
from SpiderWeb.objects.user.mutation import UserMutation

from .objects.user.mutation import *


class Query(EdgeQuery, NodeQuery, UserQuery, graphene.ObjectType):
    pass


class Mutation(EdgeMutation, NodeMutation, UserMutation, graphene.ObjectType):

    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
