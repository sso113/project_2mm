# Generated by Django 4.2.4 on 2023-08-10 16:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0017_merge_20230811_0103'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='album',
            name='test',
        ),
        migrations.RemoveField(
            model_name='album',
            name='writer',
        ),
    ]