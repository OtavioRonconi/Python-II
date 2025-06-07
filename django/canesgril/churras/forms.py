from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Item, Evento

# Para usar um seletor de data no formulário de data
class DateInput(forms.DateInput):
    input_type = 'date'

class EventoForm(forms.ModelForm):
    class Meta:
        model = Evento
        fields = ['nome', 'data', 'local']
        # Usamos o widget customizado para o campo de data
        widgets = {
            'data': DateInput(),
        }

class ItemForm(forms.ModelForm):
    class Meta:
        model = Item
        # Incluímos todos os campos do modelo, exceto 'evento',
        # pois ele será definido automaticamente pela view.
        fields = ['nome', 'quantidade', 'unidade', 'tipo']

class SignUpForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        # Por enquanto, não vamos adicionar campos extras, 
        # mas a estrutura já está pronta se precisarmos.
        fields = UserCreationForm.Meta.fields