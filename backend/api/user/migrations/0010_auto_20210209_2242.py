# Generated by Django 3.1.5 on 2021-02-09 15:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0009_auto_20210208_1200'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='name',
            field=models.CharField(default='Anonymous', max_length=100, null=True),
        ),
    ]
