# Generated by Django 3.1.5 on 2021-02-08 03:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0006_auto_20210208_1058'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='Active',
            field=models.BooleanField(default=True),
        ),
    ]
