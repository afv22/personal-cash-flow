from uuid import uuid4
import graphene
from graphene_django import DjangoObjectType

from ..models import Edge


class EdgeType(DjangoObjectType):
    class Meta:
        model = Edge
        fields = "__all__"

class EdgeInput(graphene.InputObjectType):
    sourceId = graphene.ID()
    targetId = graphene.ID()

class EdgeCreate(graphene.Mutation):
    class Arguments:
        data = EdgeInput(required=True)
    
    object = graphene.Field(EdgeType)

    @staticmethod
    def mutate(root, info, data=None):
        instance = Edge(
            id=uuid4(),
            sourceId=data.sourceId,
            targetId=data.targetId,
        )
        instance.save()
        return EdgeCreate(edge=instance)

class EdgeUpdate(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        data = EdgeInput(required=True)

    object = graphene.Field(EdgeType)

    @staticmethod
    def mutate(root, info, id, data=None):

        instance = Edge.objects.get(pk=id)

        if instance:
            instance.sourceId = data.sourceId
            instance.targetId = data.targetId
            instance.save()

            return EdgeUpdate(edge=instance)
        return EdgeUpdate(edge=None)

class EdgeDelete(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
    
    object = graphene.Field(EdgeType)

    @staticmethod
    def mutate(root, info, id):
        instance = Edge.objects.get(pk=id)
        instance.delete()
        return None
