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
	nome VARCHAR(100), 
	rg VARCHAR(5), -- referncia gramatical
	sigla VARCHAR(10), -- sigla e acrônomo
    
    variante VARCHAR(100),
    fraseologia VARCHAR (100),
    
    definicao VARCHAR(1000),
    contexto VARCHAR(1000),
    nota VARCHAR (1000), 
    equivalente VARCHAR (1000), -- equivalente em espanhol

	alterou VARCHAR(15) NOT NULL, -- pessoa que fez a alteração deste termo
	pertence VARCHAR(100) NOT NULL, -- Categoria que o termo pertence

	PRIMARY KEY (nome),
	FOREIGN KEY (alterou) REFERENCES admin (login),
	FOREIGN KEY (pertence) REFERENCES tipo (nome),
	FOREIGN KEY (rg) REFERENCES gramatica (sigla)
);
-- Entidade

CREATE TABLE sinonimo (
	termo VARCHAR(100), 
	termoSinonimo VARCHAR(100), 

	PRIMARY KEY (termoSinonimo, termo),
	FOREIGN KEY (termo) REFERENCES termo (nome) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (termoSinonimo) REFERENCES termo (nome) ON DELETE CASCADE ON UPDATE CASCADE
);
-- relacionamento

CREATE TABLE remissivas (
	termo VARCHAR(100),
	termoRemissivo VARCHAR(100),


	FOREIGN KEY (termo) REFERENCES termo (nome) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (termoRemissivo) REFERENCES termo (nome) ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (termo, termoRemissivo)
);
-- relacionamento