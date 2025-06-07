from django.contrib import admin
from .models import Evento, Item

# Classe para customizar a exibição do modelo Evento no Admin
# Análogo ao ClienteAdmin na página 52 do seu PDF 
class EventoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'data', 'local')
    search_fields = ('nome', 'local')

# Classe para customizar a exibição do modelo Item no Admin
# Análogo ao ProdutoAdmin na página 52 do seu PDF 
class ItemAdmin(admin.ModelAdmin):
    list_display = ('nome', 'evento', 'tipo', 'quantidade', 'unidade')
    list_filter = ('evento', 'tipo')
    search_fields = ('nome',)

# Registrando os modelos com suas respectivas classes de customização
admin.site.register(Evento, EventoAdmin)
admin.site.register(Item, ItemAdmin)