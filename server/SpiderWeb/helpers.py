import random
from functools import cache
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


def calculateFederalTaxes(taxableValue) -> float:
    if taxableValue < 0:
        return 0
    if taxableValue < 9950:
        return taxableValue * 0.1
    if taxableValue < 40525:
        return 995 + (taxableValue - 9950) * 0.12
    if taxableValue < 86375:
        return 4664 + (taxableValue - 40525) * 0.22
    if taxableValue < 164925:
        return 14751 + (taxableValue - 86375) * 0.24
    if taxableValue < 209425:
        return 33603 + (taxableValue - 164925) * 0.32
    if taxableValue < 523600:
        return 47843 + (taxableValue - 209425) * 0.35
    return 157804 + (taxableValue - 523600) * 0.37


def calculateStateTaxes(taxableValue) -> float:
    if taxableValue < 0:
        return 0
    if taxableValue < 10000:
        return taxableValue * 0.04
    if taxableValue < 40000:
        return 400 + (taxableValue - 10000) * 0.06
    if taxableValue < 60000:
        return 2200 + (taxableValue - 40000) * 0.065
    if taxableValue < 250000:
        return 3500 + (taxableValue - 60000) * 0.085
    if taxableValue < 500000:
        return 19650 + (taxableValue - 250000) * 0.0925
    if taxableValue < 1000000:
        return 42775 + (taxableValue - 500000) * 0.0975
    return 91525 + (taxableValue - 1000000) * 0.1075


def calculateRealTaxRate() -> float:
    taxableValue = sum(
        map(
            lambda edge: edge.calculateGrossValue(),
            fetch_model(Name.EDGE.value).objects.filter(isTaxable=True),
        )
    )
    federalTaxes = calculateFederalTaxes(taxableValue)
    stateTaxes = calculateStateTaxes(taxableValue)
    medicareTaxes = taxableValue * 0.0145
    socSecTaxes = taxableValue * 0.062
    totalTaxes = sum([federalTaxes, stateTaxes, medicareTaxes, socSecTaxes])
    return totalTaxes / taxableValue
