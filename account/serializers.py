from rest_framework import serializers
from .models import *

class FollowSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='follow.id')
    username = serializers.ReadOnlyField(source='follow.username')
    nickname = serializers.ReadOnlyField(source='follow.profile.nickname')
    image = serializers.ReadOnlyField(source='follow.profile.image.url')
    class Meta:
        model = Follow
        fields = ('id', 'username', 'nickname', 'image')