import graphene
from graphene_django import DjangoObjectType
from SpiderWeb.helpers import generateID
from .model import NodeModel
from .type import NodeType


class NodeInput(graphene.InputObjectType):
    name = graphene.String()
    initialValue = graphene.Float()


class NodeCreate(graphene.Mutation):
    class Arguments:
        data = NodeInput(required=True)

    node = graphene.Field(NodeType)

    @staticmethod
    def mutate(root, info, data=None):
        print(info.context.user)
        node_instance = NodeModel(
            id=generateID(),
            name=data.name,
            initialValue=data.initialValue,
            user_id=info.context.user.id,
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

        instance = NodeModel.objects.get(pk=id)

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

    success = graphene.Boolean()

    @staticmethod
    def mutate(root, info, id):
        instance = NodeModel.objects.get(pk=id)
        for edge in instance.getEdges():
            edge.delete()
        instance.delete()
        return True


class NodeMutation(graphene.ObjectType):
    create_node = NodeCreate.Field()
    update_node = NodeUpdate.Field()
    delete_node = NodeDelete.Field()
