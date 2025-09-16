from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    # return HttpResponse("Hello, Django World!")
    return render(request, 'website/index.html') 

def categories(request):
    return HttpResponse("Hello, Django categories World!")


def contact(request):
    return HttpResponse("Hello, Django contact World!")
