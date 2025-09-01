from django.urls import path

from users.apis.login import LoginView
from users.apis.refresh import RefreshView


urlpatterns = [
    path("login", LoginView.as_view(), name="login"),
    path("token/refresh", RefreshView.as_view(), name="token_refresh"),
]
