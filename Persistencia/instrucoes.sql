CREATE DATABASE ecogest;

USE ecogest;

CREATE TABLE tipoAtividadeSustentavel(
    tipo_id INT NOT NULL AUTO_INCREMENT,
    tipo_nome VARCHAR(100) NOT NULL,
    CONSTRAINT pk_tipoAtividadeSustentavel PRIMARY KEY(tipo_id)
);

CREATE TABLE atividadeSustentavel(
    ativ_id INT NOT NULL AUTO_INCREMENT,
    ativ_nome VARCHAR(100) NOT NULL,
    ativ_cpf VARCHAR(14) NOT NULL,
    ativ_contato VARCHAR(20) DEFAULT NULL,
    ativ_endereco VARCHAR(255) DEFAULT NULL,
    ativ_bairro VARCHAR(100) DEFAULT NULL,
    ativ_numero INT(5) DEFAULT NULL,
    tipo_id INT NOT NULL, 
    ativ_data DATE DEFAULT NULL,
    ativ_horarioInicial VARCHAR(10) NOT NULL,
    ativ_horarioFinal VARCHAR(10) NOT NULL,
    ativ_descricaoCompleta VARCHAR(1000) NOT NULL,
    CONSTRAINT pk_atividadeSustentavel PRIMARY KEY(ativ_id),
    CONSTRAINT fk_atividadeSustentavel_tipoAtividadeSust FOREIGN KEY(tipo_id) REFERENCES tipoAtividadeSust(tipo_id)
);
