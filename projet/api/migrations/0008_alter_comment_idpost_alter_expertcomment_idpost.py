# Generated by Django 4.1.6 on 2023-04-17 15:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_remove_post_nb_post_bc_post_bv_postverifie_postsupp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='idPost',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.postverifie'),
        ),
        migrations.AlterField(
            model_name='expertcomment',
            name='idPost',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.postverifie'),
        ),
    ]
