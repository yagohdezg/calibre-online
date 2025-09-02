from rest_framework import status
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.serializers import TokenRefreshSerializer

from drf_spectacular.utils import extend_schema


class RefreshTokenView(APIView):
    permission_classes = [AllowAny]
    @extend_schema(
        request=TokenRefreshSerializer(),
        responses={200: TokenRefreshSerializer}
    )

    def post(self, request: Request) -> Response:
        serializer = TokenRefreshSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)
