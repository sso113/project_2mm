from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Post, Comment
from . import models

class PostSerializer(serializers.ModelSerializer):
    writer = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'
    
    def get_writer(self, obj):
        return obj.writer.user.username if obj.writer else None

class AlbumSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = [ 'id', 'image','created_at' ]

class CommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = [ 'id','post','comment','writer','created_at' ]

class GroupPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['content', 'image']