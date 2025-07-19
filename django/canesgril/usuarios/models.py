from django.db import models

class CustomUser(models.Model):
    nome = models.CharField((""), max_length=50)
    senha = models.IntegerField((""))
    email = models.EmailField((""), max_length=254)

    def __str__(self):
        return self.nome