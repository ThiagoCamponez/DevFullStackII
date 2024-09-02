import express from 'express';
import cors from 'cors';
import rotaTipoAtividadeSust from './Rotas/rotaTipoAtividadeSust.js';
import rotaAtividadeSustentavel from './Rotas/rotaAtividadeSustentavel.js';
import rotaAutenticacao from './Rotas/rotaAutenticacao.js';
import verificarAutenticacao from './Seguranca/autenticar.js';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config(); //Carrega as variáveis de ambiente, extraindo de um arquivo .env

const host='0.0.0.0';
const porta=3000;

const app = express();
app.use(session({
    secret: process.env.CHAVE_SECRETA,
    resave: false, // a cada requisição a sessão precisa ser atualizada
    saveUninitialized: true, // salva sessões não iniciadas
    cookie: { maxAge: 1000 * 60 * 15 } // expira em 15 minutos
}))
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/tipoAtividadeSust', verificarAutenticacao, rotaTipoAtividadeSust);
app.use('/atividadeSustentavel', verificarAutenticacao, rotaAtividadeSustentavel);
app.use('/autenticacao', rotaAutenticacao);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
