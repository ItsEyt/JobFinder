# Generated by Django 4.0.5 on 2023-03-21 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_company_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]