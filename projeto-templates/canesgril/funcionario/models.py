from django.db import models

class Funcionario(models.Model):
    nome = models.CharField(("nome_funcionario"), max_length=100)
    email = models.EmailField(("email_funcionario"), max_length=100, unique=True)

    def __str__(self):
        return self.nome