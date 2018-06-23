USE dict_term;

INSERT INTO admin VALUES ("lvribeiro", "Lucas Ribeiro", "11235813", 1);
INSERT INTO admin VALUES ("gord", "Otávio Goes", "73213712", 1);
INSERT INTO admin VALUES ("vcamargo", "Vitor Bueno", "235791113", 1);

INSERT INTO tipo VALUES ("Esporte", "Lorem ipsum dolor sit amet.", "lvribeiro");
INSERT INTO tipo VALUES ("Acessibilidade", "Lorem ipsum dolor sit amet.", "gord");
INSERT INTO tipo VALUES ("Infraestrutura", "Lorem ipsum dolor sit amet.", "vcamargo");

INSERT INTO termo VALUES (null, "BLABLABLA", "Lorem ipsum dolor sit amet.", "lvribeiro", "Esporte");
INSERT INTO termo VALUES (null, "123123123", "Lorem ipsum dolor sit amet.", "gord", "Esporte");
INSERT INTO termo VALUES (null, "321321321", "Lorem ipsum dolor sit amet.", "vcamargo", "Esporte");

INSERT INTO termo VALUES (null, "000000000", "Lorem ipsum dolor sit amet.", "lvribeiro", "Acessibilidade");
INSERT INTO termo VALUES (null, "111111111", "Lorem ipsum dolor sit amet.", "gord", "Acessibilidade");
INSERT INTO termo VALUES (null, "222222222", "Lorem ipsum dolor sit amet.", "vcamargo", "Acessibilidade");

INSERT INTO termo VALUES (null, "333333333", "Lorem ipsum dolor sit amet.", "lvribeiro", "Infraestrutura");
INSERT INTO termo VALUES (null, "444444444", "Lorem ipsum dolor sit amet.", "gord", "Infraestrutura");
INSERT INTO termo VALUES (null, "555555555", "Lorem ipsum dolor sit amet.", "vcamargo", "Infraestrutura");

INSERT INTO relacionado VALUES (1,2);
INSERT INTO relacionado VALUES (1,3);
INSERT INTO relacionado VALUES (2,3);

INSERT INTO relacionado VALUES (4, 5);
INSERT INTO relacionado VALUES (4, 6);
INSERT INTO relacionado VALUES (5, 6);

INSERT INTO relacionado VALUES (7, 8);
INSERT INTO relacionado VALUES (7, 9);
INSERT INTO relacionado VALUES (8, 9);




