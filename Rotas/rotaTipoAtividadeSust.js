import { Router } from "express";
import TipoAtividadeSustCtrl from "../Controle/tipoAtividadeSustCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const tipoCtrl = new TipoAtividadeSustCtrl();
const rotaTipoAtividadeSust = new Router();

rotaTipoAtividadeSust
.get('/',tipoCtrl.consultar)
.get('/:termo', tipoCtrl.consultar)
.post('/',tipoCtrl.gravar)
.patch('/',tipoCtrl.atualizar)
.put('/',tipoCtrl.atualizar)
.delete('/',tipoCtrl.excluir);

export default rotaTipoAtividadeSust;