# Generated by Django 3.1.7 on 2021-02-21 19:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_auto_20210221_2032'),
        ('order', '0004_auto_20210222_0251'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='products',
            field=models.ManyToManyField(blank=True, related_name='products', to='product.Size'),
        ),
    ]
