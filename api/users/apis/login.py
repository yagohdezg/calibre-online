# users/apis/login.py
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from drf_spectacular.utils import extend_schema

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer

from .serializers import LoginSerializer


class LoginView(APIView):
    permission_classes = [AllowAny]
    @extend_schema(
        request=LoginSerializer(),
        responses={200: TokenRefreshSerializer},
    )

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        username = serializer.validated_data["username"]
        user = get_user_model().objects.filter(username=username).first()
        token = RefreshToken.for_user(user)

        return Response(
            {
                "refresh": str(token),
                "access": str(token.access_token),
            },
            status=status.HTTP_200_OK
        )
