from pydoc import ispackage
from django.db import models


class Node(models.Model):
    # Each variable represents a database field
    # The var name must match the column name in the database
    id = models.PositiveBigIntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    initialValue = models.FloatField(default=1.0)

    def calculateGrossValue(self) -> float:
        return self.initialValue + sum([edge.calculateThroughValue() for edge in self.getIncomingEdges()])
    
    def calculateNetValue(self) -> float:
        return self.calculateGrossValue() - sum([edge.calculateThroughValue() for edge in self.getOutgoingEdges()])

    def getIncomingEdges(self):
        return Edge.objects.filter(targetId=self.id)

    def getOutgoingEdges(self):
        return Edge.objects.filter(sourceId=self.id)

    def __str__(self) -> str:
        return self.name

class Edge(models.Model):
    id = models.PositiveBigIntegerField(primary_key=True)
    sourceId = models.PositiveBigIntegerField()
    targetId = models.PositiveBigIntegerField()
    isPercentage = models.BooleanField(default=False)
    amount = models.FloatField(default=0)

    def __str__(self) -> str:
        return self.id
    
    def calculateThroughValue(self) -> float:
        sourceNode = Node.objects.get(pk=self.sourceId)
        if self.isPercentage:
            return sourceNode.calculateGrossValue() * self.amount
        else:
            return self.amount