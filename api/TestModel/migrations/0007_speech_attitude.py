# Generated by Django 3.2.5 on 2021-07-25 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TestModel', '0006_speech_uid'),
    ]

    operations = [
        migrations.CreateModel(
            name='speech_attitude',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uid', models.CharField(max_length=20)),
                ('textid', models.CharField(max_length=20)),
                ('att', models.CharField(max_length=20)),
            ],
        ),
    ]
