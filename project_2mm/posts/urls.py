from rest_framework.routers import SimpleRouter, DefaultRouter
from django.urls import path, include
from .views import PostViewSet,CommentViewSet, GroupPostView, GroupPostDetailView
from . import views
post_router = DefaultRouter()
post_router.register('posts', PostViewSet,basename='post')

album_router =  DefaultRouter()
album_router.register('album', views.AlbumViewSet, basename='album')

comment_router = DefaultRouter()
comment_router.register('comments',CommentViewSet,basename='comment')

urlpatterns = [
    #path('', include(post_router.urls)),
    #path('posts/<int:post_id>/',include(comment_router.urls)), 두 경로는 아래 group/../ 그룹별 상세 경로로 대체 
    path('', include(album_router.urls)), # 앨범경로 
    path('album/<int:post_id>/', views.DownloadView.as_view({'get': 'download'}), name='download_image'),

    # 모임별 게시글
    path('group/<uuid:group_code>/posts/', views.GroupPostView.as_view(), name='post_list'),
    path('group/<uuid:code>/posts/<int:post_id>/', views.GroupPostDetailView.as_view(), name='post_detail'),

    # 모임별 일정 
    path('group/<uuid:group_code>/plans/', views.GroupPlanView.as_view(), name='plan_list'),
    path('group/<uuid:code>/plans/<int:plan_id>/', views.GroupPlanDetailView.as_view(), name='plan_detail'),
]
