const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mySQL = require('mysql2')
const mongoose = require('mongoose')
const cors = require('cors')
const students = require('./src/routes/students')
const teachers = require('./src/routes/teachers')
const subjects = require('./src/routes/subjects')
const classes = require('./src/routes/classes')
const schedules = require('./src/routes/schedules')
const auth = require('./src/routes/auth')
const user = require('./src/routes/user')

dotenv.config() 
app.use(cors())
app.use(express.json({limit: '50mb'}));

var dbSQL = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: '09042000',
    database: 'datn',
    port: '8000'
})
dbSQL.connect()

mongoose.connect(process.env.MONGODB_ENV)
    .then(() => console.log('Connected mongoDB!'))
    .catch((err) => {
        console.log(err);
    })

// CALL API MYSQL
students(app)
teachers(app)
subjects(app)
classes(app)
schedules(app) 
// CALL API MONGODB
app.use('/auth', auth)
app.use('/user', user)

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running!')
})