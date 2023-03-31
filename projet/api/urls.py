from django.urls import path
from . import views
from .views import Login, Signup


urlpatterns = [
    path('', views.getRoutes),
    path('signup/', Signup, name='signup'),
    path('login/', Login, name='login'),

]
