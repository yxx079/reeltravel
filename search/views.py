from django.shortcuts import render
from .models import Movie, Review, ReviewPhoto
from django.views.generic import ListView, DetailView
from django.http import QueryDict, HttpResponse

# Create your views here.

class IndexView(ListView):
    model = Movie
    template_name = 'search_index.html'
    queryset=Movie.objects.all()
    context_object_name= 'posts'

def search_index(request):
    return render(request, 'search_index.html', {})

def searchmovies(request):
    if request.method=="POST":
        wordtosearch=request.POST.get('wordtosearch', False)
        sitename = wordtosearch+"- List Search"
        movies = Movie.objects.filter(title__contains=wordtosearch)
        length = movies.count()
        return render(request, 'searchmovies.html', {'wordtosearch':wordtosearch, 'movies':movies, 'length':length, 'sitename':sitename})
    else :
        return render(request, 'searchmovies.html', {})
    
def moviedetails(request):
    query = request.GET.get('q')
    if query:
        movies = Movie.objects.filter(title__icontains=query)
        if movies.exists():
            movie = movies.first()
            reviews = Review.objects.filter(movie=movie)
            review_photos = {}
            for review in reviews:
                review_photos[review.id] = ReviewPhoto.objects.filter(review=review)
            return render(request, 'searchdetails.html', {'movie': movie, 'reviews': reviews, 'review_photos': review_photos})
    return render(request, 'searchdetails.html', {})    

def globe(request):
    return render(request, 'globe.html', {'sitename': 'globe'})

def searchmoviescss(request):
    css_contents="""
        .results{
            margin: 50px;
        }

        .clickable{
            background-color: #1c87c9;
            border: none;
            color: white;
            padding: 20px 34px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 20px;
            margin: 4px 2px;
            cursor: pointer;
        }
        
    """
    response=HttpResponse(css_contents, content_type="text/css")
    return response