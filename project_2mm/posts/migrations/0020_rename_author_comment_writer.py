# Generated by Django 4.2.1 on 2023-08-11 06:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0019_comment'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='author',
            new_name='writer',
        ),
    ]