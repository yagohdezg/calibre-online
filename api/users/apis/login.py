from rest_framework import status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer

from django.contrib.auth import get_user_model

from drf_spectacular.utils import extend_schema

from .serializers import LoginSerializer


class LoginView(APIView):
    permission_classes = [AllowAny]
    @extend_schema(
        request=LoginSerializer(),
        responses={200: TokenRefreshSerializer}
    )

    def post(self, request: Request) -> Response:
        serializer = LoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        username = serializer.validated_data["username"]
        user = get_user_model().objects.get(username=username)

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
            status=status.HTTP_200_OK,
        )
