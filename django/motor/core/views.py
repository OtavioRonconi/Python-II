from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'index.html')

def contato(request):
    context = {
        'nome' : 'MotorWeb',
        'fone' : '17-7070-6070',
        'email' : 'motorweb@teste.com',
    }
    return render(request, 'contato.html', context)
