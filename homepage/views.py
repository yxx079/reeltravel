from django.shortcuts import render


# Create your views here.
def home(request):
    return render(request, 'index.html')


def disclaimer(request):
    return render(request, 'termofuse.html')


def faq(request):
    return render(request, 'faq.html')
