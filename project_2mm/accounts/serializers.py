from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from phonenumber_field.modelfields import PhoneNumberField
from posts import models

class UsernameSerializer(serializers.Serializer):
    username = serializers.CharField()
    class Meta:
        model = models.User
        fields = '__all__'
    def update(self, instance, validated_data):
        # 코드 값을 무시하고 업데이트할 필드만 validated_data에서 추출합니다.
        validated_data.pop('username', None)
        return super().update(instance, validated_data)
    


class UsersSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = models.UserInfo
        fields = '__all__'

    def update(self, instance, validated_data):
        # 전화번호 업데이트
        if 'phone' in validated_data:
            instance.phone = validated_data['phone']

        # # 비밀번호 업데이트 / usersSerializer에서는 user와 phone필드만 업데이트하게 주석처리해두었어요
        # user = instance.user
        # if 'password' in validated_data:
        #     print("Debug: Password field found in validated_data")
        #     new_password = validated_data['password']['password']
        #     user.set_password(new_password) 
        #     user.save()

        instance.save()
        return instance
#비밀번호 업데이트를 위해서 시리얼라이저 추가.. 
class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField()

# 모임코드생성 
class GroupSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = models.Group
        fields = ['name','info', 'profile', 'username', 'code']
    def update(self, instance, validated_data):
        # 코드 값을 무시하고 업데이트할 필드만 validated_data에서 추출합니다.
        validated_data.pop('code', None)
        return super().update(instance, validated_data)