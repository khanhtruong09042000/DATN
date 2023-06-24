const dbSQL = require('../Database/SQL')

const Class = function(classs){
    console.log(classs)
    this.MA_LOP_THI = classs.MA_LOP_THI
    this.TEN_LOP_THI = classs.TEN_LOP_THI,
    this.ID = classs.ID,
    this.MA_HP = classs.MA_HP
}

Class.getAllClass = function getAllClass(result){
    dbSQL.query('Select * from lopthi', function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Classes:" + res)
            result(null,res)
        }
    })
}

Class.getClass_ID = function getClass_ID(result){
    dbSQL.query('Select MA_LOP_THI,TEN_LOP_THI from lopthi', function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Classes:" + res)
            result(null,res)
        }
    })
}

Class.getClass = function getClass(id,result){
    dbSQL.query('Select * from lopthi where MA_LOP_THI = ?',id,function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Class:" + res)
            result(null,res)
        }
    })
}

Class.searchClass = function searchClass(id,result){
    dbSQL.query('Select * from lopthi where MA_LOP_THI = ?',id,function(err,res){
        if(err){ 
            console.log(err)
            result(null,err)
        }else{
            console.log("Class:" + res)
            result(null,res)
        }
    })
}

Class.createClass = function createClass(newClass, result){
     dbSQL.query("Insert into lopthi set ?", newClass, function(err, res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,...newClass)
        }
    })
}

Class.UpdateClass = function UpdateClass(id, classs, result){
    dbSQL.query('Update lopthi set MA_LOP_THI = ?, TEN_LOP_THI = ?,ID = ?, MA_HP = ? where MA_LOP_THI = ?',
    [classs.MA_LOP_THI, classs.TEN_LOP_THI,classs.ID, classs.MA_HP,id], function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Class:" + res)
            result(null,"Update class!")
        }
    }
    )
}

Class.DeleteClass = function DeleteClass(id,result){
    dbSQL.query('Delete from lopthi where MA_LOP_THI = ?',id, function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Class:" + res)
            result(null,"Delete class!")
        }
    })
}

module.exports = Class