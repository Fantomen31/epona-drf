# Generated by Django 5.1.2 on 2024-10-31 07:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cities', '0001_initial'),
        ('clubs', '0004_alter_club_sister_cities'),
    ]

    operations = [
        migrations.AlterField(
            model_name='club',
            name='sister_cities',
            field=models.ManyToManyField(blank=True, related_name='sister_clubs', to='cities.city'),
        ),
    ]