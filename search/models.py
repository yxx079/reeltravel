from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import User


class Genre(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Actor(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Director(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Location(models.Model):
    name = models.CharField(max_length=255)
    coordinates = models.TextField(default=None, blank=True)
    #coordinates = models.TextField()
    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    release_date = models.DateField()
    genres = models.ManyToManyField(Genre)
    actors = models.ManyToManyField(Actor)
    director = models.ManyToManyField(Director)
    locations = models.ManyToManyField(Location)

    class Meta:
        ordering=('title',)
        verbose_name_plural="movies"

    def __str__(self):
        return self.title


class MoviePhoto(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='movie_photos/')

    def __str__(self):
        return f"Photo for location {self.movie.title}"


class LocationPhoto(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='location_photos/')

    def __str__(self):
        return f"Photo for location {self.location.name}"


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    age = models.IntegerField()
    profile_picture = models.ImageField(upload_to='users/', default='default.png')

    def __str__(self):
        return self.user.username


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    text = models.TextField()
    rating = models.IntegerField()

    def __str__(self):
        return self.text


class ReviewPhoto(models.Model):
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='review_photos/')

    def __str__(self):
        return f"Photo for review {self.review.id}"
