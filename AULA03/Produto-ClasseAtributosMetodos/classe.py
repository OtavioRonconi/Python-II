class Produto:
    def __init__(self, descricao, preco):
        self.descricao=descricao
        self.preco=preco
    def verProduto(self):
        print(f'{self.descricao} pro apenas R$ {self.preco:.2f}')