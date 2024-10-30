# Generated by Django 5.1.2 on 2024-10-30 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cities', '0001_initial'),
        ('clubs', '0003_alter_club_weekly_meetup_schedule'),
    ]

    operations = [
        migrations.AlterField(
            model_name='club',
            name='sister_cities',
            field=models.ManyToManyField(blank=True, null=True, related_name='sister_clubs', to='cities.city'),
        ),
    ]