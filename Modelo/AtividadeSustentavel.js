import AtividadeSustentavelDAO from "../Persistencia/AtividadeSustentavelDAO.js";
import TipoAtividadeSustentavel from "./tipoAtividadeSust.js";

export default class AtividadeSustentavel{ //Objeto    EQUIVALE --> PEDIDO
    //Atributos
    #id;
    #nome;
    #cpf;
    #contato;
    #endereco;
    #bairro;
    #numero;
    #tipoAtividadeSustentavel;
    #data;
    #horarioInicial;
    #horarioFinal; 
    #descricaoCompleta;


    constructor(id=0, nome="", cpf=0, contato=0, endereco="", bairro="", numero=0, tipoAtividadeSustentavel=null, data=null, horarioInicial=null, horarioFinal=null, descricaoCompleta=null
                ){
        this.#id=id;
        this.#nome=nome;
        this.#cpf=cpf;
        this.#contato=contato;
        this.#endereco=endereco;
        this.#bairro=bairro;
        this.#numero=numero;
        this.#tipoAtividadeSustentavel=tipoAtividadeSustentavel;
        this.#data=data;
        this.#horarioInicial=horarioInicial;
        this.#horarioFinal=horarioFinal;
        this.#descricaoCompleta=descricaoCompleta;
    }

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
        this.#nome=novoNome;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf
    }

    get contato(){
        return this.#contato;
    }
    
    set contato(novoContato){
        this.#contato = novoContato
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novoEndereco){
        this.#endereco = novoEndereco;
    }

    get bairro(){
        return this.#bairro;
    }

    set bairro(novoBairro){
        this.#bairro = novoBairro;
    }

    get numero(){
        return this.#numero;
    }

    set numero(novoNumero){
            this.#numero = novoNumero;       
    }

    get tipoAtividadeSustentavel(){
        return this.#tipoAtividadeSustentavel;
    }

    set tipoAtividadeSustentavel(novoTipo){
        if(novoTipo instanceof TipoAtividadeSustentavel){
            this.#tipoAtividadeSustentavel = novoTipo;
        }
    }

    get data(){
        return this.#data;
    }

    set data(novoData){
        this.#data = novoData;
    }

    get horarioInicial(){
        return this.#horarioInicial;
    }

    set horarioInicial(novoHorarioInicial){
        this.#horarioInicial = novoHorarioInicial;
    }

    get horarioFinal(){
        return this.#horarioFinal;
    }

    set horarioFinal(novoHorarioFinal){
        this.#horarioFinal = novoHorarioFinal;
    }

    get descricaoCompleta(){
        return this.#descricaoCompleta;
    }

    set descricaoCompleta(novaDescricaoCompleta){
        this.#descricaoCompleta = novaDescricaoCompleta;
    }

    toJSON()
    {
        return {
            id:this.#id,
            nome:this.#nome,
            cpf:this.#cpf,
            contato:this.#contato,
            endereco:this.#endereco,
            bairro:this.#bairro,
            numero:this.#numero,
            tipoAtividadeSustentavel:this.#tipoAtividadeSustentavel,
            data:this.#data,
            horarioInicial:this.#horarioInicial,
            horarioFinal:this.#horarioFinal,
            descricaoCompleta:this.#descricaoCompleta

        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const ativDAO = new AtividadeSustentavelDAO();
        await ativDAO.gravar(this);
     }
 
     async excluir(){
        const ativDAO = new AtividadeSustentavelDAO();
        await ativDAO.excluir(this);
     }
 
     async atualizar(){
        const ativDAO = new AtividadeSustentavelDAO();
        await ativDAO.atualizar(this);
     }
 
     async consultar(termo){
        const ativDAO = new AtividadeSustentavelDAO();
        return await ativDAO.consultar(termo);
     }

}