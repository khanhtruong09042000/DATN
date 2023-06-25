const dbSQL = require('../Database/SQL')

const Student = function(student){
    console.log(student)
    this.HO_TEN = student.HO_TEN
    this.MSSV = student.MSSV,
    this.GIOI_TINH = student.GIOI_TINH,
    this.NGAY_SINH = student.NGAY_SINH,
    this.LOP = student.LOP,
    this.DIA_CHI = student.DIA_CHI,
    this.VIEN = student.VIEN
}

Student.getAllStudent = function getAllStudent(result){
    dbSQL.query('Select * from sinhvien', function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Students:" + res)
            result(null,res)
        }
    })
}

Student.getStudents = function getStudents(result){
    dbSQL.query('Select MSSV, HO_TEN from sinhvien', function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Students:" + res)
            result(null,res)
        }
    })
}

Student.getStudent = function getStudent(Mssv,result){
    dbSQL.query('Select * from sinhvien where mssv = ?',Mssv,function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Student:" + res)
            result(null,res)
        }
    })
}

Student.searchStudent = function searchStudent(Mssv,result){
    dbSQL.query('Select * from sinhvien where mssv = ?',Mssv,function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Student:" + JSON.stringify(res))
            result(null,res)
        }
    })
}

Student.createStudent = function createStudent(newStudent, result){
     dbSQL.query("Insert into sinhvien set ?", newStudent, function(err, res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,...newStudent)
        } 
    })
}

Student.UpdateStudent = function UpdateStudent(mssv, student, result){
    dbSQL.query('Update sinhvien set MSSV = ?, HO_TEN = ?,GIOI_TINH = ?, NGAY_SINH = ?,LOP = ?, DIA_CHI = ?,VIEN = ? where mssv = ?',
    [student.MSSV, student.HO_TEN,student.GIOI_TINH, student.NGAY_SINH,student.LOP, student.DIA_CHI,student.VIEN,mssv], function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Student:" + res)
            result(null,"Update student!")
        }
    }
    )
}

Student.DeleteStudent = function DeleteStudent(mssv,result){
    dbSQL.query('Delete from sinhvien where mssv = ?',mssv, function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Student:" + res)
            result(null,"Delete student!")
        }
    })
}

Student.searchDS = function searchDS(id, result){
    dbSQL.query('select lh.MA_LOP_THI,sv.HO_TEN,sv.MSSV, sv.NGAY_SINH, sv.GIOI_TINH, sv.LOP from sinhvien sv inner join danhsachsv lh on sv.MSSV = lh.MSSV where lh.MA_LOP_THI = ?',id, function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Student:" + JSON.stringify(res))
            result(null,res)
        }
    })
}

module.exports = Student