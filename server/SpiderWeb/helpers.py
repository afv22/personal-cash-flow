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


federalTaxBrackets = [
    (0, 0),
    (0.1, 9950),
    (0.12, 40525),
    (0.22, 86375),
    (0.24, 164925),
    (0.32, 209425),
    (0.35, 523600),
    (0.37, float("inf")),
]

DCTaxBrackets = [
    (0, 0),
    (0.04, 10000),
    (0.06, 40000),
    (0.065, 60000),
    (0.085, 250000),
    (0.0925, 500000),
    (0.975, 1000000),
    (0.1075, float("inf")),
]


def calculateTieredTaxes(taxableValue, taxBrackets) -> float:
    return sum(
        [
            rate * max(0, min(cap, taxableValue) - taxBrackets[i - 1][1])
            for i, (rate, cap) in enumerate(taxBrackets)
        ]
    )


def calculateRealTaxRate() -> float:
    taxableValue = sum(
        map(
            lambda edge: edge.calculateGrossValue(),
            fetch_model(Name.EDGE.value).objects.filter(isTaxable=True),
        )
    )
    federalTaxes = calculateTieredTaxes(taxableValue, federalTaxBrackets)
    stateTaxes = calculateTieredTaxes(taxableValue, DCTaxBrackets)
    medicareTaxes = taxableValue * 0.0145
    socSecTaxes = taxableValue * 0.062
    totalTaxes = sum([federalTaxes, stateTaxes, medicareTaxes, socSecTaxes])
    return totalTaxes / taxableValue
