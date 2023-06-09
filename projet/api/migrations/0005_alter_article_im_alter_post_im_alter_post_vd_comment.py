# Generated by Django 4.1.6 on 2023-04-14 14:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_expert_sexe_alter_useraccount_sexe_post_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='im',
            field=models.FileField(blank=True, null=True, upload_to='public'),
        ),
        migrations.AlterField(
            model_name='post',
            name='im',
            field=models.FileField(blank=True, null=True, upload_to='public'),
        ),
        migrations.AlterField(
            model_name='post',
            name='vd',
            field=models.FileField(blank=True, null=True, upload_to='public'),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('idPost', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.post')),
                ('idUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.useraccount')),
            ],
        ),
    ]
