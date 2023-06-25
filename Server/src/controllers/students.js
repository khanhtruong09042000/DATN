const Student = require('../models/student')

exports.list_Student = function(req,res){
    Student.getAllStudent(function(err,student){
        if(err){
            res.send(err)
        }else{
            res.send(student)
        }
    })
}

exports.list_Student_MSSV = function(req,res){
    Student.getStudents(function(err,student){
        if(err){
            res.send(err)
        }else{
            res.send(student)
        }
    })
}


exports.Student_mssv = function(req,res){
    Student.getStudent(req.params.studentId, function(err,student){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(student)
        }
    })
}

exports.createStudents = function(req,res){
    const new_student = new Student(req.body)
    
    if(!new_student){
        res.status(400).send({error: true, message: 'Please provide student!'})
    }else{
        Student.createStudent([new_student],function(err,student){
            if(err){
                res.send(err)
            }else{
                res.status(200).json(student)
            }
        })
    }
}

exports.searchStudents = function(req,res){
    const new_student = req.body.MSSV

    Student.searchStudent(new_student,function(err,student){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(student)
        }
    })
}

exports.updateStudents = function(req,res){
    const new_student = new Student(req.body)

    Student.UpdateStudent(req.params.studentId,new_student,function(err,student){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(student)
        }
    })
}

exports.deleteStudents = function(req,res){
    Student.DeleteStudent(req.params.studentId,function(err,student){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(student)
        }
    })
}

exports.searchDSS = function(req,res){
    const new_class = req.body.MA_LOP_THI
    Student.searchDS(new_class,function(err,student){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(student)
        }
    })
}
