from rest_framework import serializers
from django.contrib.auth import get_user_model


class LoginSerializer(serializers.Serializer):
    username = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)

    def validate(self, attrs: dict):
        username = attrs.get("username")
        password = attrs.get("password")
        user = get_user_model().objects.filter(username=username).first()
        
        if user is None or not user.check_password(password):
            raise serializers.ValidationError("Invalid username or password")
        
        return attrs





    # def validate(self, attrs: dict):
    #     token = attrs.get("token")
    #     refresh = attrs.get("refresh")
        
    #     if not token or not refresh:
    #         raise serializers.ValidationError("Both token and refresh are required")
        
    #     return attrs
