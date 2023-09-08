const bcrypt = require('bcrypt')
const userRoutes = require('express').Router()
const User = require('../models/User.js')

userRoutes.get('/', (request, response) => {
    
    User.find({}).populate('projects', {
        user: 0
    }).then(users => {
        response.json(users).status(200).end()
    })
})

userRoutes.post('/', async (request, response) => {
    const {body} = request

    const {username, name, password} = body

    const passwordHash = await bcrypt.hash(password, 10) //10 indicates number of salt rounds

    let userTaken = false;

    const Users = await User.find({})
    Users.map(user => {
        userTaken = user.username === username
    })
    
    if(userTaken) return response.status(400).json({error: "username already taken!"})

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await newUser.save()

    response.json(savedUser)
})

module.exports = userRoutes

