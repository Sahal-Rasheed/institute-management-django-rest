# Generated by Django 4.2 on 2023-04-25 06:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_staff_phone_number_alter_staff_qualification_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='course_pic',
            field=models.ImageField(null=True, upload_to='course_images'),
        ),
    ]
