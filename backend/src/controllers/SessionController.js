/**
 * Dentro do controller há os seguintes métodos: 
 * index - para retornar uma listagem de sessions
 * show - para retornar uma unica session
 * store - para criar uma session 
 * update - atualizar
 * destroy - destruir
 */

// const email = req.body.email  =  { email } = req.body

const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const { email } = req.body

        let user = await User.findOne({ email })

        if (!user) {
            user = await User.create({ email })
        }

        return res.json(user)
    }
}

/**
 * JavaScript - assincronismo -> funcionalidade que permite "esperar uma instrução",
 * como por exemplo salvar uma informação no BD.  await (aguarda uma instrução ser executada).
 * Mas para usar o await dentro de uma função, é necessário informar que essa função é
 * assync
 */