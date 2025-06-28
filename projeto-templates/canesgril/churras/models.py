from django.db import models
from datetime import date
from django.contrib.auth.models import User

class Prato(models.Model):

    pessoa = models.ForeignKey(User, on_delete=models.CASCADE)

    nome_prato = models.CharField(max_length=100)
    ingredientes = models.TextField()
    modo_preparo = models.TextField() # Alterado para TextField, ideal para textos longos
    tempo_preparo = models.IntegerField()
    rendimento = models.CharField(max_length=100) # Aumentei o max_length por segurança
    categoria = models.CharField(max_length=100)
    
    # Corrigido: Usamos 'default=date.today' para que o Django preencha a data
    # automaticamente no momento da criação do prato.
    date_prato = models.DateField(default=date.today, blank=True)

    foto_prato = models.ImageField(upload_to='fotos_pratos/%Y/%m/%d/', blank=True)

    # É uma boa prática adicionar este método para dar uma representação legível
    # ao objeto no painel de admin e em outros locais.
    def __str__(self):
        return self.nome_prato