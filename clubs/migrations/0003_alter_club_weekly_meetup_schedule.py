# Generated by Django 5.1.2 on 2024-10-30 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clubs', '0002_alter_club_social_links'),
    ]

    operations = [
        migrations.AlterField(
            model_name='club',
            name='weekly_meetup_schedule',
            field=models.JSONField(blank=True, null=True),
        ),
    ]