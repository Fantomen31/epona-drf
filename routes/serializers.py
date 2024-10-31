from rest_framework import serializers
from .models import Route, RouteReview
from cities.models import City
from profiles.serializers import ProfileSerializer

class RouteReviewSerializer(serializers.ModelSerializer):
    user = ProfileSerializer(read_only=True)

    class Meta:
        model = RouteReview
        fields = ['id', 'user', 'content', 'review_rating', 'created_at']
        read_only_fields = ['user']

class RouteSerializer(serializers.ModelSerializer):
    creator = ProfileSerializer(read_only=True)
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())
    reviews = RouteReviewSerializer(many=True, read_only=True)
    image = serializers.ImageField(required=False)
    average_review_rating = serializers.SerializerMethodField()
    safety_rating = serializers.ChoiceField(choices=Route.RATING_CHOICES, allow_null=True, required=False)
    difficulty_rating = serializers.ChoiceField(choices=Route.RATING_CHOICES, allow_null=True, required=False)

    class Meta:
        model = Route
        fields = ['id', 'title', 'description', 'distance', 'pace', 'creator', 'city', 'created_at', 'updated_at', 'image', 'safety_rating', 'difficulty_rating', 'reviews', 'average_review_rating']
        read_only_fields = ['creator']

    def get_average_review_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews:
            return sum(review.review_rating for review in reviews if review.review_rating is not None) / len(reviews)
        return None

    def create(self, validated_data):
        city_name = self.context['request'].data.get('city')
        if city_name:
            city, _ = City.objects.get_or_create(name=city_name)
            validated_data['city'] = city
        validated_data['creator'] = self.context['request'].user.profile
        return super().create(validated_data)

    def update(self, instance, validated_data):
        city_name = self.context['request'].data.get('city')
        if city_name:
            city, _ = City.objects.get_or_create(name=city_name)
            validated_data['city'] = city
        return super().update(instance, validated_data)