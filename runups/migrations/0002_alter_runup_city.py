# Generated by Django 5.1.2 on 2024-10-29 07:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cities', '0001_initial'),
        ('runups', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='runup',
            name='city',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='runups', to='cities.city'),
        ),
    ]
