from django.contrib import admin
from SpiderWeb.models import EdgeModel, NodeModel, UserModel

admin.site.register(UserModel)
admin.site.register(EdgeModel)
admin.site.register(NodeModel)
