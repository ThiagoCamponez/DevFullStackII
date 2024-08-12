import express from 'express';
import cors from 'cors';
import rotaTipoAtividadeSust from './Rotas/rotaTipoAtividadeSust.js';
import rotaAtividadeSustentavel from './Rotas/rotaAtividadeSustentavel.js';

const host='0.0.0.0';
const porta=3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/tipoAtividadeSust',rotaTipoAtividadeSust);
app.use('/atividadeSustentavel',rotaAtividadeSustentavel);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
