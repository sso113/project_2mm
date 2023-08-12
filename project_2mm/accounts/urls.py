from django.urls import path, include
from rest_framework.routers import SimpleRouter, DefaultRouter
from . import views
from posts.views import PostViewSet, GroupPostDetailView
urlpatterns = [
    #로그인 
    path('api/login/', views.Loginview.as_view(), name='phone_login_view'),
    path('api/logout/', views.LogoutView.as_view(), name='phone_logout_view'),
    #회원가입 
    # path('username/', views.UsernameView.as_view(), name='username-view'),
    # path('phonenumber/', views.PhoneNumberView.as_view(), name='phone-number-view'),
    # path('password/', views.PasswordView.as_view(), name='password-view'),
    path('signup/', views.SingupView.as_view(), name='signup'),

    path('group/', views.GroupListCreateView.as_view(), name='group-list-create'),
    path('group/<uuid:code>/', views.GroupDetailView.as_view(), name='group-detail'),
    # 특정 그룹의 게시글 작성 
    path('group/<uuid:code>/posts/', PostViewSet.as_view({'get': 'list'}), name='group-post-create'), 
    path('group/<uuid:code>/posts/<int:post_id>/', GroupPostDetailView.as_view(), name='group-post-detail'),
]
