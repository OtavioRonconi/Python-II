# No topo, garanta que get_object_or_404 está importado
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from .forms import CustomUserCreationForm, PratoForm
from django.contrib.auth import login, logout
from .models import Prato

def index(request):
    # Sua view index continua a mesma
    pratos_cadastrados = Prato.objects.all()
    dados = {
        'lista_pratos': pratos_cadastrados
    }
    return render(request, 'index.html', dados)

# MODIFICANDO a sua view 'churrasco' existente
def churrasco(request, prato_id):
    # 1. Usamos o prato_id da URL para buscar um único prato.
    #    Se não encontrar, o Django mostrará um erro de Página Não Encontrada.
    prato_especifico = get_object_or_404(Prato, pk=prato_id)

    # 2. Preparamos os dados para enviar ao template.
    #    Vamos chamar a variável de 'prato' para ficar simples.
    dados = {
        'prato': prato_especifico
    }

    # 3. Renderizamos o seu template original 'churrasco.html' com os dados do prato.
    return render(request, 'churrasco.html', dados)

@login_required(login_url='/login/') # 1. Protege a view
def cadastrar_prato(request):
    if request.method == 'POST':
        # 2. Passa os dados do POST para o formulário
        # request.FILES é necessário para o upload de imagens
        form = PratoForm(request.POST, request.FILES) 
        if form.is_valid():
            # 3. Não salva no banco ainda, apenas cria o objeto em memória
            prato = form.save(commit=False)
            # 4. Associa o usuário logado ao prato
            prato.pessoa = request.user
            # 5. Agora sim, salva o prato no banco de dados
            prato.save()
            # 6. Redireciona para a página de detalhes do prato recém-criado
            return redirect('receita', prato_id=prato.id)
    else:
        # Se a requisição for GET, apenas exibe um formulário em branco
        form = PratoForm()
    
    return render(request, 'pratos/cadastrar_prato.html', {'form': form})

# NOVA VIEW DE CADASTRO
def cadastro(request):
    if request.method == 'POST':
        # Use o nosso formulário customizado aqui
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('index')
    else:
        # E aqui também
        form = CustomUserCreationForm()
    
    return render(request, 'usuarios/cadastro.html', {'form': form})

# NOVA VIEW DE LOGIN
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            # Se o formulário é válido, faz o login do usuário
            user = form.get_user()
            login(request, user)
            return redirect('index')
    else:
        form = AuthenticationForm()
    
    return render(request, 'usuarios/login.html', {'form': form})

# NOVA VIEW DE LOGOUT
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect('index')