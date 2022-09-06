import graphene
from graphene_django import DjangoObjectType
from ..helpers import generateID
from ..models import Node


class NodeType(DjangoObjectType):
    class Meta:
        model = Node
        fields = "__all__"

    gross_value = graphene.Float(required=True, node_id=graphene.ID())

    def resolve_gross_value(self, info):
        return Node.objects.get(pk=self.id).calculateGrossValue()

    net_value = graphene.Float(required=True, node_id=graphene.ID())

    def resolve_net_value(self, info):
        return Node.objects.get(pk=self.id).calculateNetValue()


class NodeInput(graphene.InputObjectType):
    name = graphene.String()
    initialValue = graphene.Float()


class NodeCreate(graphene.Mutation):
    class Arguments:
        data = NodeInput(required=True)

    node = graphene.Field(NodeType)

    @staticmethod
    def mutate(root, info, data=None):
        node_instance = Node(
            id=generateID(),
            name=data.name,
            initialValue=data.initialValue,
        )
        node_instance.save()
        return NodeCreate(node=node_instance)


class NodeUpdate(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        data = NodeInput(required=True)

    node = graphene.Field(NodeType)

    @staticmethod
    def mutate(root, info, id, data=None):

        instance = Node.objects.get(pk=id)

        if instance:
            if data.name is not None:
                instance.name = data.name
            if data.initialValue is not None:
                instance.initialValue = data.initialValue
            instance.save()

            return NodeUpdate(node=instance)
        return NodeUpdate(node=None)


class NodeDelete(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    node = graphene.Field(NodeType)

    @staticmethod
    def mutate(root, info, id):
        instance = Node.objects.get(pk=id)
        for edge in instance.getEdges():
            edge.delete()
        instance.delete()
        return None
