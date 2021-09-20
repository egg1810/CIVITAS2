# Generated by Django 3.2.4 on 2021-09-18 22:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Recipes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='名字')),
                ('Owner', models.IntegerField(db_index=True, verbose_name='拥有者')),
                ('health', models.FloatField(verbose_name='健康度')),
                ('Satiety', models.FloatField(verbose_name='饱食度')),
                ('salty', models.FloatField(verbose_name='咸')),
                ('sweet', models.FloatField(verbose_name='甜')),
                ('bitterness', models.FloatField(verbose_name='苦')),
                ('aroma', models.FloatField(verbose_name='苦')),
            ],
        ),
    ]
