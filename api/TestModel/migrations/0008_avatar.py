# Generated by Django 3.2.5 on 2021-07-29 22:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('TestModel', '0007_speech_attitude'),
    ]

    operations = [
        migrations.CreateModel(
            name='Avatar',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='auth.user')),
                ('avatar', models.ImageField(upload_to='', verbose_name='头像')),
            ],
        ),
    ]
