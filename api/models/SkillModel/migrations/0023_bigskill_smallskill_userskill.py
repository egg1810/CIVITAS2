# Generated by Django 3.2.5 on 2021-08-08 10:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('SkillModel', '0022_auto_20210808_1010'),
    ]

    operations = [
        migrations.CreateModel(
            name='BigSkill',
            fields=[
                ('id', models.SmallIntegerField(primary_key=True, serialize=False, verbose_name='大类技能id')),
                ('name', models.CharField(max_length=20, verbose_name='大类技能名称')),
            ],
        ),
        migrations.CreateModel(
            name='SmallSkill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subid', models.SmallIntegerField(verbose_name='大类下的小类id')),
                ('name', models.CharField(max_length=20, verbose_name='小类名称')),
                ('sub', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SkillModel.bigskill', verbose_name='所属大类')),
            ],
            options={
                'unique_together': {('sub', 'subid')},
            },
        ),
        migrations.CreateModel(
            name='UserSkill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('big_level', models.SmallIntegerField(blank=True, choices=[(1, '学徒'), (2, '匠人'), (3, '匠师'), (4, '专家'), (5, '大师'), (6, '宗师'), (7, '大宗师')], null=True, verbose_name='大类技能等级')),
                ('big_skillnum', models.FloatField(blank=True, null=True, verbose_name='大类技能点')),
                ('small_skillnum', models.FloatField(blank=True, null=True, verbose_name='小类技能点')),
                ('big_skill', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='SkillModel.bigskill', verbose_name='大类技能')),
                ('small_skill', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='SkillModel.smallskill', verbose_name='小类技能')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'big_skill', 'small_skill')},
            },
        ),
    ]
