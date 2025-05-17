"""
    Objetivo: Revisar a manipulação de tuplas.
    Nesta atividade você vai criar um jogo usando tupla e tupla multidimensional. 
    Comandos utilizados: Tupla, Tupla Multidimensional, biblioteca random e randint.  
"""

from os import system, name 
import random

def ppt():

    opcao = 's'
    while opcao.upper()=='S':
        system('cls') if(name == 'nt')else system('clear')
        # Randomiza a opção do CPU
        computador = random.randint(0,2) 
        jogador = int(input('''Escolha uma opção para se jogar: 
        [1] Pedra
        [2] Papel
        [3] Tesoura
        Digite sua escolha: '''))-1
        pecas = ("Pedra", "Papel", "Tesoura")
            # Tupla multi-dimensional
        tabela = (
            ('NINGUEM', 'JOGADOR', 'CPU'),
            ('CPU', 'NINGUEM', 'JOGADOR'),
            ('JOGADOR', 'CPU', 'NINGUEM')
        )

        print(f'Voçê escolheu {pecas[jogador]}')
        print(f'A CPU escolheu {pecas[computador]}')
        print(f'{tabela[computador][jogador]} Ganhou!!!')
        opcao=input('Jogar novamente? Aperte S(sim) para jogar novamente. ')

if (__name__ == '__main__'):
     ppt()