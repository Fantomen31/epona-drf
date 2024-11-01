# Generated by Django 5.1.2 on 2024-10-28 17:50

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='RunUp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(blank=True)),
                ('location', models.CharField(max_length=255)),
                ('date_time', models.DateTimeField()),
                ('visibility', models.CharField(choices=[('CLOSED', 'Closed - Only visible to connected users'), ('OPEN', 'Open - Visible to anyone in the same city')], default='CLOSED', max_length=6)),
                ('city', models.CharField(max_length=100)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('distance', models.PositiveIntegerField(help_text='Distance in kilometers (1-25 km)', validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(25)])),
                ('pace', models.CharField(blank=True, help_text="Expected pace (e.g., '5:30/km')", max_length=10, null=True)),
                ('duration', models.PositiveIntegerField(help_text='Expected duration in minutes', validators=[django.core.validators.MinValueValidator(1)])),
                ('route', models.TextField(blank=True, help_text='Description or link to the planned route', null=True)),
                ('host', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hosted_runups', to=settings.AUTH_USER_MODEL)),
                ('participants', models.ManyToManyField(blank=True, related_name='joined_runups', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
