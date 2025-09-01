# users/apis/login.py
from typing import Any, Dict
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from drf_spectacular.utils import extend_schema
from django.contrib.auth import get_user_model

from rest_framework_simplejwt.serializers import TokenRefreshSerializer


class RefreshView(APIView):
    permission_classes = [AllowAny]
    @extend_schema(
        request=TokenRefreshSerializer(),
        responses={200: TokenRefreshSerializer},
    )

    def post(self, request):
        serializer = TokenRefreshSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        print(serializer.validated_data)
        return Response(
            serializer.validated_data,
            status=status.HTTP_200_OK
        )
        
 
