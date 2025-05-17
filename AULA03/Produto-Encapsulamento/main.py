from classe import Produto
notebook = Produto('Notebook Dell i7', 9800, 5800)
print("Mudar preço para 1000")
notebook.precoVenda=1000
print('----')
print("Mudar preço para 5100")
notebook.precoVenda=5100
print('----')
print(f'O preço de custo é: {notebook.precoCusto}')
print(f'O preço de venda é: {notebook.precoVenda}')