from django.urls import path

from users.apis.login import LoginView
from users.apis.refresh import RefreshTokenView


urlpatterns = [
    path("login", LoginView.as_view(), name="login"),
    path("refresh", RefreshTokenView.as_view(), name="token_refresh"),
]
