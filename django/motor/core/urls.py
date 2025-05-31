from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('contato', views.contato, name='contato'),
    path('sobre', views.sobre, name='sobre'),
    path('servico', views.servico, name='servico'),
    path('veiculo', views.veiculo, name='veiculo'),
    path('base', views.base, name='base'),
]