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

# 특정 그룹 게시글 작성 
class PostViewSet(viewsets.ModelViewSet):
    #post_list
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def post(self, request, code):
        data = request.data
        data['group_code'] = code  # 그룹 코드를 요청 데이터에 추가

        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            print('게시글저장')
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

class GroupPostView(views.APIView):
    def get(self, request, group_code):
        try:
            group = models.Group.objects.get(code=group_code)
            posts = Post.objects.filter(group_code=group)
            serializer = serializers.GroupPostSerializer(posts, many=True)
            return Response(serializer.data)
        except models.Group.DoesNotExist:
            return Response({'error': '그룹을 찾을 수 없습니다.'}, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request, group_code):
        if request.user.is_authenticated:
            serializer = serializers.GroupPostSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            user = request.user  # 로그인한 사용자 가져오기

            group = get_object_or_404(models.Group, code=group_code)
            post = serializer.save(writer=user, group_code=group)  # group_code에 해당 그룹 할당

            return Response(serializers.GroupPostSerializer(post).data, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': '인증되지 않은 사용자'}, status=status.HTTP_401_UNAUTHORIZED)

    # delete는 나중에 필요하면 추가
    # def delete(self, request, code, post_id):
    #     pass

#특정 그룹의 특정 게시글 상세 페이지 
class GroupPostDetailView(views.APIView):
    def get(self, request, code, post_id):
        try:
            post = Post.objects.get(group_code__code=code, id=post_id)
            serializer = serializers.GroupPostSerializer(post)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            return Response({'error': '게시글을 찾을 수 없습니다.'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, code, post_id):
        user = request.user  # 현재 로그인한 사용자
        post = get_object_or_404(Post, id=post_id)

        userinfo = user.userinfo
        if post in userinfo.like_posts.all():
            print('이미 좋아요 누름')
            return Response(status=status.HTTP_400_BAD_REQUEST)

        userinfo.like_posts.add(post)

        is_liked = post in userinfo.like_posts.all()

        serializer = serializers.GroupPostSerializer(post)
        data = serializer.data
        data['is_liked'] = is_liked

        return Response(data, status=status.HTTP_201_CREATED)

    def patch(self, request, code, post_id):
        try:
            post = Post.objects.get(group_code__code=code, id=post_id)
            post.userinfo.like_posts.add(post)
            serializer = serializers.GroupPostSerializer(post)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            print('게시글 id 없음')
            return Response(status=status.HTTP_404_NOT_FOUND)

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
    
    # 댓글 수정 
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        
        if request.user == instance.writer: 
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_403_FORBIDDEN)

class DownloadView(viewsets.ViewSet):
    def download(self, request, post_id): 
        post = get_object_or_404(models.Post, id=post_id)
        image = post.image
        path = image.path
        response = FileResponse(open(path, 'rb'))
        return response

    def list(self, request):  
        return Response({"detail": "This endpoint supports GET only."})
