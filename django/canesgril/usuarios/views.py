from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import auth
from django.shortcuts import get_object_or_404, redirect, render
from churras.models import Prato
from django.contrib import auth, messages
from django.core.paginator import Paginator

def cadastro(request):
    if request.method == 'POST':
        nome = request.POST['nome'] 
        email = request.POST['email'] 
        senha = request.POST['password']
        senha2 = request.POST['password2'] 
        if not nome.strip():
            print('O campo nome não pode ficar em branco') 
            return redirect('cadastro')
        if not email.strip():
            print('O campo email não pode ficar em branco') 
            return redirect('cadastro')
        if senha != senha2:
            #print('As senhas não são iguais')
            messages.error(request,'As senhas não são iguais' ) 
            return redirect('cadastro')
        if User.objects.filter(email=email).exists(): 
            #print('Usuário já cadastrado.')
            messages.error(request,'Usuário já cadastrado.' ) 
            return redirect('cadastro')
        user = User.objects.create_user(username=nome, email=email, password=senha)
        user.save()
        #print('Usuário cadastrado com sucesso')
        messages.success(request,'Usuário cadastrado com sucesso') 
        return redirect('login')
    else:
        return render(request, 'cadastro.html')

def login(request):
    pass

def dashboard(request):
    pass

def logout(request):
    pass

def cria_prato(request):
    pass

def deleta_prato(request):
    pass

def edita_prato(request):
    pass

def atualiza_prato(request):
    pass
