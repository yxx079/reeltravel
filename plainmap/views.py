
from search.models import Location, Movie, MoviePhoto
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import TravelMarker
from django.views.decorators.csrf import csrf_exempt

def map(request):
    return render(request, 'map.html')
def foot(request):
    return  render(request,"footprint.html")

def get_movies(request):
    # 获取所有电影和相关的拍摄地点
    movies = Movie.objects.all()
    movie_photos = MoviePhoto.objects.all()
    locations = Location.objects.all()
    print(movies)
    print(movie_photos)
    print(locations)

    # 将数据序列化为 JSON 格式
    data = {
        'movies': [
            {
                'id': movie.id,
                'title': movie.title,
                'description': movie.description,
                'photo_urls': [photo.image.url for photo in movie_photos.filter(movie=movie)],
                'location_ids': [location.id for location in movie.locations.all()]
            }
            for movie in movies
        ],
        'locations': [
            {
                'id': location.id,
                'name': location.name,
                'coordinates': location.coordinates,
            }
            for location in locations
        ],
    }
    print(data)
    # 将数据作为 JSON 响应发送回前端
    return JsonResponse(data)



@login_required
def map_view(request):
    user_locations = TravelMarker.objects.filter(user=request.user)
    return render(request, 'footprint.html', {'locations': user_locations})

@csrf_exempt
@login_required
def save_location(request):
    if request.method == 'POST':
        try:
            latitude = float(request.POST['latitude'])
            longitude = float(request.POST['longitude'])
            tag = request.POST['tag']
            new_location = Location(user=request.user, latitude=latitude, longitude=longitude, tag=tag)
            new_location.save()
            return JsonResponse({'status': 'success'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})