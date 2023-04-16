from django.urls import include, path
from . import views
from .views import Login, Signup, articleViewSet, commentViewSet, expertcommentViewSet, getExpertFullName, getUserFullName, postViewSet
from django.conf import settings
from rest_framework.routers import DefaultRouter
from api.views import articleViewSet, postViewSet

router = DefaultRouter()
router.register('articles', articleViewSet, basename='articles')
router.register('posts', postViewSet, basename='posts')
router.register('Comments', commentViewSet, basename='Comments')
router.register('ExpertComments', expertcommentViewSet,
                basename='ExpertComments')

urlpatterns = [
    path('', views.getRoutes),
    path('', include(router.urls)),
    path('signup/', Signup, name='signup'),
    path('login/', Login, name='login'),
    path('UserFullName/', getUserFullName, name='UserFullName'),
    path('ExpertFullName/', getExpertFullName, name='ExpertFullName'),

]
