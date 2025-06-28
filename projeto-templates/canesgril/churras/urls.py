from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'), 

    # MANTEMOS O CAMINHO 'churrasco/', mas agora ele aceita um ID.
    # O nome da URL também continua 'churrasco'.
    path('churrasco/<int:prato_id>/', views.churrasco, name='churrasco'),
    path('cadastrar-prato/', views.cadastrar_prato, name='cadastrar_prato'),

    # NOVAS URLS PARA AUTENTICAÇÃO
    path('cadastro/', views.cadastro, name='cadastro'),
    path('login/', views.login_view, name='login'), # URL de Login
    path('logout/', views.logout_view, name='logout'), # URL de Logout
]