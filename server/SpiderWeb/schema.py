from dataclasses import field
import graphene

from graphene_django import DjangoObjectType, DjangoListField
from .models import Node, Edge

# Base Types

class NodeType(DjangoObjectType):
    class Meta:
        model = Node
        fields = "__all__"

class EdgeType(DjangoObjectType):
    class Meta:
        model = Edge
        fields = "__all__"

# Input

class NodeInput(graphene.InputObjectType):
    id = graphene.ID()
    name = graphene.String()

class EdgeInput(graphene.InputObjectType):
    id = graphene.ID()
    sourceId = graphene.ID()
    targetId = graphene.ID()

# Mutations

class CreateNode(graphene.Mutation):
    class Arguments:
        node_data = NodeInput(required=True)
    
    node = graphene.Field(NodeType)

    @staticmethod
    def mutate(root, info, node_data=None):
        node_instance = Node(
            id=node_data.id,
            name=node_data.name
        )
        node_instance.save()
        return CreateNode(node=node_instance)

class CreateEdge(graphene.Mutation):
    class Arguments:
        edge_data = EdgeInput(required=True)
    
    edge = graphene.Field(EdgeType)

    @staticmethod
    def mutate(root, info, edge_data=None):
        edge_instance = Edge(
            id=edge_data.id,
            sourceId=edge_data.sourceId,
            targetId=edge_data.targetId,
        )
        edge_instance.save()
        return CreateEdge(edge=edge_instance)

class UpdateNode(graphene.Mutation):
    class Arguments:
        node_data = NodeInput(required=True)

    node = graphene.Field(NodeType)

    @staticmethod
    def mutate(root, info, node_data=None):

        node_instance = Node.objects.get(pk=node_data.id)

        if node_instance:
            node_instance.name = node_data.name
            node_instance.save()

            return UpdateNode(node=node_instance)
        return UpdateNode(node=None)

class UpdateEdge(graphene.Mutation):
    class Arguments:
        edge_data = EdgeInput(required=True)

    edge = graphene.Field(EdgeType)

    @staticmethod
    def mutate(root, info, edge_data=None):

        edge_instance = Edge.objects.get(pk=edge_data.id)

        if edge_instance:
            edge_instance.sourceId = edge_data.sourceId
            edge_instance.targetId = edge_data.targetId
            edge_instance.save()

            return UpdateEdge(edge=edge_instance)
        return UpdateEdge(edge=None)

class DeleteNode(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
    
    node = graphene.Field(NodeType)

    @staticmethod
    def mutate(root, info, id):
        node_instance = Node.objects.get(pk=id)
        node_instance.delete()
        return None

class DeleteEdge(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
    
    edge = graphene.Field(EdgeType)

    @staticmethod
    def mutate(root, info, id):
        edge_instance = Edge.objects.get(pk=id)
        edge_instance.delete()
        return None

## Query

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
    create_node = CreateNode.Field()
    update_node = UpdateNode.Field()
    delete_node = DeleteNode.Field()

    create_edge = CreateEdge.Field()
    update_edge = UpdateEdge.Field()
    delete_edge = DeleteEdge.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
