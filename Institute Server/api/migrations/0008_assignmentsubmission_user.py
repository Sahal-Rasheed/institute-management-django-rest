# Generated by Django 4.2 on 2023-04-30 11:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_assignmentsubmission'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignmentsubmission',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
