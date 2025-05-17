from classe import Recibo
from os import system, name
system('cls') if(name == 'nt') else system('clear')

nome = input('Informe a o nome: ')
dados = Recibo(nome)
valor = float(input('Informe o valor: '))
dados.valor = valor
descricao = input('Informe a a descrição: ')
dados.descricao(descricao)
system('cls') if(name == 'nt') else system('clear')
print(dados)
print()
print()
