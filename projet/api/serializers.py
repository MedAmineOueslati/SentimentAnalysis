from rest_framework import serializers
from .models import Article, Comment, Expert, ExpertComment, UserAccount, Post


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('first_name', 'last_name', 'email',
                  'DateDeNaissance', 'Sexe', "id",)


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("proprietaire", "description", "im", "vd", "nb", "id")


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ("proprietaire", "title", "im", "b", "id",)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("idPost", "idUser", "description",)


class ExpertCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpertComment
        fields = ("idPost", "idExpert", "description",)
