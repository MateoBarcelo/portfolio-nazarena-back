const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const loginRoutes = require('express').Router()

const User = require('../models/User.js')

loginRoutes.post('/', async (request, response) => {
    const {body} = request
    const {username, password} = body

    const user = await User.findOne({username})

    const passwordCorrect = user === null 
    ? false 
    : await bcrypt.compare(password, user.passwordHash)

    if(!passwordCorrect) return response.status(401).json({
            error: "invalid user or password"
        })
        

    const userForToken = {
        id: user.id,
        username: user.username
    }

    const authToken = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 7 })

    response.header("Access-Control-Allow-Origin", "*")
    response.send({
        name: user.name,
        username: user.username,
        authToken
    })
})

module.exports = loginRoutes