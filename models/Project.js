const mongoose = require('mongoose')
const { Schema, model} = mongoose

const projSchema = new Schema({
    name: String,
    year: Number,
    desc: String,
    img: String,
    category: String,
    linkto: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

projSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject.__v
        delete returnedObject._id
    }
})
const Project = model('Project', projSchema)

module.exports = Project