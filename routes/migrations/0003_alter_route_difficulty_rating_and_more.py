# Generated by Django 5.1.2 on 2024-10-31 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('routes', '0002_alter_route_difficulty_rating_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='route',
            name='difficulty_rating',
            field=models.DecimalField(blank=True, choices=[(1.0, '1'), (1.25, '1.25'), (1.5, '1.5'), (1.75, '1.75'), (2.0, '2'), (2.25, '2.25'), (2.5, '2.5'), (2.75, '2.75'), (3.0, '3'), (3.25, '3.25'), (3.5, '3.5'), (3.75, '3.75'), (4.0, '4'), (4.25, '4.25'), (4.5, '4.5'), (4.75, '4.75'), (5.0, '5')], decimal_places=2, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='route',
            name='safety_rating',
            field=models.DecimalField(blank=True, choices=[(1.0, '1'), (1.25, '1.25'), (1.5, '1.5'), (1.75, '1.75'), (2.0, '2'), (2.25, '2.25'), (2.5, '2.5'), (2.75, '2.75'), (3.0, '3'), (3.25, '3.25'), (3.5, '3.5'), (3.75, '3.75'), (4.0, '4'), (4.25, '4.25'), (4.5, '4.5'), (4.75, '4.75'), (5.0, '5')], decimal_places=2, max_digits=3, null=True),
        ),
        migrations.AlterField(
            model_name='routereview',
            name='review_rating',
            field=models.DecimalField(blank=True, choices=[(1.0, '1'), (1.25, '1.25'), (1.5, '1.5'), (1.75, '1.75'), (2.0, '2'), (2.25, '2.25'), (2.5, '2.5'), (2.75, '2.75'), (3.0, '3'), (3.25, '3.25'), (3.5, '3.5'), (3.75, '3.75'), (4.0, '4'), (4.25, '4.25'), (4.5, '4.5'), (4.75, '4.75'), (5.0, '5')], decimal_places=2, max_digits=3, null=True),
        ),
    ]