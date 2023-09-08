const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI

//mongo db connection

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connected!')
}).catch(err => {
    console.error(err)
})
//CREATE PROJECT

/*const project = new Project({
    name: "Serenisima",
    year: 2022,
    desc: "El trabajo realizado fue rediseñar su logo, las etiquetas de sus dulces, y la carta de merienda de su hermosa casa de té",
    img: "ana.png",
    category: "Marca",
    linkto: "#"
})

project.save().then(result => {
    console.log(result)
    mongoose.connection.close()
}).catch(err => {
    console.log(err)
})*/