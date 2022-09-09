import graphene
from .type import EdgeType
from .model import EdgeModel


class EdgeQuery(graphene.ObjectType):

    all_edges = graphene.List(EdgeType)

    def resolve_all_edges(self, info, **kwargs):
        return EdgeModel.objects.all()

    edges = graphene.List(EdgeType, edge_ids=graphene.List(graphene.ID))

    def resolve_edges(self, info, edge_ids):
        return [EdgeModel.objects.get(pk=edge_id) for edge_id in edge_ids]

    edge = graphene.Field(EdgeType, edge_id=graphene.ID())

    def resolve_edge(self, info, edge_id):
        return EdgeModel.objects.get(pk=edge_id)

    edges_from_source_id = graphene.List(EdgeType, source_id=graphene.ID())

    def resolve_edges_from_source_id(self, info, source_id):
        return EdgeModel.objects.filter(sourceId=source_id)

    edges_from_target_id = graphene.List(EdgeType, target_id=graphene.ID())

    def resolve_edges_from_target_id(self, info, target_id):
        return EdgeModel.objects.filter(targetId=target_id)
