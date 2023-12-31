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