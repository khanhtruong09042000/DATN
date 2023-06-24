const dbSQL = require('../Database/SQL')

const Subject = function(subject){
    console.log(subject)
    this.MA_HP = subject.MA_HP
    this.TEN_HP = subject.TEN_HP,
    this.YEU_CAU_TN = subject.YEU_CAU_TN
    this.VIEN = subject.VIEN
}

Subject.getAllSubject = function getAllSubject(result){
    dbSQL.query('Select * from hocphan', function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("subject:" + res)
            result(null,res)
        }
    })
}

Subject.getSubjects = function getSubjects(result){
    dbSQL.query('Select MA_HP, TEN_HP from hocphan', function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("subject:" + res)
            result(null,res)
        }
    })
}

Subject.getSubjects_id = function getSubjects_id(id,result){
    dbSQL.query('Select TEN_HP from hocphan where MA_HP = ?',id, function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("subject:" + res)
            result(null,res)
        }
    })
}

Subject.getSubject = function getSubject(id,result){
    dbSQL.query('Select * from hocphan where MA_HP = ?',id,function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("subject:" + res)
            result(null,res)
        }
    })
}

Subject.searchSubject = function searchSubject(id,result){
    dbSQL.query('Select * from hocphan where MA_HP = ?',id,function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("subject:" + res)
            result(null,res)
        }
    })
}

Subject.createSubject = function createSubject(newSubject, result){
     dbSQL.query("Insert into hocphan set ?", newSubject, function(err, res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,...newSubject)
        }
    })
}

Subject.UpdateSubject = function UpdateSubject(id, subject, result){
    dbSQL.query('Update hocphan set MA_HP = ?, TEN_HP = ?,YEU_CAU_TN = ? , VIEN = ?where MA_HP = ?',
    [subject.MA_HP, subject.TEN_HP,subject.YEU_CAU_TN,subject.VIEN,id], function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("subject:" + res)
            result(null,"Update subject!")
        }
    }
    )
}

Subject.DeleteSubject = function DeleteSubject(id,result){
    dbSQL.query('Delete from hocphan where MA_HP = ?',id, function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("subject:" + res)
            result(null,"Delete subject!")
        }
    })
}

module.exports = Subject