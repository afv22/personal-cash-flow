# Generated by Django 4.1 on 2022-09-08 21:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Edge",
            fields=[
                (
                    "id",
                    models.PositiveBigIntegerField(primary_key=True, serialize=False),
                ),
                ("sourceId", models.PositiveBigIntegerField()),
                ("targetId", models.PositiveBigIntegerField()),
                ("isTaxable", models.BooleanField(default=False)),
                ("sourcePercentage", models.FloatField(default=0)),
                ("sourceAmount", models.FloatField(default=0)),
                ("sourceRemainingBalance", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="Node",
            fields=[
                (
                    "id",
                    models.PositiveBigIntegerField(primary_key=True, serialize=False),
                ),
                ("name", models.CharField(max_length=100)),
                ("initialValue", models.FloatField(default=1.0)),
            ],
        ),
    ]
