from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import EventoSerializer
from .models import Evento, Item
from .forms import ItemForm, EventoForm, SignUpForm

def index(request):
    """Renderiza a página inicial."""
    # 2. Busque todos os objetos Evento no banco de dados
    eventos_lista = Evento.objects.all().order_by('-data') 

    # 3. Crie um "contexto" para enviar os dados para o template
    context = {
        'eventos': eventos_lista,
    }

    # 4. Renderize o template, passando o contexto com os dados
    return render(request, 'churras/index.html', context)

# NOVA VIEW
@login_required
def evento_detalhe(request, evento_id):
    """Exibe os detalhes de um evento e processa o form de novos itens."""
    evento = get_object_or_404(Evento, pk=evento_id)
    
    # Lógica para o formulário
    if request.method == 'POST':
        form = ItemForm(request.POST)
        if form.is_valid():
            # Não salva no banco ainda, apenas cria o objeto em memória
            novo_item = form.save(commit=False) 
            # Associa o item ao evento da página atual
            novo_item.evento = evento 
            # Agora sim, salva o objeto completo no banco de dados
            novo_item.save() 
            # Redireciona para a mesma página para evitar reenvio do form
            return redirect('evento_detalhe', evento_id=evento_id) 
    else:
        # Se for um GET, apenas cria um formulário em branco
        form = ItemForm()

    context = {
        'evento': evento,
        'form': form, # Adiciona o formulário ao contexto
    }
    
    return render(request, 'churras/evento_detalhe.html', context)

@login_required
def item_editar(request, item_id):
    """Processa a edição de um item existente."""
    item = get_object_or_404(Item, pk=item_id)
    
    if request.method == 'POST':
        # Passamos 'instance=item' para que o form atualize o item existente
        form = ItemForm(request.POST, instance=item)
        if form.is_valid():
            form.save()
            # Redireciona de volta para a página de detalhes do evento ao qual o item pertence
            return redirect('evento_detalhe', evento_id=item.evento.id)
    else:
        # Se for GET, cria o form preenchido com os dados do item existente
        form = ItemForm(instance=item)

    context = {
        'form': form,
        'item': item
    }
    return render(request, 'churras/item_editar.html', context)

@login_required
def item_excluir(request, item_id):
    """Processa a exclusão de um item."""
    item = get_object_or_404(Item, pk=item_id)
    
    # Se o formulário de confirmação foi enviado
    if request.method == 'POST':
        # Guardamos o ID do evento para saber para onde voltar
        evento_id = item.evento.id
        # Deleta o item do banco de dados
        item.delete()
        # Redireciona para a página de detalhes do evento
        return redirect('evento_detalhe', evento_id=evento_id)

    # Se for um GET, apenas mostra a página de confirmação
    context = {
        'item': item
    }
    return render(request, 'churras/item_confirmar_exclusao.html', context)

@login_required
def evento_novo(request):
    """Processa a criação de um novo evento."""
    if request.method == 'POST':
        form = EventoForm(request.POST)
        if form.is_valid():
            # Usa commit=False para criar o objeto em memória
            novo_evento = form.save(commit=False)
            # Define o organizador como o usuário logado
            novo_evento.organizador = request.user
            # Agora salva o objeto completo no banco
            novo_evento.save()
            return redirect('index') 
    else:
        form = EventoForm()

    context = {
        'form': form,
        'titulo': 'Planejar Novo Churrasco' # Adicione esta linha
    }
    return render(request, 'churras/evento_form.html', context)

@login_required
def evento_editar(request, evento_id):
    """Processa a edição de um evento existente."""
    evento = get_object_or_404(Evento, pk=evento_id)
    
    if request.method == 'POST':
        form = EventoForm(request.POST, instance=evento)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = EventoForm(instance=evento)

    context = {
        'form': form,
        # Passaremos o título para a página saber que estamos editando
        'titulo': f'Editar Evento: {evento.nome}' 
    }
    return render(request, 'churras/evento_form.html', context)

@login_required
def evento_excluir(request, evento_id):
    """Processa a exclusão de um evento."""
    evento = get_object_or_404(Evento, pk=evento_id)
    
    if request.method == 'POST':
        evento.delete()
        return redirect('index')

    context = {
        'evento': evento
    }
    return render(request, 'churras/evento_confirmar_exclusao.html', context)

def cadastro_view(request):
    """Processa o cadastro de novos usuários."""
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save() # Salva o novo usuário no banco
            login(request, user) # Loga o usuário automaticamente
            return redirect('index') # Redireciona para a home
    else:
        form = SignUpForm()
    
    context = {
        'form': form,
        'titulo': 'Cadastre-se'
    }
    # Podemos reutilizar nosso template de formulário!
    return render(request, 'churras/evento_form.html', context)

class EventoListCreateAPIView(ListCreateAPIView):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer
    # 2. Adicione esta linha para proteger a view
    permission_classes = [IsAuthenticated]

    # Adicione este método à classe
    def perform_create(self, serializer):
        # Esta linha diz ao serializer para, ao salvar,
        # passar este dado extra: o campo 'organizador'
        # deve ser preenchido com o usuário que fez a requisição.
        serializer.save(organizador=self.request.user)

class EventoDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer
    # 3. Adicione esta linha aqui também
    permission_classes = [IsAuthenticated]
