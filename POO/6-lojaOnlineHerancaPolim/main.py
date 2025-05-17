from classe import *
# Criando instâncias dos itens
teclado = ProdutoFisico("Teclado Mecânico", 150.00, 0.8, "30x15x5 cm")
python_book = LivroDigital("Python Fluente", 80.00, "PDF")
web_course = CursoOnline("Desenvolvimento Web Completo", 400.00, 30)
data_course = CursoOnline("Análise de Dados com Python", 250.00, 15)

# Demonstrando herança e polimorfismo
itens = [teclado, python_book, web_course, data_course]

for item in itens:
    item.exibir_detalhes()
    preco_final = item.calcular_preco_final()  # Polimorfismo em ação!
    print(f"Preço Final: R$ {preco_final:.2f}")
    print("-" * 30)