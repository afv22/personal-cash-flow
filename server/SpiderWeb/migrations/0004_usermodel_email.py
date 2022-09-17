# Generated by Django 4.1 on 2022-09-14 23:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("SpiderWeb", "0003_rename_location_usermodel_state"),
    ]

    operations = [
        migrations.AddField(
            model_name="usermodel",
            name="email",
            field=models.EmailField(
                blank=True, db_index=True, max_length=254, null=True, unique=True
            ),
        ),
    ]