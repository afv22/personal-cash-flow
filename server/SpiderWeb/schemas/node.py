from uuid import uuid4
import graphene
from graphene_django import DjangoObjectType

from ..models import Node


class NodeType(DjangoObjectType):
    class Meta:
        model = Node
        fields = "__all__"

class NodeInput(graphene.InputObjectType):
    name = graphene.String()

class NodeCreate(graphene.Mutation):
    class Arguments:
        data = NodeInput(required=True)
    
    object = graphene.Field(NodeType)

    @staticmethod
    def mutate(root, info, data=None):
        node_instance = Node(
            id=uuid4(),
            name=data.name
        )
        node_instance.save()
        return NodeCreate(node=node_instance)

class NodeUpdate(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        node_data = NodeInput(required=True)

    node = graphene.Field(NodeType)

    @staticmethod
    def mutate(root, info, id, node_data=None):

        node_instance = Node.objects.get(pk=id)

        if node_instance:
            node_instance.name = node_data.name
            node_instance.save()

            return NodeUpdate(node=node_instance)
        return NodeUpdate(node=None)


class NodeDelete(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
    
    node = graphene.Field(NodeType)

    @staticmethod
    def mutate(root, info, id):
        node_instance = Node.objects.get(pk=id)
        node_instance.delete()
        return None
