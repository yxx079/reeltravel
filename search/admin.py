from django.contrib import admin

from .models import Movie

# Register your models here.

class ShowMovie(admin.ModelAdmin):
    list_display= ("title", "description",)

admin.site.register(Movie, ShowMovie)