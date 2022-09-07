from .fetch_model import fetch_model
from functools import cache


@cache
def calculateRealTaxRate() -> float:
    taxableValue = sum(
        map(
            lambda edge: edge.calculateGrossValue(),
            fetch_model("Edge").objects.filter(isTaxable=True),
        )
    )
    federalTaxes = 33603 + (taxableValue - 164925) * 0.32
    stateTaxes = 3500 + (taxableValue - 60000) * 0.085
    medicareTaxes = taxableValue * 0.0145
    socSecTaxes = taxableValue * 0.062
    totalTaxes = sum([federalTaxes, stateTaxes, medicareTaxes, socSecTaxes])
    return totalTaxes / taxableValue
