# Generated by Django 4.0.5 on 2023-03-01 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_rename_didbothconnect_connection_didhumanaccept_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='human',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]
