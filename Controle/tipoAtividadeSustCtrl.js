//camada de interface da API que traduz HTTP
import TipoAtividadeSustentavel from "../Modelo/tipoAtividadeSust.js";

export default class TipoAtividadeSust {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            if (nome) {
                const tipoAtividadeSustentavel = new TipoAtividadeSustentavel(0, nome);
                //resolver a promise
                tipoAtividadeSustentavel.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": tipoAtividadeSustentavel.id,
                        "mensagem": "Tipo de Atividade Sustentável incluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o Tipo de Atividade Sustentável:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe a descrição do Tipo de Atividade Sustentável!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um Tipo de Atividade Sustentável!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;
            const nome = dados.nome;
            if (id && nome) {
                const tipoAtividadeSustentavel = new TipoAtividadeSustentavel(id, nome);
                //resolver a promise
                tipoAtividadeSustentavel.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Tipo de Atividade Sustentável atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o Tipo de Atividade Sustentável:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o id e a descrição do Tipo de Atividade Sustentável!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um Tipo de Atividade Sustentável!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;
            if (id) {
                const tipoAtividadeSustentavel = new TipoAtividadeSustentavel(id);
                tipoAtividadeSustentavel.possuiAtividade().then(possui => {
                    if(possui == false){
                        tipoAtividadeSustentavel.excluir().then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Tipo de Atividade Sustentável excluída com sucesso!"
                            });
                        })
                        .catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Erro ao excluir o Tipo de Atividade Sustentável:" + erro.message
                            });
                        });
                    }
                    else {
                        resposta.status(400).json({
                            "status": false,
                            "mensagem": "Esse Tipo de Atividade Sustentável possui produtos e não pode ser excluido!"	
                        });
                    }
                });
            }
            else {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Por favor, informe o id do Tipo de Atividade Sustentável!"
                });
            }            
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um Tipo de Atividade Sustentável!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const tipoAtividadeSustentavel = new TipoAtividadeSustentavel();
            tipoAtividadeSustentavel.consultar(termo).then((listaAtividades)=>{
                resposta.json(
                    {
                        status:true,
                        listaAtividades
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter o Tipo de Atividade Sustentável: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar o Tipo de Atividade Sustentável!"
            });
        }
    }
}