import graphene

from .models import Node, Edge
from .schemas.node import *
from .schemas.edge import *


class Query(graphene.ObjectType):

    all_nodes = graphene.List(NodeType)

    def resolve_all_nodes(self, info, **kwargs):
        return Node.objects.all()

    nodes = graphene.List(NodeType, node_ids=graphene.List(graphene.Int))

    def resolve_nodes(self, info, node_ids):
        return [Node.objects.get(pk=node_id) for node_id in node_ids]

    node = graphene.Field(NodeType, node_id=graphene.Int())

    def resolve_node(self, info, node_id):
        return Node.objects.get(pk=node_id)

    all_edges = graphene.List(EdgeType)

    def resolve_all_edges(self, info, **kwargs):
        return Edge.objects.all()

    edges = graphene.List(EdgeType, edge_ids=graphene.List(graphene.Int))

    def resolve_edges(self, info, edge_ids):
        return [Edge.objects.get(pk=edge_id) for edge_id in edge_ids]

    edge = graphene.Field(EdgeType, edge_id=graphene.Int())

    def resolve_edge(self, info, edge_id):
        return Edge.objects.get(pk=edge_id)

    edges_from_source_id = graphene.List(EdgeType, source_id=graphene.Int())

    def resolve_edges_from_source_id(self, info, source_id):
        return Edge.objects.filter(sourceId=source_id)

    edges_from_target_id = graphene.List(EdgeType, target_id=graphene.Int())

    def resolve_edges_from_target_id(self, info, target_id):
        return Edge.objects.filter(targetId=target_id)

class Mutation(graphene.ObjectType):
    create_node = NodeCreate.Field()
    update_node = NodeUpdate.Field()
    delete_node = NodeDelete.Field()

    create_edge = EdgeCreate.Field()
    update_edge = EdgeUpdate.Field()
    delete_edge = EdgeDelete.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
