const mySQL = require('mysql2')

var dbSQL = mySQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: '09042000', 
    database: 'datn',
    port: '8000'
})
dbSQL.connect((err)=>{
    if(err){
    throw err
    }else{
        console.log("Connected mySQL!")
    }
})

module.exports = dbSQL