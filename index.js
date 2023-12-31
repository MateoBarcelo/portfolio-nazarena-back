require('dotenv').config()
require('./mongo.js') //<--- Automatically connect to db

const express = require('express') // <-- COMMON JS

const server = express()

const cors = require('cors')

const Project = require('./models/Project')

const userRoutes = require('./controllers/users.js')
const projectRoutes = require('./controllers/projects.js')
const loginRoutes = require('./controllers/login.js')
const contactRouter = require('./controllers/contact.js')

const handleError = require('./middlewares/handleError.js')
const notFound = require('./middlewares/notFound.js')
const uploadRouter = require('./controllers/upload.js')

const path = require("path")

const CURRENT_DIR = path.join(__dirname)

server.use(express.json()) //Necessary to read request.body as json
server.use('/images', express.static('images'))

//Se crea un servidor, este servidor recibe un callback con dos parametros, request y response
//El callback se ejecuta cada vez que se hace una request al servidor
server.use(cors())
server.get('/', (request, response) => {
    response.send("<h1>Api used for Nazarena's Portfolio</h1>")
})

server.use('/api/projects', projectRoutes)

server.use('/api/upload', uploadRouter)

server.use('/api/users', userRoutes)

server.use('/api/login', loginRoutes)

server.use('/api/contact', contactRouter)

server.use('/media', express.static(path.join(CURRENT_DIR, "./uploads")))

server.use((req, res, next) => {
    // No hagas nada o envía una respuesta vacía
    if (req.originalUrl.includes('favicon.ico')) {
        res.status(204).end()
      } 

      next()
      
  });
  
server.use(notFound)

server.use(handleError)

const PORT = process.env.PORT

server.listen(PORT, (err) => {
    console.log(err)
    console.log("Server listening on port: ", PORT)
})

module.exports = server