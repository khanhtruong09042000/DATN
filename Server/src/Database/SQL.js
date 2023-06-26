const mySQL = require('mysql2')

var dbSQL = mySQL.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    database: process.env.DB_DATA,
    port: process.env.DB_PORT
})
dbSQL.connect((err)=>{
    if(err){
    throw err
    }else{
        console.log("Connected mySQL!")
    }
})

module.exports = dbSQL
