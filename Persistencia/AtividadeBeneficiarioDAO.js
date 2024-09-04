import Database from "../database.js";

class AtividadeBeneficiarioDAO {
    async gravar(atividadeBeneficiario) {
        const db = new Database();
        const sql = `
            INSERT INTO Atividade_Beneficiario (atividade_id, beneficiario_id, papel, dataParticipacao)
            VALUES (?, ?, ?, ?)
        `;
        await db.ExecutaComandoNonQuery(sql, [
            atividadeBeneficiario.atividade.id,
            atividadeBeneficiario.beneficiario.id,
            atividadeBeneficiario.papel,
            atividadeBeneficiario.dataParticipacao
        ]);
    }

    async excluir(atividadeBeneficiario) {
        const db = new Database();
        const sql = `
            DELETE FROM Atividade_Beneficiario WHERE atividade_id = ? AND beneficiario_id = ?
        `;
        await db.ExecutaComandoNonQuery(sql, [
            atividadeBeneficiario.atividade.id,
            atividadeBeneficiario.beneficiario.id
        ]);
    }

    async atualizar(atividadeBeneficiario) {
        const db = new Database();
        const sql = `
            UPDATE Atividade_Beneficiario 
            SET papel = ?, dataParticipacao = ?
            WHERE atividade_id = ? AND beneficiario_id = ?
        `;
        await db.ExecutaComandoNonQuery(sql, [
            atividadeBeneficiario.papel,
            atividadeBeneficiario.dataParticipacao,
            atividadeBeneficiario.atividade.id,
            atividadeBeneficiario.beneficiario.id
        ]);
    }

    async consultarPorAtividade(atividadeId) {
        const db = new Database();
        const sql = `
            SELECT * FROM Atividade_Beneficiario WHERE atividade_id = ?
        `;
        return await db.ExecutaComando(sql, [atividadeId]);
    }

    async consultarPorBeneficiario(beneficiarioId) {
        const db = new Database();
        const sql = `
            SELECT * FROM Atividade_Beneficiario WHERE beneficiario_id = ?
        `;
        return await db.ExecutaComando(sql, [beneficiarioId]);
    }
}

export default AtividadeBeneficiarioDAO;
