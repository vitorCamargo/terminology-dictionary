DROP DATABASE IF EXISTS dict_term;
CREATE DATABASE dict_term;
USE dict_term;

DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS tipo;
DROP TABLE IF EXISTS termo;
DROP TABLE IF EXISTS relacionado;

CREATE TABLE admin (
	login VARCHAR(15),
	nome VARCHAR(100),
	senha VARCHAR(15),
	fodao BOOLEAN,

	PRIMARY KEY (login)
);

CREATE TABLE tipo (
	nome VARCHAR(100),
	descricao VARCHAR(1000),
	alterou VARCHAR(15) NOT NULL,

	PRIMARY KEY (nome),
	FOREIGN KEY (alterou) REFERENCES admin (login)

);

CREATE TABLE termo (
	id INTEGER AUTO_INCREMENT,
	nome VARCHAR(100),
	descricao VARCHAR(1000),
	alterou VARCHAR(15) NOT NULL,
	pertence VARCHAR(100) NOT NULL,

	PRIMARY KEY (id),
	FOREIGN KEY (alterou) REFERENCES admin (login),
	FOREIGN KEY (pertence) REFERENCES tipo (nome)
);

CREATE TABLE relacionado (
	relaciona INTEGER,
	relacionado INTEGER,

	FOREIGN KEY (relaciona) REFERENCES termo (id),
	FOREIGN KEY (relacionado) REFERENCES termo (id),
	PRIMARY KEY (relaciona, relacionado)
);