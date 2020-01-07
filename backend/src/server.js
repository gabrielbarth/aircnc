const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors') //controle de acesso a api
const path = require('path')

const socketio = require('socket.io') // protocolo de comunicação síncrono
const http = require('http') // protocolo de comunicação assíncrino

const routes = require('./routes') //sempre colocar o caminho relativo, se não o node entende como biblioteca

const app = express()
const server = http.Server(app)  //extraindo servidor http de dentro do express
const io = socketio(server)


mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack9-zuwco.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectedUsers = {}

io.on('connection', socket => {
    const { user_id } = socket.handshake.query

    connectedUsers[user_id] = socket.id
})

app.use((req, res, next) => {
    req.io = io
    req.connectedUsers = connectedUsers

    return next()
})

/**função get tem dois parametros: rota e uma função que, nesse caso é uma
 * arrow function com os parâmetros requisição e resposta.
 * O usuário faz requisição em busca de uma resposta - que pode ser
 * retornada de várias maneiras e, sobretudo, nesta função.
 */

app.use(cors()) //por default permite que qualquer outro app consiga acessar a api
app.use(express.json())
//para o express interpretar formato JSON

//rota para retornar imagem -- retornar arquivos estaticos -> imagem
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
// app.post('/users/:id', (req, res) => {
//     return res.json(req.body)
// })
app.use(routes)

server.listen(3333)
//trata-se da porta a qual aplicação será executada

/**
 * Como trata-se de uma API Rest, não é viável e recomendado retornar dados em forma de texto.
 * Por isso é usado estrutura de dados para devolver dados para o front-end.
 * JSON - JavaScript Object Notation
 * E objetos, em JS, é composto por propriedade (chave) e valor.
 * Ex.: personObject = {nome: "Gabriel"}
 */

/**
 * Express é um microframework para auxiliar e tratar a definição de rotas
 * GET - buscar informações no backend
 * POST - criar uma nova informação no backend
 * PUT - editar uma informação no backend
 * DELETE - ..isso mesmo
 */

/**
 * Por padrão, o navegador não consegue executar o método POST.
 * Por isso, existem ferramentas para testar a API que permitem testar todos esses métodos,
 * como o Insomnia.rest (open source)
 */

/**
 * Há diversas maneiras de enviar requisições para o backend utilizando express;
 * com método GET, a maneira mais comum de enviar req é utilizando os Query params
 * "req.query" para acessar query params (para filtros)
 * (GET)'/users' return res.json({idade: req.query.idade})
 * Ex.: filtro -> http://localhost:3333/users?idade=21
 */

/**
 * Quando é preciso especificar a ser alterado/deletado, nos casos de PUT e DELETE, é usado
 * Route params como tipo do parâmetro
 * "req.params" para acessar route params (para edição, delete)
 * (PUT)'/users/:id' return res.json({id: req.params.id})
 * Ex.: deletar usuário -> http://localhost:3333/users/1  (no qual o valor 1 é o id do usuário)
 */

/**
 * outro tipo de parâmetro é o corpo da requisição, e há vários tipos. JSON!
 * "req.body" para acessar corpo sa requisição (para criação e edição)
 * (POST) return res.json(req.body)
 * É preciso utilizar um método para o express passar a processar requisições JSON:
 * app.use(express.json())
 */