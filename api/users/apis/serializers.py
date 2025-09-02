from typing import Dict

from rest_framework import serializers
from django.contrib.auth import get_user_model


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data: Dict):
        username = data.get("username")
        password = data.get("password")

        user = get_user_model().objects.filter(username=username).first()
        if user is None or not user.check_password(password):
            raise serializers.ValidationError("Invalid username or password.")
        
        return data

