import forca.desenhos as desenhos
import forca.func as func
def gg():
    func.imprime_mensagem_abertura()
    dica = func.definir_tema()
    palavra_secreta = func.carrega_palavra_secreta(dica)
    
    letras_acertadas = func.init_letras_acertadas(palavra_secreta)
    print(f"Dica: {dica.upper()}")
    print(f"Palavra secreta contem: {len(letras_acertadas)} letras")
    print(letras_acertadas)
    morreu = False
    acertou = False
    tentativas_erradas = []
    erros = 0
    while(not morreu and not acertou):
        tentativa = input("Qual a letra? ")
        tentativa = tentativa.strip().upper()
        if(tentativa in palavra_secreta):
            index = 0
            for letra in palavra_secreta:
                if(tentativa == letra):
                    letras_acertadas[index] = letra
                index += 1
        else:
            erros += 1
            desenhos.forca(erros)
            tentativas_erradas.append(tentativa)    
        morreu = erros == 7
        acertou = "_" not in letras_acertadas
        print(f"Dica: {dica.upper()}")
        print(f"Erros: {tentativas_erradas}")
        print(letras_acertadas)

    if(acertou):
        desenhos.vencedor()
    else:
        desenhos.perdedor(palavra_secreta)

    print('\nObrigado por participar!\n')

if(__name__ == "__main__"):
    gg()
