from classe import *
teclado = ProdutoFisico("Teclado Mecânico", 150.00, 0.8, "30x15x5 cm")
python_book = LivroDigital("Python Fluente", 80.00, "PDF")
web_course = CursoOnline("Desenvolvimento Web Completo", 400.00, 30)
data_course = CursoOnline("Analise de Dados com Python", 250.00, 15)

itens = [teclado, python_book, web_course, data_course]

for item in itens:
    item.exibir_detalhes()
    preco_final = item.calcular_preco_final()
    print(f"Preço Final: R$ {preco_final:.2f}")
    print("_" * 30)

"""notebook = ItemVenda('Notebook Dell i7', 7000)
input('Pressione qualquer tecla para ver os Itens de Venda: ')
notebook.exibir_detalhes()
preco_final = item.calcular_preco_final()
    print(f"Preço Final: R$ {preco_final:.2f}")
    print("_" * 30)

notebook2 = ProdutoFisico('Notebook Dell i7', 6000, 50000, 1)
input('Pressione qualquer tecla para ver os Produtos Físicos: ')
notebook2.exibir_detalhes()
preco_final = item.calcular_preco_final()
    print(f"Preço Final: R$ {preco_final:.2f}")
    print("_" * 30)

Manga = LivroDigital('Solo Leveling', 100, "PDF")
input('Pressione qualquer tecla para ver os livros: ')
Manga.exibir_detalhes()
preco_final = item.calcular_preco_final()
    print(f"Preço Final: R$ {preco_final:.2f}")
    print("_" * 30)

notebook = CursoOnline('Python II', 1000, "21")
input('Pressione qualquer tecla para ver os cursos: ')
notebook.exibir_detalhes()
preco_final = item.calcular_preco_final()
    print(f"Preço Final: R$ {preco_final:.2f}")
    print("_" * 30)"""