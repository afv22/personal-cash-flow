from email.policy import default
from importlib.metadata import requires
import graphene
from graphene_django import DjangoObjectType
from ..helpers import generateID
from graphql import GraphQLError

from ..models import Edge


class EdgeType(DjangoObjectType):
    class Meta:
        model = Edge
        fields = "__all__"

    value = graphene.Float()

    def resolve_value(self, info):
        return Edge.objects.get(pk=self.id).calculateThroughValue()


class EdgeInput(graphene.InputObjectType):
    sourceId = graphene.ID(required=True)
    targetId = graphene.ID(required=True)
    sourcePercentage = graphene.Float(required=False)
    sourceAmount = graphene.Float(required=False)
    sourceRemainingBalance = graphene.Boolean(required=False)


class EdgeCreate(graphene.Mutation):
    class Arguments:
        data = EdgeInput(required=True)

    edge = graphene.Field(EdgeType)

    @staticmethod
    def mutate(root, info, data=None):
        valueOptions = [
            data.sourcePercentage,
            data.sourceAmount,
            data.sourceRemainingBalance,
        ]
        if sum([1 for option in valueOptions if option]) != 1:
            raise GraphQLError(
                "Set exactly one of sourcePercentage, sourceAmount, or sourceRemainingBalance"
            )
        instance = Edge(
            id=generateID(),
            sourceId=data.sourceId,
            targetId=data.targetId,
            sourcePercentage=data.sourcePercentage,
            sourceAmount=data.sourceAmount,
            sourceRemainingBalance=data.sourceRemainingBalance,
        )
        instance.save()
        return EdgeCreate(edge=instance)


class EdgeUpdate(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        data = EdgeInput()

    edge = graphene.Field(EdgeType)

    @staticmethod
    def mutate(root, info, id, data=None):

        instance = Edge.objects.get(pk=id)

        if instance:
            valueOptions = [
                data.sourcePercentage,
                data.sourceAmount,
                data.sourceRemainingBalance,
            ]
            if sum([1 for option in valueOptions if option]) != 1:
                raise GraphQLError(
                    "Set exactly one of sourcePercentage, sourceAmount, or sourceRemainingBalance"
                )

            instance.sourceId = data.sourceId
            instance.targetId = data.targetId
            instance.sourcePercentage = data.sourcePercentage
            instance.sourceAmount = data.sourceAmount
            instance.sourceRemainingBalance = data.sourceRemainingBalance
            instance.save()

            return EdgeUpdate(edge=instance)
        return EdgeUpdate(edge=None)


class EdgeDelete(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    edge = graphene.Field(EdgeType)

    @staticmethod
    def mutate(root, info, id):
        instance = Edge.objects.get(pk=id)
        instance.delete()
        return None
