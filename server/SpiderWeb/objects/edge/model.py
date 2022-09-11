from django.db import models
from django.conf import settings
from SpiderWeb.helpers import fetch_model, calculateRealTaxRate, Name


class EdgeModel(models.Model):
    id = models.PositiveBigIntegerField(primary_key=True)
    # user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    sourceId = models.PositiveBigIntegerField()
    targetId = models.PositiveBigIntegerField()
    isTaxable = models.BooleanField(default=False)
    # Only one of these should be set at any given time. Each represents
    # an option for how much of the source balance should be piped through
    sourcePercentage = models.FloatField(default=0)
    sourceAmount = models.FloatField(default=0)
    sourceRemainingBalance = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.sourceId} - {self.targetId}"

    def calculateGrossValue(self) -> float:
        sourceNode = fetch_model(Name.NODE.value).objects.get(pk=self.sourceId)
        if self.sourcePercentage:
            return sourceNode.calculateGrossValue() * self.sourcePercentage / 100
        elif self.sourceAmount:
            return self.sourceAmount
        return sourceNode.calculateRemainingBalanceForEdge(self)

    def calculateTaxes(self) -> float:
        if not self.isTaxable:
            return 0
        print(self.calculateGrossValue())
        return self.calculateGrossValue() * calculateRealTaxRate()

    def calculateNetValue(self) -> float:
        return self.calculateGrossValue() - self.calculateTaxes()
