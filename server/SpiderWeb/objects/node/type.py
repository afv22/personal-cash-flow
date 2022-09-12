import graphene
from graphene_django import DjangoObjectType
from .model import NodeModel


class NodeType(DjangoObjectType):
    class Meta:
        model = NodeModel
        fields = "__all__"

    gross_value = graphene.Float(required=True, node_id=graphene.ID())

    def resolve_gross_value(self, info):
        return NodeModel.objects.get(pk=self.id).calculateGrossValue()

    net_value = graphene.Float(required=True, node_id=graphene.ID())

    def resolve_net_value(self, info):
        return NodeModel.objects.get(pk=self.id).calculateNetValue()
