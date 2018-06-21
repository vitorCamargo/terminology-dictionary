DROP DATABASE IF EXISTS dict_term;
CREATE DATABASE dict_term;
USE dict_term;

DROP TABLE IF EXISTS gramatica;
DROP TABLE IF EXISTS admin;
DROP TABLE IF EXISTS tipo;
DROP TABLE IF EXISTS termo;
DROP TABLE IF EXISTS relacionado;
DROP TABLE IF EXISTS variante;
DROP TABLE IF EXISTS variante_termo;
DROP TABLE IF EXISTS fraseologia;
DROP TABLE IF EXISTS sinonimo;
DROP TABLE IF EXISTS remissivas;


 
-- Entidade
CREATE TABLE gramatica ( -- referencias gramaticais
	sigla VARCHAR(5),
	referencia VARCHAR(30),

	PRIMARY KEY (sigla)
);
-- Entidade
CREATE TABLE admin ( -- administrador
	login VARCHAR(15),
	nome VARCHAR(100),
	senha VARCHAR(15),
	fodao BOOLEAN, -- pode fazer mais alterações

	PRIMARY KEY (login)
);
-- Entidade
CREATE TABLE tipo (
	nome VARCHAR(100),
	descricao VARCHAR(1000),

	PRIMARY KEY (nome)
);
-- Entidade

CREATE TABLE termo (
	id INTEGER AUTO_INCREMENT, -- primary key
	

	nome VARCHAR(1000), 
	rg VARCHAR(5), -- referncia gramatical
	sigla VARCHAR(10), -- sigla e acrônomo
	definicao VARCHAR(1000),
	nota VARCHAR (1000), 
	equivalente VARCHAR (1000), -- equivalente em espanhol

	alterou VARCHAR(15) NOT NULL, -- pessoa que fez a alteração deste termo
	pertence VARCHAR(100) NOT NULL, -- Categoria que o termo pertence

	PRIMARY KEY (id),
	FOREIGN KEY (alterou) REFERENCES admin (login),
	FOREIGN KEY (pertence) REFERENCES tipo (nome),
	FOREIGN KEY (rg) REFERENCES gramatica (sigla),
);
-- Entidade

CREATE TABLE relacionado (
	relaciona INTEGER,
	relacionado INTEGER,

	FOREIGN KEY (relaciona) REFERENCES termo (id) ON DELETE CASCADE,
	FOREIGN KEY (relacionado) REFERENCES termo (id) ON DELETE CASCADE,
	PRIMARY KEY (relaciona, relacionado)
);
-- relacionamento

CREATE TABLE sinonimo (
	termo INTEGER,
	termoSinonimo INTEGER,

	PRIMARY KEY (termoSinonimo, termo),
	FOREIGN KEY (termo) REFERENCES termo (id) ON DELETE CASCADE,
	FOREIGN KEY (termoSinonimo) REFERENCES termo (id) ON DELETE CASCADE
);
-- relacionamento

CREATE TABLE fraseologia (
	termo INTEGER,
	fraseologia VARCHAR (100),
	definicao VARCHAR (1000),
	contexto VARCHAR (1000),

	FOREIGN KEY (termo) REFERENCES termo (id) ON DELETE CASCADE,
	PRIMARY KEY (termo, fraseologia)	
);
-- Entidade Fraca

CREATE TABLE variante ( -- variantes para cada termo
	termo INTEGER,
	variante VARCHAR(100),
	definicao VARCHAR(1000),
	contexto VARCHAR(1000),

	FOREIGN KEY (termo) REFERENCES termo (id) ON DELETE CASCADE,
	PRIMARY KEY (termo, variante)
);
-- Entidade Fraca
CREATE TABLE remissivas (
	termo INTEGER,
	termoRemissivo INTEGER,


	FOREIGN KEY (termo) REFERENCES termo (id) ON DELETE CASCADE,
	FOREIGN KEY (termoRemissivo) REFERENCES termo (id) ON DELETE CASCADE,
	PRIMARY KEY (termo, termoRemissivo)
);
-- relacionamento