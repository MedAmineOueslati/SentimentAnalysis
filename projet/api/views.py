from django.http import JsonResponse
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.paginator import Paginator
from django.core import serializers
from rest_framework import viewsets


from .serializers import ArticleSerializer, CommentSerializer, ExpertCommentSerializer, PostSerializer, UserAccountSerializer

from .forms import SignupForm

from .models import Comment, ExpertComment, UserAccount, Article
from .models import Post


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/signup',
        '/api/login',
        '/api/posts',
        '/api/articles',
        '/api/Comments',
        '/api/ExpertComments',
    ]

    return Response(routes)


@api_view(['POST'])
def Signup(request):
    form = SignupForm(request.data)
    if form.is_valid():
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get('last_name')
        email = form.cleaned_data.get('email')
        Sexe = form.cleaned_data.get('Sexe')
        password = form.cleaned_data.get('password')
        DateDeNaissance = form.cleaned_data.get('DateDeNaissance')
        user = UserAccount.objects.create_user(first_name=first_name, last_name=last_name,
                                               email=email, password=password, DateDeNaissance=DateDeNaissance, Sexe=Sexe)
        return Response(UserAccountSerializer(user).data, status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
def Login(request):
    try:
        user = UserAccount.objects.get(email=request.data.get("email"))
        if (not user.check_password(request.data.get("password"))):
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response(UserAccountSerializer(user).data, status=status.HTTP_200_OK)
    except UserAccount.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getUserFullName(request):
    try:
        user = UserAccount.objects.get(id=request.data.get("id"))
        return Response(user.get_full_name(), status=status.HTTP_200_OK)
    except UserAccount.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getExpertFullName(request):
    try:
        Expert = UserAccount.objects.get(id=request.data.get("id"))
        return Response(Expert.get_full_name(), status=status.HTTP_200_OK)
    except UserAccount.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)


class postViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class articleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class commentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class expertcommentViewSet(viewsets.ModelViewSet):
    queryset = ExpertComment.objects.all()
    serializer_class = ExpertCommentSerializer
