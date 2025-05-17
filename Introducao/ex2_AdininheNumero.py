"""
    Objetivo: Revisar a estruturas de: 
        - Desvio condicional; e 
        - Repetição;
    Nesta atividade você vai criar um jogo onde será gerado 
    um número aletório entre 0 e 100
    e o usuario deve tentar descobrir qual foi é o número em 10 tentativas. 
    Comandos utilizados: for, if, else e a biblioteca random. 
"""


from os import system
import random
# importa biblioteca do sistema
def gg():
    system('cls') #limpa tela
    print("****************************")
    print('Adivinhe qual é o "número"!!! ')
    print("****************************")

    # Aproveitamos para relembrar constantes e variáveis
    numero_secreto = random.randrange(0,101) # Identifica como inteiro

    # Vamos definir apenas o total de rodadas
    total_de_tentativas = 10
    # O laço irá englobar todo o código a repetir
    for rodada in range(1,total_de_tentativas + 1):
        print(f"\nTentativa {rodada:02d} de {total_de_tentativas:02d}")
        #Entrada do usuário
        tentativa =input("Tente acertar o número de 1 a 100: ") # 
        print("Você digitou: ",tentativa)

        # Converção da string para int 
        tentativa_int = int(tentativa)
        if(tentativa_int < 1 or tentativa_int > 100):
            print("Tentativa INVÁLIDA! Somente números de 1 a 100!")
            continue
        acerto  = tentativa_int == numero_secreto
        ehmaior = tentativa_int > numero_secreto
        ehmenor = tentativa_int < numero_secreto
        if (acerto):
            print("Boa tentativa. ACERTOU!")
            break
        else:
            print("Não foi dessa vez. ERROU!")
            # Colocamos novas condições, lembre a identação definirá a inserção
            if (ehmaior):
                print("Sua tentativa foi MAIOR que o número secreto.")
            if (ehmenor):
                print("Sua tentativa foi MENOR que o número secreto.")

    print(f'O número secreto sorteado foi: {numero_secreto}')
    input('\nObrigado por participar!\n')

if(__name__ == "__main__"):
    gg()
