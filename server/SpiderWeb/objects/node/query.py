import graphene
from .model import NodeModel
from .mutation import NodeType


class NodeQuery(graphene.ObjectType):

    all_nodes = graphene.List(NodeType)

    def resolve_all_nodes(self, info, **kwargs):
        return NodeModel.objects.all()

    nodes = graphene.List(
        NodeType, node_ids=graphene.List(graphene.ID)
    )  # No parenthesis when it's the inner type

    def resolve_nodes(self, info, node_ids):
        return [NodeModel.objects.get(pk=node_id) for node_id in node_ids]

    node = graphene.Field(
        NodeType, node_id=graphene.ID()
    )  # Parenthesis when it's the outer type

    def resolve_node(self, info, node_id):
        print(info.context.user)
        return NodeModel.objects.get(pk=node_id)
