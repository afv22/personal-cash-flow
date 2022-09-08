from django.db import models
from .utils.fetch_model import fetch_model
from .utils.tax_rate import calculateRealTaxRate
from .utils.model_names import Name


class Edge(models.Model):
    id = models.PositiveBigIntegerField(primary_key=True)
    sourceId = models.PositiveBigIntegerField()
    targetId = models.PositiveBigIntegerField()
    isTaxable = models.BooleanField(default=False)
    # Only one of these should be set at any given time. Each represents
    # an option for how much of the source balance should be piped through
    sourcePercentage = models.FloatField(default=0)
    sourceAmount = models.FloatField(default=0)
    sourceRemainingBalance = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.id

    def calculateGrossValue(self) -> float:
        sourceNode = fetch_model(Name.NODE.value).objects.get(
            pk=self.sourceId
        )
        if self.sourcePercentage:
            return sourceNode.calculateGrossValue() * self.sourcePercentage / 100
        elif self.sourceAmount:
            return self.sourceAmount
        return sourceNode.calculateRemainingBalanceForEdge(self)

    def calculateTaxes(self) -> float:
        if not self.isTaxable:
            return 0
        return self.calculateGrossValue() * calculateRealTaxRate()

    def calculateNetValue(self) -> float:
        return self.calculateGrossValue() - self.calculateTaxes()
