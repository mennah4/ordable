from django.shortcuts import render
from user.models import Role
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import RoleSerializer, UserRegistrationSerializer, UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['email'] = user.email
        serializer = RoleSerializer(user.roles, many=False)
        token['roles'] = serializer.data

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CustomerRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        
        request.data['roles'] = Role.objects.get(name=request.data['roles']).id
        serializer = UserRegistrationSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            user = serializer.save()
            # Generate token
            refresh = RefreshToken.for_user(user)
            token = str(refresh.access_token)
            response_data = {
                'access': token,
                'refresh': str(refresh),
                'customer': {
                    'user_id': user.id,
                    'email': user.email,
                    'roles': {
                        'id': user.roles.id,
                        'name': user.roles.name
                    }
                }
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUserRoles(APIView):
    def get(self, request):
        roles = Role.objects.all()
        serializer = RoleSerializer(roles, many=True)
        return Response(serializer.data)