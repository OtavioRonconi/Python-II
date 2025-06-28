from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Prato

class CustomUserCreationForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Itera sobre todos os campos do formulário
        for field_name, field in self.fields.items():
            # Remove os textos de ajuda (aquelas letras todas)
            field.help_text = None
            
            # Adiciona a classe CSS 'form-control' para estilização (padrão do Bootstrap)
            # Isso fará com que os campos de input fiquem mais bonitos.
            field.widget.attrs['class'] = 'form-control'

# ADICIONE O NOVO FORMULÁRIO PARA PRATOS
class PratoForm(forms.ModelForm):
    class Meta:
        model = Prato
        # Liste os campos que o usuário poderá preencher
        # O campo 'pessoa' será preenchido automaticamente pela view
        fields = ['nome_prato', 'ingredientes', 'modo_preparo', 'tempo_preparo', 'rendimento', 'categoria', 'foto_prato']
        # Se você tiver o campo de foto, adicione-o também:
        # fields = ['nome_prato', 'ingredientes', 'modo_preparo', 'tempo_preparo', 'rendimento', 'categoria', 'foto_prato']

    # Opcional, mas recomendado: Adicionar o mesmo truque de estilização
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'form-control'