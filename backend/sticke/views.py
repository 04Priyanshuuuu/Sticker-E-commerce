from django.shortcuts import render

# Create your views here.
def all_sticke(request):
    return render(request, 'sticke/all_sticke.html')