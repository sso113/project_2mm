from rest_framework.routers import SimpleRouter, DefaultRouter
from django.urls import path, include
from .views import PostViewSet,CommentViewSet
from . import views
post_router = DefaultRouter()
post_router.register('posts', PostViewSet,basename='post')

album_router =  DefaultRouter()
album_router.register('album', views.AlbumViewSet, basename='album')

comment_router = DefaultRouter()
comment_router.register('comments',CommentViewSet,basename='comment')

urlpatterns = [
    path('', include(post_router.urls)),
    path('posts/<int:post_id>/',include(comment_router.urls)),
    path('', include(album_router.urls)),
    path('album/<int:post_id>/', views.DownloadView.as_view({'get': 'download'}), name='download_image'),
    #path('album/<int:post_id>/', views.DownloadView.as_view(), name='download_image'),
    #path('album/', views.AlbumAPIView.as_view(), name='album-list'), # 업로드 된 사진 전체
]
