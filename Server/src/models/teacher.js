const dbSQL = require('../Database/SQL')

const Teacher = function(teacher){
    console.log(teacher)
    this.HO_TEN = teacher.HO_TEN
    this.ID = teacher.ID,
    this.GIOI_TINH = teacher.GIOI_TINH,
    this.NGAY_SINH = teacher.NGAY_SINH,
    this.SDT = teacher.SDT,
    this.DIA_CHI = teacher.DIA_CHI,
    this.VIEN = teacher.VIEN
}

Teacher.getAllTeacher = function getAllTeacher(result){
    dbSQL.query('Select * from giaovien', function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Teachers:" + res)
            result(null,res)
        }
    })
}

Teacher.getTeachers = function getTeachers(result){
    dbSQL.query('Select ID, HO_TEN from giaovien', function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Teachers:" + res)
            result(null,res)
        }
    })
}

Teacher.getTeacher = function getTeacher(ID,result){
    dbSQL.query('Select * from giaovien where ID = ?',ID,function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Teachers:" + res)
            result(null,res)
        }
    })
}

Teacher.searchTeacher = function searchTeacher(ID,result){
    dbSQL.query('Select * from giaovien where ID = ?',ID,function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Teachers:" + res)
            result(null,res)
        }
    })
}

Teacher.createTeacher = function createTeacher(newTeacher, result){
     dbSQL.query("Insert into giaovien set ?", newTeacher, function(err, res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,...newTeacher)
        }
    })
}

Teacher.UpdateTeacher = function UpdateTeacher(ID, teacher, result){
    dbSQL.query('Update giaovien set ID = ?, HO_TEN = ?,GIOI_TINH = ?, NGAY_SINH = ?,SDT = ?, DIA_CHI = ?,VIEN = ? where ID = ?',
    [teacher.ID, teacher.HO_TEN,teacher.GIOI_TINH, teacher.NGAY_SINH,teacher.SDT, teacher.DIA_CHI,teacher.VIEN,ID], function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Teachers:" + res)
            result(null,"Update Teachers!")
        }
    }
    )
}

Teacher.DeleteTeacher = function DeleteTeacher(ID,result){
    dbSQL.query('Delete from giaovien where ID = ?',ID, function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Teacher:" + res)
            result(null,"Delete Teacher!")
        }
    })
}

module.exports = Teacher