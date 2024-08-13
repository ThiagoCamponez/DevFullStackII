import TipoAtividadeSustDAO from "../Persistencia/TipoAtividadeSustDAO.js";
//não esqueça do .js no final da importação

export default class TipoAtividadeSustentavel {
    //definição dos atributos privados
    #id;
    #nome;

    constructor(id=0, nome=''){
        this.#id=id;
        this.#nome=nome;
    }

    //métodos de acesso públicos

    get id(){
        return this.#id;
    }

    set id(novoId){
        this.#id = novoId;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            id:this.#id,
            nome:this.#nome
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const tipoDAO = new TipoAtividadeSustDAO();
        await tipoDAO.gravar(this);
    }

    async excluir(){
        const tipoDAO = new TipoAtividadeSustDAO();
        await tipoDAO.excluir(this);
    }

    async atualizar(){
        const tipoDAO = new TipoAtividadeSustDAO();
        await tipoDAO.atualizar(this);

    }

    async consultar(parametro){
        const tipoDAO = new TipoAtividadeSustDAO();
        return await tipoDAO.consultar(parametro);
    }

    async possuiAtividade(){
        const tipoDAO = new TipoAtividadeSustDAO();
        return await tipoDAO.possuiAtividadeSust(this);
    }
}