from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response
from rest_framework import status,viewsets
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import  IsAuthenticated
from .models import Post,Comment
from .serializers import PostSerializer,CommentSerializer
from django.http import FileResponse
from django.shortcuts import get_object_or_404
from . import models
from . import serializers

# 게시글
class PostViewSet(viewsets.ModelViewSet):
    #post_list
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    #post_create
    def create(self,request, *args, **kwargs):
        if request.user.is_authenticated:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            writer = request.user #request.user를 writer로 받아오기 
            serializer.save(writer=writer)
            headers = self.get_success_headers(serializer.data) #성공시 헤더로 전달할 값들을 headers에 담기
            return Response(serializer.data,headers=headers)
        else:
            print("이거 뜨면 세션값 못 받고 있는거임 수정해야함.ㅜㅜ")
            return Response(serializer.data,{'error'}, status=status.HTTP_401_UNAUTHORIZED)
    #post_delete (권한 삭제 추가 필요)

# 앨범 
class AlbumViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = serializers.AlbumSerializer


#댓글
class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    #comment_list    
    def get_queryset(self, **kwargs): # Override
        id = self.kwargs['post_id']
        return self.queryset.filter(post=id)
    
    #comment_create
    def create(self,request, *args, **kwargs):
        if request.user.is_authenticated: 
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            
            serializer.save(writer=self.request.user)    
            headers=self.get_success_headers(serializer.data) 
            return Response(serializer.data,headers=headers)
        else:
            print("id값 못 받아오는 중")
            return Response(serializer.data,{'error'},status=status.HTTP_401_UNAUTHORIZED)

class DownloadView(viewsets.ViewSet):
    def download(self, request, post_id):  # download 액션을 지원하는 메서드
        post = get_object_or_404(models.Post, id=post_id)
        image = post.image
        path = image.path
        response = FileResponse(open(path, 'rb'))
        return response


    def list(self, request):  # list 액션을 지원하는 메서드
        return Response({"detail": "This endpoint supports GET only."})
