import graphene
import graphql_jwt
from .models import Node, Edge
from .schemas.node import *
from .schemas.edge import *
from .schemas.user import *

# Distribute this https://www.howtographql.com/graphql-python/4-authentication/
class Query(graphene.ObjectType):

    all_nodes = graphene.List(NodeType)

    def resolve_all_nodes(self, info, **kwargs):
        return Node.objects.all()

    nodes = graphene.List(
        NodeType, node_ids=graphene.List(graphene.ID)
    )  # No parenthesis when it's the inner type

    def resolve_nodes(self, info, node_ids):
        return [Node.objects.get(pk=node_id) for node_id in node_ids]

    node = graphene.Field(
        NodeType, node_id=graphene.ID()
    )  # Parenthesis when it's the outer type

    def resolve_node(self, info, node_id):
        return Node.objects.get(pk=node_id)

    all_edges = graphene.List(EdgeType)

    def resolve_all_edges(self, info, **kwargs):
        return Edge.objects.all()

    edges = graphene.List(EdgeType, edge_ids=graphene.List(graphene.ID))

    def resolve_edges(self, info, edge_ids):
        return [Edge.objects.get(pk=edge_id) for edge_id in edge_ids]

    edge = graphene.Field(EdgeType, edge_id=graphene.ID())

    def resolve_edge(self, info, edge_id):
        return Edge.objects.get(pk=edge_id)

    edges_from_source_id = graphene.List(EdgeType, source_id=graphene.ID())

    def resolve_edges_from_source_id(self, info, source_id):
        return Edge.objects.filter(sourceId=source_id)

    edges_from_target_id = graphene.List(EdgeType, target_id=graphene.ID())

    def resolve_edges_from_target_id(self, info, target_id):
        return Edge.objects.filter(targetId=target_id)


class Mutation(graphene.ObjectType):
    create_node = NodeCreate.Field()
    update_node = NodeUpdate.Field()
    delete_node = NodeDelete.Field()

    create_edge = EdgeCreate.Field()
    update_edge = EdgeUpdate.Field()
    delete_edge = EdgeDelete.Field()

    create_user = UserCreate.Field()

    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
