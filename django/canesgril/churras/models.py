from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

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
    # ... (os outros campos continuam os mesmos) ...
    nome = models.CharField(max_length=100)
    quantidade = models.DecimalField(max_digits=8, decimal_places=2) 
    unidade = models.CharField(max_length=10, default='kg')
    
    # Adicione esta linha
    preco = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)

    TIPO_CHOICES = (
        ("CARNE", "Carne"),
        ("BEBIDA", "Bebida"),
        ("SUPRIMENTO", "Suprimento"),
        ("OUTRO", "Outro"),
    )
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES, default='OUTRO')
    evento = models.ForeignKey(Evento, related_name='itens', on_delete=models.CASCADE)

    def __str__(self):
        return self.nome

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
