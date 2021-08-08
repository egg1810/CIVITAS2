# Generated by Django 3.2.5 on 2021-08-08 00:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('SkillModel', '0015_auto_20210803_0955'),
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
                ('subid', models.SmallIntegerField(primary_key=True, serialize=False, verbose_name='大类下的小类id')),
                ('name', models.CharField(max_length=20, verbose_name='小类名称')),
                ('sub', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SkillModel.bigskill', verbose_name='所属大类')),
            ],
        ),
        migrations.RemoveField(
            model_name='cutting',
            name='user',
        ),
        migrations.RemoveField(
            model_name='farming',
            name='user',
        ),
        migrations.RemoveField(
            model_name='husbandry',
            name='user',
        ),
        migrations.RemoveField(
            model_name='processing',
            name='user',
        ),
        migrations.RemoveField(
            model_name='social',
            name='user',
        ),
        migrations.RemoveField(
            model_name='vehicle',
            name='user',
        ),
        migrations.RemoveField(
            model_name='userskill',
            name='construct',
        ),
        migrations.RemoveField(
            model_name='userskill',
            name='cutting',
        ),
        migrations.RemoveField(
            model_name='userskill',
            name='farming',
        ),
        migrations.RemoveField(
            model_name='userskill',
            name='husbandry',
        ),
        migrations.RemoveField(
            model_name='userskill',
            name='processing',
        ),
        migrations.RemoveField(
            model_name='userskill',
            name='social',
        ),
        migrations.RemoveField(
            model_name='userskill',
            name='vehicle',
        ),
        migrations.AddField(
            model_name='userskill',
            name='big_level',
            field=models.SmallIntegerField(choices=[(1, '学徒'), (2, '匠人'), (3, '匠师'), (4, '专家'), (5, '大师'), (6, '宗师'), (7, '大宗师')], default=1, verbose_name='大类技能等级'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userskill',
            name='big_skillnum',
            field=models.FloatField(default=1, verbose_name='大类技能点'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userskill',
            name='small_skillnum',
            field=models.FloatField(default=1, verbose_name='小类技能点'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='userskill',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='construct',
        ),
        migrations.DeleteModel(
            name='cutting',
        ),
        migrations.DeleteModel(
            name='farming',
        ),
        migrations.DeleteModel(
            name='husbandry',
        ),
        migrations.DeleteModel(
            name='processing',
        ),
        migrations.DeleteModel(
            name='social',
        ),
        migrations.DeleteModel(
            name='vehicle',
        ),
        migrations.AddField(
            model_name='userskill',
            name='big_skill',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='SkillModel.bigskill', verbose_name='大类技能'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userskill',
            name='small_skill',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='SkillModel.smallskill', verbose_name='小类技能'),
            preserve_default=False,
        ),
    ]
