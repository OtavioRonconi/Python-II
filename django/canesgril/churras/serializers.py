# churras/serializers.py

from rest_framework import serializers
from .models import Evento, Item

class EventoSerializer(serializers.ModelSerializer):
    # 1. Adicionamos esta linha para customizar o campo 'organizador'
    # Ele será apenas para leitura e mostrará o 'username' em vez do ID.
    organizador = serializers.ReadOnlyField(source='organizador.username')

    class Meta:
        model = Evento
        # Definimos os campos do nosso modelo que queremos expor na API
        fields = ['id', 'nome', 'data', 'local', 'organizador']

# CRIE ESTA NOVA CLASSE
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        # Incluímos todos os campos que queremos na API
        fields = ['id', 'evento', 'nome', 'quantidade', 'unidade', 'tipo']
