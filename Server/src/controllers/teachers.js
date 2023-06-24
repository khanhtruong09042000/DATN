const Teacher = require('../models/teacher')

exports.list_Teacher = function(req,res){
    Teacher.getAllTeacher(function(err,teacher){
        if(err){
            res.send(err)
        }else{
            res.send(teacher)
        }
    })
}

exports.list_Teacher_ID = function(req,res){
    Teacher.getTeachers(function(err,teacher){
        if(err){
            res.send(err)
        }else{
            res.send(teacher)
        }
    })
}

exports.Teacher_ID = function(req,res){
    Teacher.getTeacher(req.params.teacherId, function(err,teacher){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(teacher)
        }
    })
}

exports.Search_ID = function(req,res){
    const new_teacher = req.body.ID
    Teacher.searchTeacher(new_teacher, function(err,teacher){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(teacher)
        }
    })
}

exports.createTeachers = function(req,res){
    const new_teacher = new Teacher(req.body)
    
    if(!new_teacher){
        res.status(400).send({error: true, message: 'Please provide teacher!'})
    }else{
        Teacher.createTeacher([new_teacher],function(err,teacher){
            if(err){
                res.send(err)
            }else{
                res.status(200).json(teacher)
            }
        })
    }
}

exports.updateTeachers = function(req,res){
    const new_teacher = new Teacher(req.body)

    Teacher.UpdateTeacher(req.params.teacherId,new_teacher,function(err,teacher){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(teacher)
        }
    })
}

exports.deleteTeachers = function(req,res){
    Teacher.DeleteTeacher(req.params.teacherId,function(err,teacher){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(teacher)
        }
    })
}
