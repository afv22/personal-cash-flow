from django.db import models
from django.conf import settings
from SpiderWeb.helpers import fetch_model, Name


class NodeModel(models.Model):
    # Each variable represents a database field
    # The var name must match the column name in the database
    id = models.PositiveBigIntegerField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    initialValue = models.FloatField(default=1.0)

    def __str__(self) -> str:
        return self.name

    def calculateGrossValue(self) -> float:
        return self.initialValue + sum(
            [edge.calculateNetValue() for edge in self.getIncomingEdges()]
        )

    def calculateNetValue(self) -> float:
        outgoingValue = sum(
            [edge.calculateGrossValue() for edge in self.getOutgoingEdges()]
        )
        return self.calculateGrossValue() - outgoingValue

    def calculateRemainingBalanceForEdge(self, remaining_edge):
        outgoingValue = sum(
            [
                edge.calculateGrossValue()
                for edge in self.getOutgoingEdges()
                if edge.id != remaining_edge.id
            ]
        )
        return self.calculateGrossValue() - outgoingValue

    def getIncomingEdges(self):
        return fetch_model(Name.EDGE.value).objects.filter(targetId=self.id)

    def getOutgoingEdges(self):
        return fetch_model(Name.EDGE.value).objects.filter(sourceId=self.id)

    def getEdges(self):
        return self.getIncomingEdges() | self.getOutgoingEdges()
