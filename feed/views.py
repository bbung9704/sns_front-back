from django.shortcuts import render

from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Feed, FeedImage
from .serializers import FeedSerializer

class FeedView(APIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    # Serializer로 validate check하게 바꾸기
    def post(self, request):
        user = request.user
        body = request.data['body']
        img_list = request.FILES.getlist('image')

        feed = Feed(user=user, body=body)
        feed.save()

        for img in img_list:
            image = FeedImage(feed=feed, image=img)
            image.save()

        return Response({
            "id": feed.id,
            "username": feed.user.username,
            "nickname": feed.user.profile.nickname,
            "body": feed.body,
            "created_at": feed.created_at
        })

    def get(self, request):
        user = request.user
        follows = user.user_follow.all()
        queryset = Feed.objects.none()

        for follow in follows:
            follow = follow.follow
            queryset = queryset | follow.user_feed.all()

        queryset = queryset.order_by('-created_at')
        serializer = FeedSerializer(queryset, many=True)

        return Response(serializer.data)