from django.db import models


class Node(models.Model):
    # Each variable represents a database field
    # The var name must match the column name in the database
    id = models.PositiveBigIntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    initialValue = models.FloatField(default=1.0)

    def calculateGrossValue(self) -> float:
        return self.initialValue + sum(
            [edge.calculateThroughValue() for edge in self.getIncomingEdges()]
        )

    def calculateNetValue(self) -> float:
        outgoingValue = sum(
            [edge.calculateThroughValue() for edge in self.getOutgoingEdges()]
        )
        return self.calculateGrossValue() - outgoingValue

    def calculateRemainingBalanceForEdge(self, remaining_edge):
        outgoingValue = sum(
            [
                edge.calculateThroughValue()
                for edge in self.getOutgoingEdges()
                if edge.id != remaining_edge.id
            ]
        )
        return self.calculateGrossValue() - outgoingValue

    def getIncomingEdges(self):
        return Edge.objects.filter(targetId=self.id)

    def getOutgoingEdges(self):
        return Edge.objects.filter(sourceId=self.id)
    
    def getEdges(self):
        return self.getIncomingEdges() | self.getOutgoingEdges()

    def __str__(self) -> str:
        return self.name


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

    def calculateThroughValue(self) -> float:
        sourceNode = Node.objects.get(pk=self.sourceId)
        if self.sourcePercentage:
            return sourceNode.calculateGrossValue() * self.sourcePercentage / 100
        elif self.sourceAmount:
            return self.sourceAmount
        return sourceNode.calculateRemainingBalanceForEdge(self)
