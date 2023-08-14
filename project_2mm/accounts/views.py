from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet, ViewSet
from rest_framework import viewsets, generics
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login , logout
from .serializers import UsernameSerializer
from . import serializers
from phonenumber_field.modelfields import PhoneNumber
from posts.models import UserInfo
from posts import models
from rest_framework.decorators import action
from rest_framework.decorators import api_view
import uuid


User = get_user_model()

#로그인 
class Loginview(APIView):
    def post(self, request, *args, **kwargs):
        phone = request.data.get('phone')
        password = request.data.get('password')
        try:
            user_info = UserInfo.objects.get(phone=phone)
            print(phone)
            user = authenticate(request, username=user_info.user, password=password)

            if user is not None:
                print(user)
                login(request, user)
                #토큰 생성 
                token, created = Token.objects.get_or_create(user=user)
                
                # 디버그 확인용 : 로그인 유저 
                if request.user.is_authenticated:
                    print(request.user, "님이 로그인되었습니다:", token.key)
                else:
                    print("현재 로그인되어 있지 않습니다.")

                return Response({ 'token': token.key}, status=status.HTTP_200_OK)
            else:
                print(user)
                print('뭐1')
                return Response({'error': '로그인실패! 다시 시도'}, status=status.HTTP_401_UNAUTHORIZED)
        except UserInfo.DoesNotExist:
            print('뭐2')
            return Response({'error': 'userinfo가 비어있음!'}, status=status.HTTP_404_NOT_FOUND)

#로그아웃 
class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        user = request.user
        logout(request)
        #디버그 확인 :로그아웃
        if user.is_authenticated:
            print(user,"님이 로그아웃:" )
        else:
            print("현재 로그인되어 있지 않습니다.")
        return Response({'message': '로그아웃'}, status=status.HTTP_200_OK)

#회원가입
class SingupView(APIView):
    # def get(self, request):
    #     queryset = models.User.objects.all()
    #     serializer = serializers.UsersSerializer(queryset, many=True)  # queryset은 여러 개의 유저를 포함할 수 있으므로 many=True 옵션 사용
    #     return Response(serializer.data)    

    def post(self, request):
        # 여기서 받은 사용자 이름으로 일단 create user 하고 나머지 정보는 patch로 수정하는 식으로 
        serializer = UsernameSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            #self.request.session['username'] = username
            user = User.objects.create_user(username=username)
            user_info = UserInfo.objects.create(user=user)
            if user is not None :
                print("유저 생성됐다")
            if user_info is not None :
                print("유저 정보 생성됐다.")
            token, created = Token.objects.get_or_create(user=user)
            response_data = {'token': token.key, 'is_successful': True}
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            response_data = {'errors': serializer.errors, 'is_successful': False}
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, format=None):
        try:
            user_info = UserInfo.objects.get(user=request.user)
            print('입력받은 데이터는 ')
            print(request.data)

            serializer = serializers.UsersSerializer(user_info, data=request.data, partial=True)
            if serializer.is_valid():
                #print(serializer.error)
                serializer.update(user_info, serializer.validated_data)  # update 메서드 호출
                print('업데이트 됐음')
                serializer.save() 
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except UserInfo.DoesNotExist:
            return Response({'detail': 'User info not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PasswordView(APIView):
    def patch(self, request):
        serializer = serializers.PasswordSerializer(data=request.data)
        if serializer.is_valid():
            password = serializer.validated_data.get('password')
            user = request.user
            user.set_password(password)
            user.save()
            return Response({'message': '비밀번호가 업데이트되었습니다.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GroupListCreateView(generics.CreateAPIView):
    queryset = models.Group.objects.all()
    serializer_class = serializers.GroupCreateSerializer
    
    def perform_create(self, serializer):
        user = self.request.user
        userinfo = user.userinfo
        
        group = serializer.save()
        group.code = uuid.uuid4()
        group.save()
        
        group.user.add(userinfo)

class GroupDetailView(APIView):
    def get_object(self, code):
        try:
            return models.Group.objects.get(code=code)
        except models.Group.DoesNotExist:
            return None

    def get(self, request, code):
        queryset = self.get_object(code)
        if queryset is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = serializers.GroupSerializer(queryset)
        
        # 로그인한 사용자 가져오기 
        group = models.Group.objects.get(user=request.code)
        user = get_object_or_404(models.UserInfo, user=request.user)
        for user in group.user :
            if group.user.code != group.code:
                group.user.add(user)
        return Response(serializer.data)
    
    # put은 나중에 삭제해도 됨 
    def put(self, request, code):
        queryset = self.get_object(code)
        if queryset is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.GroupSerializer(queryset, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def patch(self, request, code, format=None):
        try:
            queryset = models.Group.objects.get(code=code)
            serializer = serializers.GroupSerializer(queryset, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except models.Group.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)