# churras/urls.py

# 1. Adicione 'include' à importação de django.urls
from django.urls import path, include
from django.contrib.auth import views as auth_views
# 2. Importe o DefaultRouter do DRF
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from . import views

# 3. Crie o router
router = DefaultRouter()
# 4. Registre seus ViewSets com o router
router.register(r'eventos', views.EventoViewSet, basename='evento')
router.register(r'itens', views.ItemViewSet, basename='item')

# As URLs da interface web continuam as mesmas
urlpatterns_web = [
    path('', views.index, name='index'),
    path('churrasco/', views.churrasco, name='churrasco'),
    path('cadastro/', views.cadastro_view, name='cadastro'),
    path('login/', auth_views.LoginView.as_view(template_name='churras/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('evento/novo/', views.evento_novo, name='evento_novo'),
    path('evento/<int:evento_id>/editar/', views.evento_editar, name='evento_editar'),
    path('evento/<int:evento_id>/excluir/', views.evento_excluir, name='evento_excluir'),
    path('evento/<int:evento_id>/', views.evento_detalhe, name='evento_detalhe'),
    path('item/<int:item_id>/editar/', views.item_editar, name='item_editar'),
    path('item/<int:item_id>/excluir/', views.item_excluir, name='item_excluir'),
]

# As URLs da API são agora geradas automaticamente pelo router
urlpatterns_api = [
    path('api/', include(router.urls)),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('api/register/', views.UserCreateView.as_view(), name='user_register'),
]

# Juntamos as duas listas de URLs
urlpatterns = urlpatterns_web + urlpatterns_api