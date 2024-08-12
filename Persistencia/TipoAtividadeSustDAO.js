import TipoAtividadeSustentavel from "../Modelo/tipoAtividadeSust.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class TipoAtividadeSustDAO{

    constructor() {
        this.init();
    }
    
    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
                CREATE TABLE IF NOT EXISTS tipoAtividadeSust(
                    tipo_id INT NOT NULL AUTO_INCREMENT,
                    tipo_nome VARCHAR(100) NOT NULL,
                    CONSTRAINT pk_tipoAtividadeSust PRIMARY KEY(tipo_id)
                );`;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }
    async gravar(tipoAtividadeSust){
        if (tipoAtividadeSust instanceof TipoAtividadeSustentavel){
            const sql = "INSERT INTO tipoAtividadeSust(tipo_nome) VALUES(?)"; 
            const parametros = [tipoAtividadeSust.nome];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            tipoAtividadeSust.id = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(tipoAtividadeSust){
        if (tipoAtividadeSust instanceof TipoAtividadeSustentavel){
            const sql = "UPDATE tipoAtividadeSust SET tipo_nome = ? WHERE tipo_id = ?"; 
            const parametros = [tipoAtividadeSust.nome, tipoAtividadeSust.id];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(tipoAtividadeSust){
        if (tipoAtividadeSust instanceof TipoAtividadeSustentavel){
            //excluir o tipo de atividade sustentável implica em excluir antes os suas atividades.
            //caso contrário haverá uma violação de integridade referencial no banco de dados relacional
            //essa restrição deve ser implementada na lógica de negócio da sua aplicação.
            const sql = "DELETE FROM tipoAtividadeSust WHERE tipo_id = ?"; 
            const parametros = [tipoAtividadeSust.id];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
            //consultar pelo código do tipo de atividade sustentável
            sql='SELECT * FROM tipoAtividadeSust WHERE tipo_id = ? order by tipo_nome';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pelo tipo de atividade sustentável
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM tipoAtividadeSust WHERE tipo_nome like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaTipoAtividadeSust = [];
        for (const registro of registros){
            const tipoAtividadeSust = new TipoAtividadeSustentavel(registro.tipo_id,registro.tipo_nome);
            listaTipoAtividadeSust.push(tipoAtividadeSust);
        }
        return listaTipoAtividadeSust;
    }

    async possuiAtividadeSust(tipoAtividadeSust){
        if (tipoAtividadeSust instanceof TipoAtividadeSustentavel){
            const sql = `SELECT count(*) as qtd FROM atividadeSustentavel p
                         INNER JOIN tipoAtividadeSust c ON p.tipo_id = c.tipo_nome
                         WHERE c. tipo_id = ?`;    
            const parametros = [tipoAtividadeSust.id];
            const [registros]  = await global.poolConexoes.execute(sql,parametros);
            return registros[0].qtd > 0;     
            
        }	
    }
}