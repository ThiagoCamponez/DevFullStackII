import AtividadeSustentavel from "../Modelo/AtividadeSustentavel.js";
import TipoAtividadeSust from "../Modelo/tipoAtividadeSust.js";

export default class AtividadeSustentavelCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const cpf = dados.cpf;
            const contato = dados.contato;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const numero = dados.numero;
            const tipo_id = dados.tipoAtividadeSust.id;
            const data = dados.data;
            const horarioInicial = dados.horarioInicial;
            const horarioFinal = dados.horarioFinal;
            const descricaoCompleta = dados.descricaoCompleta;


            if (nome && cpf && contato && endereco && bairro && numero && tipo_id && data && horarioInicial && horarioFinal && descricaoCompleta) {
                const tipoAtividadeSust = new TipoAtividadeSust(tipo_id);
                const atividadeSustentavel = new AtividadeSustentavel(0, nome, cpf, contato, endereco, bairro, numero, tipoAtividadeSust, data, horarioInicial, horarioFinal, descricaoCompleta);
                //resolver a promise
                atividadeSustentavel.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": atividadeSustentavel.id,
                        "mensagem": "Atividade Sustentavel incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar Atividade Sustentavel:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados da Atividade Sustentavel segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma Atividade Sustentavel!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;
            const nome = dados.nome;
            const cpf = dados.cpf;
            const contato = dados.contato;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const numero = dados.numero;
            const tipo_id = dados.tipoAtividadeSustentavel.id;
            const data = dados.data;
            const horarioInicial = dados.horarioInicial;
            const horarioFinal = dados.horarioFinal;
            const descricaoCompleta = dados.descricaoCompleta;


            if (id &&nome && cpf && contato && endereco && bairro && numero && tipo_id && data && horarioInicial && horarioFinal && descricaoCompleta) {
                const tipoAtividadeSust = new TipoAtividadeSust(tipo_id);
                const atividadeSustentavel = new AtividadeSustentavel(id, nome, cpf, contato, endereco, bairro, numero, tipoAtividadeSust, data, horarioInicial, horarioFinal, descricaoCompleta);
                //resolver a promise
                atividadeSustentavel.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Atividade Sustentável atualizada com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar Atividade Sustentável:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados da Atividade Sustentável segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar a Atividade Sustentável!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const id = dados.id;
            if (id) {
                const atividadeSustentavel = new AtividadeSustentavel(id);
                //resolver a promise
                atividadeSustentavel.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Atividade Sustentável excluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir a Atividade Sustentável:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o id da Atividade Sustentável!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma Atividade Sustentável!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const atividadeSustentavel = new AtividadeSustentavel();
            atividadeSustentavel.consultar(termo).then((listaAtividades) => {
                resposta.json(
                    {
                        status: true,
                        listaAtividades
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter as Atividade Sustentável: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar Atividade Sustentável!"
            });
        }
    }
}