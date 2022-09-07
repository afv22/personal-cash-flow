from tokenize import String
from django.apps import apps
from django.db import models


def fetch_model(model_name: String) -> models.Model:
    return apps.get_model(app_label="SpiderWeb", model_name=model_name)
