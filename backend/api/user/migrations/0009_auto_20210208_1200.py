# Generated by Django 3.1.5 on 2021-02-08 05:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0008_remove_customuser_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='name',
            field=models.CharField(default='Anonymous', max_length=100),
        ),
    ]
