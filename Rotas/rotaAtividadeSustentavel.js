import { Router } from "express";
import AtividadeSustentavelCtrl from "../Controle/AtividadeSustentavelCtrl.js";

const ativCtrl = new AtividadeSustentavelCtrl();
const rotaAtividadeSustentavel = new Router();

rotaAtividadeSustentavel
.get('/', ativCtrl.consultar)
.get('/:termo', ativCtrl.consultar)
.post('/', ativCtrl.gravar)
.patch('/', ativCtrl.atualizar)
.put('/', ativCtrl.atualizar)
.delete('/', ativCtrl.excluir);

export default rotaAtividadeSustentavel;