from django.contrib.auth import views as auth_views
from django.urls import path
from . import views

urlpatterns = [
    # Rota da página inicial (lista de eventos)
    path('', views.index, name='index'),

    # URLs da API
    path('eventos/', views.EventoListCreateAPIView.as_view(), name='evento-api-list'),
    
    # 2. Adicione a nova URL para os detalhes do evento
    # <int:pk> captura o ID do evento da URL
    path('eventos/<int:pk>/', views.EventoDetailAPIView.as_view(), name='evento-api-detail'),

    # NOVA ROTA para o cadastro
    path('cadastro/', views.cadastro_view, name='cadastro'),

    # NOVA ROTA de Login
    path('login/', auth_views.LoginView.as_view(template_name='churras/login.html'), name='login'),

    # NOVA ROTA de Logout
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),

    # NOVA ROTA para criar um evento
    path('evento/novo/', views.evento_novo, name='evento_novo'), 

    # NOVA ROTA para editar um evento
    path('evento/<int:evento_id>/editar/', views.evento_editar, name='evento_editar'), 

    # NOVA ROTA para excluir um evento
    path('evento/<int:evento_id>/excluir/', views.evento_excluir, name='evento_excluir'),

    # NOVA ROTA: para os detalhes do evento
    # <int:evento_id> captura um número da URL e o passa para a view
    path('evento/<int:evento_id>/', views.evento_detalhe, name='evento_detalhe'),

    # NOVA ROTA para editar um item
    path('item/<int:item_id>/editar/', views.item_editar, name='item_editar'),

    # NOVA ROTA para excluir um item
    path('item/<int:item_id>/excluir/', views.item_excluir, name='item_excluir'),
]