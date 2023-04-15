from django.urls import path
from . import views
from .views import Login, Signup, articleViewSet, commentViewSet, expertcommentViewSet, getArticles, getComments, getExpertComments, getExpertFullName, getPosts, getUserFullName, postViewSet
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.getRoutes),
    path('signup/', Signup, name='signup'),
    path('login/', Login, name='login'),
    # path('posts/', getPosts, name='posts'),
    path('posts/', postViewSet.as_view({'get': 'list'}), name='posts'),
    # path('articles/', getArticles, name='articles'),
    path('articles/',
         articleViewSet.as_view({'get': 'list'}), name='articles'),
    # path('Comments/', getComments, name='Comments'),
    path('Comments/',
         commentViewSet.as_view({'get': 'list'}), name='Comments'),
    # path('ExpertComments/', getExpertComments, name='ExpertComments'),
    path('ExpertComments/',
         expertcommentViewSet.as_view({'get': 'list'}), name='ExpertComments'),
    path('UserFullName/', getUserFullName, name='UserFullName'),
    path('ExpertFullName/', getExpertFullName, name='ExpertFullName'),

]
urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)