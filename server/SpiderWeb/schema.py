import graphene

from .models import Node, Edge
from .schemas.node import *
from .schemas.edge import *

class Query(graphene.ObjectType):
    all_nodes = graphene.List(NodeType)
    node = graphene.Field(NodeType, node_id=graphene.Int())

    all_edges = graphene.List(EdgeType)
    edge = graphene.Field(EdgeType, edge_id=graphene.Int())

    def resolve_all_nodes(self, info, **kwargs):
        return Node.objects.all()
    
    def resolve_node(self, info, node_id):
        return Node.objects.get(pk=node_id)
    
    def resolve_all_edges(self, info, **kwargs):
        return Edge.objects.all()
    
    def resolve_edge(self, info, edge_id):
        return Edge.objects.get(pk=edge_id)

class Mutation(graphene.ObjectType):
    create_node = NodeCreate.Field()
    update_node = NodeUpdate.Field()
    delete_node = NodeDelete.Field()

    create_edge = EdgeCreate.Field()
    update_edge = EdgeUpdate.Field()
    delete_edge = EdgeDelete.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
