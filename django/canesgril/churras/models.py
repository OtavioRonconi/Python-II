from django.db import models
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

# Este modelo é análogo ao "Cliente" do seu PDF. 
# É a entidade principal em torno da qual as outras coisas se organizam.
class Evento(models.Model):
    nome = models.CharField('Nome do Evento', max_length=100)
    data = models.DateField('Data do Evento', default=timezone.now)
    local = models.CharField('Local', max_length=200, blank=True)
    organizador = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome

# Este modelo é análogo ao "Produto" do seu PDF. 
# São os itens que "pertencem" a um evento.
class Item(models.Model):
    # Tipos de itens para facilitar a organização
    TIPO_CHOICES = [
        ('CARNE', 'Carne'),
        ('BEBIDA', 'Bebida'),
        ('SUPRIMENTO', 'Suprimento'), # (Carvão, Gelo, etc.)
        ('OUTRO', 'Outro'),
    ]

    evento = models.ForeignKey(Evento, on_delete=models.CASCADE, related_name='itens')
    nome = models.CharField('Nome do Item', max_length=100)
    quantidade = models.DecimalField('Quantidade', max_digits=8, decimal_places=2)
    unidade = models.CharField('Unidade (kg, L, un)', max_length=20)
    tipo = models.CharField('Tipo do Item', max_length=20, choices=TIPO_CHOICES, default='OUTRO')

    def __str__(self):
        return f"{self.nome} ({self.quantidade} {self.unidade})"
