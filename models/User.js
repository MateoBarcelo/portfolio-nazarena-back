const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: String,
    name: String,
    passwordHash: String,
    projects: [{
        type: Schema.Types.ObjectId, // <--- Se indica que se va a guardar un array con objetos de tipo objId
        ref: 'Project' // <--- Se crea una referencia que lleve a la colección de projects para poder recuperar después toda la info de cada project

    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id

        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = model('User', userSchema)

module.exports = User