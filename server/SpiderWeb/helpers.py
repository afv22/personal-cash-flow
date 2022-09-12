import random
from enum import Enum
from django.apps import apps
from django.db import models


class Name(Enum):
    NODE = "NodeModel"
    EDGE = "EdgeModel"
    USER = "UserModel"


def fetch_model(model_name: Name) -> models.Model:
    return apps.get_model(app_label="SpiderWeb", model_name=model_name)


def generateID():
    return random.randint(100000, 999999)
