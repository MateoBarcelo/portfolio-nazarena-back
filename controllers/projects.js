const express = require('express')
const jwt = require('jsonwebtoken')
const projectRoutes = express.Router()
const handleError = require('../middlewares/handleError.js')
const userExtractor = require('../middlewares/userExtractor.js')
const Project = require('../models/Project.js')
const User = require('../models/User.js')

projectRoutes.get('/', (request, response, next) => {

    Project.find({}).populate('user', {
        projects: 0
    }).then(projects => {
        response.json(projects)
    }).catch(err => next(err))

})

projectRoutes.post('/', userExtractor, async (request, response, next) => { //we can pass in middlewares on second parameter of http method

    const {body} = request
    const {name, year, description, img, category, linkto} = body

    const { userId } = request

    const user = await User.findById(userId)

    if(!body|| !name) {
        return response.status(400).json({
            error: "project name is missing"
        })
    }

    const newProject = new Project({
        name,
        year,
        description,
        img,
        category,
        linkto,
        user: user.toJSON().id
    })

    try {
        const savedProject = await newProject.save()

        user.projects = user.projects.concat(savedProject._id)
        await user.save() //<- guardar cambios que se le hizo al usuario con el concat
    
        response.json(savedProject).status(201)
    } catch (error) {
        next(error)
    }
})

projectRoutes.get('/:id', (request, response, next) => {

    const { id } = request.params
    Project.findById(id).then(project => {

        if(project) return response.json(project).status(200)
        response.status(400).end()

    }).catch(err => next(err))
})

projectRoutes.put('/:id', (request, response, next) => {
    const {id} = request.params
    const {name, year, desc, img, category, linkto, user} = request.body

    const newProjectInfo = new Project({
        name,
        year,
        desc,
        img,
        category,
        linkto,
        user
    })

    Project.findByIdAndUpdate(id, newProjectInfo, {new: true}).then(result => {
        response.json(result).status(200).end()
    }).catch(err => next(err))
})

projectRoutes.delete('/:id', userExtractor, (request, response) => {
    const {id} = request.params

    Project.findByIdAndRemove(id).then(result => {
        response.json(result).status(200).end()
    }).catch(err => next(err))
})

projectRoutes.use(handleError)

module.exports = projectRoutes