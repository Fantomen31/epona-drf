# Generated by Django 5.1.2 on 2024-10-31 08:12

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('routes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='route',
            name='difficulty_rating',
            field=models.FloatField(blank=True, choices=[(1.0, '1'), (1.25, '1.25'), (1.5, '1.5'), (1.75, '1.75'), (2.0, '2'), (2.25, '2.25'), (2.5, '2.5'), (2.75, '2.75'), (3.0, '3'), (3.25, '3.25'), (3.5, '3.5'), (3.75, '3.75'), (4.0, '4'), (4.25, '4.25'), (4.5, '4.5'), (4.75, '4.75'), (5.0, '5')], null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)]),
        ),
        migrations.AlterField(
            model_name='route',
            name='safety_rating',
            field=models.FloatField(blank=True, choices=[(1.0, '1'), (1.25, '1.25'), (1.5, '1.5'), (1.75, '1.75'), (2.0, '2'), (2.25, '2.25'), (2.5, '2.5'), (2.75, '2.75'), (3.0, '3'), (3.25, '3.25'), (3.5, '3.5'), (3.75, '3.75'), (4.0, '4'), (4.25, '4.25'), (4.5, '4.5'), (4.75, '4.75'), (5.0, '5')], null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)]),
        ),
        migrations.AlterField(
            model_name='routereview',
            name='review_rating',
            field=models.FloatField(blank=True, choices=[(1.0, '1'), (1.25, '1.25'), (1.5, '1.5'), (1.75, '1.75'), (2.0, '2'), (2.25, '2.25'), (2.5, '2.5'), (2.75, '2.75'), (3.0, '3'), (3.25, '3.25'), (3.5, '3.5'), (3.75, '3.75'), (4.0, '4'), (4.25, '4.25'), (4.5, '4.5'), (4.75, '4.75'), (5.0, '5')], null=True, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)]),
        ),
    ]