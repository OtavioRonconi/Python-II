BEGIN TRANSACTION;

-- Removendo pratos antigos para evitar duplicatas ao rodar o script novamente
DELETE FROM churras_prato;

-- Inserindo os pratos com as colunas 'pessoa_id' e 'foto_prato'
INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Picanha', 'Picanha bovina, Sal Grosso', 'Temperar com sal grosso e grelhar ao ponto desejado.', 30, '4 porções', 'Carne Vermelha', '2025-06-27', 'fotos_pratos/picanha.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Fraldinha', 'Fraldinha bovina, Alho picado, Sal', 'Marinar em alho e sal, grelhar em fogo alto.', 35, '4 porções', 'Carne Vermelha', '2025-06-27', 'fotos_pratos/fraldinha.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Cupim', 'Cupim bovino, Sal Grosso, Pimenta-do-reino', 'Assar lentamente até ficar macio.', 90, '6 porções', 'Carne Vermelha', '2025-06-27', 'fotos_pratos/cupim.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Alcatra', 'Alcatra bovina, Sal, Alecrim', 'Temperar, grelhar e fatiar finamente.', 40, '5 porções', 'Carne Vermelha', '2025-06-27', 'fotos_pratos/alcatra.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Maminha', 'Maminha bovina, Sal Grosso, Alho', 'Temperar e assar em espeto giratório.', 45, '5 porções', 'Carne Vermelha', '2025-06-27', 'fotos_pratos/maminha.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Contrafilé', 'Contrafilé bovino, Manteiga, Alho', 'Grelhar e pincelar com manteiga de alho.', 30, '4 porções', 'Carne Vermelha', '2025-06-27', 'fotos_pratos/contrafile.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Costela', 'Costela bovina, Sal, Pimenta-do-reino', 'Cozinhar em fogo baixo por 4h e finalizar na grelha.', 240, '8 porções', 'Carne Vermelha', '2025-06-27', 'fotos_pratos/costela.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Linguiça Toscana', 'Linguiça de porco, Temperos artesanais', 'Grelhar até dourar e servir fatiada.', 25, 'Várias', 'Carne Suína', '2025-06-27', 'fotos_pratos/linguica.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Coração de Frango', 'Coração de frango, Sal, Alho', 'Temperar, espetar e grelhar.', 20, 'Várias', 'Aves', '2025-06-27', 'fotos_pratos/coracao.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Lombo de Porco', 'Lombo suíno, Alho, Alecrim', 'Marinar e assar lentamente.', 60, '6 porções', 'Carne Suína', '2025-06-27', 'fotos_pratos/lombo.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Asinha de Frango', 'Asinhas, Molho barbecue, Temperos', 'Marinar e grelhar, regando com barbecue.', 35, 'Várias', 'Aves', '2025-06-27', 'fotos_pratos/asinha.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Sobrecoxa', 'Sobrecoxa de frango, Sal, Limão', 'Temperar, grelhar até ficar suculenta.', 40, '4 porções', 'Aves', '2025-06-27', 'fotos_pratos/sobrecoxa.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Espeto de Queijo Coalho', 'Queijo coalho, Orégano', 'Grelhar levemente e polvilhar orégano.', 15, 'Várias', 'Acompanhamento', '2025-06-27', 'fotos_pratos/queijo_coalho.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Espeto de Camarão', 'Camarões grandes, Alho, Limão', 'Temperar e grelhar rapidamente.', 20, 'Várias', 'Frutos do Mar', '2025-06-27', 'fotos_pratos/camarao.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Kafta', 'Carne bovina moída, Hortelã, Cebola', 'Misturar temperos, espetar e grelhar.', 25, 'Várias', 'Carne Vermelha', '2025-06-27', 'fotos_pratos/kafta.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Alho Torrado', 'Alhos inteiros, Azeite', 'Assar alho com azeite até dourar.', 30, 'Várias', 'Acompanhamento', '2025-06-27', 'fotos_pratos/alho.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Paleta de Cordeiro', 'Paleta de cordeiro, Alecrim, Vinho branco', 'Marinar e assar lentamente.', 180, '8 porções', 'Carne Vermelha', '2025-06-27', 'fotos_pratos/cordeiro.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Filé Mignon', 'Filé mignon, Sal, Manteiga', 'Grelhar ao ponto e servir com manteiga.', 25, '4 porções', 'Carne Vermelha', '2025-06-27', 'fotos_pratos/file_mignon.jpg');

INSERT INTO churras_prato (pessoa_id, nome_prato, ingredientes, modo_preparo, tempo_preparo, rendimento, categoria, date_prato, foto_prato) VALUES
(1, 'Carne de Sol', 'Carne de sol dessalgada, Cebola', 'Dessalgar, refogar com cebola e grelhar.', 50, '6 porções', 'Carne Vermelha', '2025-06-27', 'fotos_pratos/carne_de_sol.jpg');

COMMIT;