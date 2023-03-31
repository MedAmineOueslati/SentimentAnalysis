from django.http import JsonResponse
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .serializers import UserAccountSerializer

from .forms import SignupForm

from .models import UserAccount


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/signup',
        '/api/login',
    ]

    return Response(routes)


@api_view(['POST'])
def Signup(request):
    form = SignupForm(request.data)
    if form.is_valid():
        first_name = form.cleaned_data.get('first_name')
        last_name = form.cleaned_data.get('last_name')
        email = form.cleaned_data.get('email')
        password = form.cleaned_data.get('password')
        DateDeNaissance = form.cleaned_data.get('DateDeNaissance')
        user = UserAccount.objects.create_user(first_name=first_name, last_name=last_name,
                                               email=email, password=password, DateDeNaissance=DateDeNaissance)
        return Response(UserAccountSerializer(user).data, status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)


@api_view(['POST'])
def Login(request):
    try:
        user = UserAccount.objects.get(email=request.data.get("email"))
        print(user.password)
        if (not user.check_password(request.data.get("password"))):
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response(UserAccountSerializer(user).data, status=status.HTTP_200_OK)
    except UserAccount.DoesNotExist:
        return Response(status=status.HTTP_400_BAD_REQUEST)
