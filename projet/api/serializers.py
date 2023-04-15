from rest_framework import serializers
from .models import Expert, UserAccount, Post


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = ('first_name', 'last_name', 'email',
                  'DateDeNaissance', 'Sexe')


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("proprietaire", "description", "im", "vd", "nb")


class PostPageSerializer(serializers.Serializer):
    products = PostSerializer(many=True, read_only=True)

    class Meta:
        fields = ('products',)


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("proprietaire", "title", "im", "b",)


class ArticlePageSerializer(serializers.Serializer):
    products = ArticleSerializer(many=True, read_only=True)

    class Meta:
        fields = ('products',)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ("idPost", "idUser", "description",)


class CommentPageSerializer(serializers.Serializer):
    products = CommentSerializer(many=True, read_only=True)

    class Meta:
        fields = ('products',)


class ExpertCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expert
        fields = ("idPost", "idExpert", "description",)


class ExpertCommentPageSerializer(serializers.Serializer):
    products = ExpertCommentSerializer(many=True, read_only=True)

    class Meta:
        fields = ('products',)
