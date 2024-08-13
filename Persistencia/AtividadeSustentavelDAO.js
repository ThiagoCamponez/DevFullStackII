import AtividadeSustentavel from '../Modelo/AtividadeSustentavel.js';
import TipoAtividadeSustentavel from '../Modelo/tipoAtividadeSust.js';

import conectar from './conexao.js';

export default class AtividadeSustentavelDAO{

    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
            CREATE TABLE IF NOT EXISTS atividadeSustentavel(
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

        `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }


    async gravar(atividadeSustentavel) {
        if (atividadeSustentavel instanceof AtividadeSustentavel) {
            const sql = `INSERT INTO atividadeSustentavel(ativ_nome, ativ_cpf, ativ_contato, ativ_endereco, ativ_bairro, ativ_numero, tipo_id, ativ_data, ativ_horarioInicial, ativ_horarioFinal, ativ_descricaoCompleta)	
                VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
            const parametros = [atividadeSustentavel.nome, atividadeSustentavel.cpf, atividadeSustentavel.contato, atividadeSustentavel.endereco, atividadeSustentavel.bairro, atividadeSustentavel.numero, atividadeSustentavel.tipoAtividadeSustentavel.id, atividadeSustentavel.data, atividadeSustentavel.horarioInicial, atividadeSustentavel.horarioFinal, atividadeSustentavel.descricaoCompleta];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            atividadeSustentavel.id = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(atividadeSustentavel) {
        if (atividadeSustentavel instanceof AtividadeSustentavel) {
            const sql = `UPDATE atividadeSustentavel SET ativ_nome = ?, ativ_cpf = ?,
            ativ_contato = ?, ativ_endereco = ?, ativ_bairro = ?, ativ_numero = ?, tipo_id = ?, ativ_data = ?, ativ_horarioInicial = ?, ativ_horarioFinal = ?, ativ_descricaoCompleta = ? WHERE ativ_id = ?`;
            const parametros = [atividadeSustentavel.nome, atividadeSustentavel.cpf, atividadeSustentavel.contato, atividadeSustentavel.endereco, atividadeSustentavel.bairro, atividadeSustentavel.numero, atividadeSustentavel.tipoAtividadeSustentavel.id, atividadeSustentavel.data, atividadeSustentavel.horarioInicial, atividadeSustentavel.horarioFinal, atividadeSustentavel.descricaoCompleta, atividadeSustentavel.id];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(atividadeSustentavel) {
        if (atividadeSustentavel instanceof AtividadeSustentavel) {
            const sql = `DELETE FROM atividadeSustentavel WHERE ativ_id = ?`;
            const parametros = [atividadeSustentavel.id];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo){
            termo="";
        }
        //termo é um número
        const conexao = await conectar();
        let listaAtividades = [];
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do produto
            const sql = `SELECT p.ativ_id, p.ativ_nome, p.ativ_cpf, p.ativ_contato, 
                         p.ativ_endereco, p.ativ_bairro, p.ativ_numero, p.tipo_id, p.ativ_data, p.ativ_horarioInicial, p.ativ_horarioFinal, p.ativ_descricaoCompleta
                         FROM atividadeSustentavel p 
                         INNER JOIN tipoAtividadeSust t ON p.tipo_id = t.tipo_id
                         WHERE p.ativ_id = ?
                         ORDER BY p.ativ_nome            
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const atividadeSustentavel = new AtividadeSustentavel(registro.ativ_id, registro.ativ_nome, registro.ativ_cpf, registro.ativ_contato, registro.ativ_endereco, registro.ativ_bairro, registro.ativ_numero, registro.ativ_data, registro.ativ_horarioInicial, registro.ativ_horarioFinal, registro.ativ_descricaoCompleta);
                listaAtividades.push(atividadeSustentavel);
            }
        }
        else
        {
            //consulta pela descrição do produto
            const sql = `SELECT p.ativ_id, p.ativ_nome, p.ativ_cpf, p.ativ_contato, 
                         p.ativ_endereco, p.ativ_bairro, p.ativ_numero, p.tipo_id, p.ativ_data, p.ativ_horarioInicial, p.ativ_horarioFinal, p.ativ_descricaoCompleta
                         FROM atividadeSustentavel p 
                         INNER JOIN tipoAtividadeSust t ON p.tipo_id = t.tipo_id
                         WHERE p.ativ_nome like ?
                         ORDER BY p.ativ_nome`;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const tipoAtividadeSust = new TipoAtividadeSustentavel(registro.tipo_id, registro.tipo_nome);
                const atividadeSustentavel = new AtividadeSustentavel(registro.ativ_id, registro.ativ_nome, registro.ativ_cpf, registro.ativ_contato, registro.ativ_endereco, registro.ativ_bairro, registro.ativ_numero, registro.ativ_data, registro.ativ_horarioInicial, registro.ativ_horarioFinal, registro.ativ_descricaoCompleta
                                            );
                listaAtividades.push(atividadeSustentavel);
            }
        }

        return listaAtividades;
    }
}