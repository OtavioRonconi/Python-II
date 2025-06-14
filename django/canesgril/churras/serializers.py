# churras/serializers.py

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Evento, Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        # Adicione 'preco' aqui
        fields = ['id', 'nome', 'quantidade', 'unidade', 'tipo', 'preco', 'evento']

class EventoSerializer(serializers.ModelSerializer):
    organizador = serializers.ReadOnlyField(source='organizador.username')
    
    # 1. Adicionamos esta linha para aninhar os itens
    #    many=True: porque um evento pode ter muitos itens.
    #    read_only=True: os itens não serão criados/editados através do endpoint do evento.
    itens = ItemSerializer(many=True, read_only=True)

    class Meta:
        model = Evento
        # 2. Adicione 'itens' à lista de campos
        fields = ['id', 'nome', 'data', 'local', 'organizador', 'itens']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Os campos que a API vai aceitar/retornar
        fields = ['id', 'username', 'password']
        # Configuração extra para o campo de senha
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Este método é chamado ao criar um novo usuário.
        # Ele garante que a senha seja criptografada (hashed) corretamente.
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

