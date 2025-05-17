from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def contato(request):
    context = {
        'nome': 'MotorWeb',
        'fone': '+55 17 99624-2360',
        'email': 'promptias@promptias.com'
    }
    return render(request, 'contato.html', context)
