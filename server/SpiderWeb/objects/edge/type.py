import graphene
from graphene_django import DjangoObjectType

from .model import EdgeModel


class EdgeType(DjangoObjectType):
    class Meta:
        model = EdgeModel
        fields = "__all__"

    value = graphene.Float()

    def resolve_value(self, info):
        return EdgeModel.objects.get(pk=self.id).calculateNetValue()

    taxes = graphene.Float()

    def resolve_taxes(self, info):
        return EdgeModel.objects.get(pk=self.id).calculateTaxes()
