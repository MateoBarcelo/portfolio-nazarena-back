const express = require('express')
const contactRouter = express.Router()
const nodemailer = require('nodemailer')

contactRouter.post('/', async(req, res, next) => {
    const {body} = req

    const {name, mail, text} = body

    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: "OAUTH2",
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_TOKEN,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            accessToken: process.env.OAUTH_ACCESS_TOKEN,
            expires: 3599
        }
    })

    const message = {
        from: mail,
        to: "nazarena.diaz@hotmail.com",
        subject: "CONSULTA",
        text: `De ${name} Correo: ${mail}: ${text}`

    }

    try {
        transport.sendMail(message, (err) => {
            if (err) {
                next(err)
                return
            }
        })
        res.status(202).end()
        transport.close()
    } catch(err) {
        next(err)
    }

})

module.exports = contactRouter
