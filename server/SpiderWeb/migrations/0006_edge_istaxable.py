# Generated by Django 4.1 on 2022-09-06 15:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("SpiderWeb", "0005_rename_amount_edge_sourceamount_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="edge",
            name="isTaxable",
            field=models.BooleanField(default=False),
        ),
    ]
