import AtividadeSustentavel from "./AtividadeSustentavel.js";
import Beneficiario from "./Beneficiario.js";
import AtividadeBeneficiarioDAO from "../Persistencia/AtividadeBeneficiarioDAO.js";

export default class AtividadeBeneficiario {
    // Atributos
    #atividade;
    #beneficiario;
    #papel; // se houver necessidade de adicionar um papel

    constructor(atividade, beneficiario, papel = null, dataParticipacao = null) {
        if (atividade instanceof AtividadeSustentavel) {
            this.#atividade = atividade;
        }
        if (beneficiario instanceof Beneficiario) {
            this.#beneficiario = beneficiario;
        }
        this.#papel = papel;
    }

    get atividade() {
        return this.#atividade;
    }

    set atividade(novaAtividade) {
        if (novaAtividade instanceof AtividadeSustentavel) {
            this.#atividade = novaAtividade;
        }
    }

    get beneficiario() {
        return this.#beneficiario;
    }

    set beneficiario(novoBeneficiario) {
        if (novoBeneficiario instanceof Beneficiario) {
            this.#beneficiario = novoBeneficiario;
        }
    }

    get papel() {
        return this.#papel;
    }

    set papel(novoPapel) {
        this.#papel = novoPapel;
    }

    // Métodos para persistência
    async gravar() {
        const atividadeBeneficiarioDAO = new AtividadeBeneficiarioDAO();
        await atividadeBeneficiarioDAO.gravar(this);
    }

    async excluir() {
        const atividadeBeneficiarioDAO = new AtividadeBeneficiarioDAO();
        await atividadeBeneficiarioDAO.excluir(this);
    }

    async atualizar() {
        const atividadeBeneficiarioDAO = new AtividadeBeneficiarioDAO();
        await atividadeBeneficiarioDAO.atualizar(this);
    }

    async consultarPorAtividade(atividadeId) {
        const atividadeBeneficiarioDAO = new AtividadeBeneficiarioDAO();
        return await atividadeBeneficiarioDAO.consultarPorAtividade(atividadeId);
    }

    async consultarPorBeneficiario(beneficiarioId) {
        const atividadeBeneficiarioDAO = new AtividadeBeneficiarioDAO();
        return await atividadeBeneficiarioDAO.consultarPorBeneficiario(beneficiarioId);
    }

    toJSON() {
        return {
            atividade: this.#atividade,
            beneficiario: this.#beneficiario,
            papel: this.#papel
        };
    }
}
