# churras/serializers.py

from rest_framework import serializers
from .models import Evento

class EventoSerializer(serializers.ModelSerializer):
    # 1. Adicionamos esta linha para customizar o campo 'organizador'
    # Ele será apenas para leitura e mostrará o 'username' em vez do ID.
    organizador = serializers.ReadOnlyField(source='organizador.username')
    
    class Meta:
        model = Evento
        # Definimos os campos do nosso modelo que queremos expor na API
        fields = ['id', 'nome', 'data', 'local', 'organizador']