USE dict_term;

INSERT INTO admin VALUES ("lvribeiro", "Lucas Ribeiro", "11235813", 1);
INSERT INTO admin VALUES ("gord", "Otávio Goes", "73213712", 1);
INSERT INTO admin VALUES ("vcamargo", "Vitor Bueno", "1234", 1);

INSERT INTO gramatica VALUES('sf', 'substantivo feminino');
INSERT INTO gramatica VALUES('sm', 'substantivo masculino');
INSERT INTO gramatica VALUES('adj', 'adjetivo');

INSERT INTO tipo VALUES('categoria 1', 'teste');
INSERT INTO tipo VALUES('categoria 2', 'teste');

INSERT INTO termo VALUES ('termo 1', 'sf', 't1', 'variante 1; variante 2', 'fra1; fas2', 'teste definicao', 'teste contexto', 'teste nota', 'termo uno', 'vcamargo', 'categoria 1');
INSERT INTO termo VALUES ('termo 2', 'sm', 't2', 'variante 3; variante 4', 'fra3; fas4', 'teste definicao', 'teste contexto', 'teste nota', 'termo do', 'vcamargo', 'categoria 1');
INSERT INTO termo VALUES ('termo 3', 'sf', 't3', 'variante 1; variante 3', 'fra1; fas3', 'teste definicao', 'teste contexto', 'teste nota', 'termo tres', 'vcamargo', 'categoria 2');
INSERT INTO termo VALUES ('termo 4', 'sm', 't4', 'variante 2; variante 4', 'fra2; fas4', 'teste definicao', 'teste contexto', 'teste nota', 'termo cuatro', 'vcamargo', 'categoria 2');
INSERT INTO termo VALUES ('termo 5', 'adj', 't5', 'var 5; var 4', 'fr3', 'teste', 'te', 'tes', 'termo cinco', 'vcamargo', 'categoria 1');