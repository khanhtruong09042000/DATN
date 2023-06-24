const Subject = require('../models/subject')

exports.list_Subject = function(req,res){
    Subject.getAllSubject(function(err,subject){
        if(err){
            res.send(err)
        }else{
            res.send(subject)
        }
    })
}

exports.list_Subject_ID = function(req,res){
    Subject.getSubjects(function(err,subject){
        if(err){
            res.send(err)
        }else{
            res.send(subject)
        }
    })
}

exports.Subject_ID = function(req,res){
    Subject.getSubject(req.params.subjectId, function(err,subject){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(subject)
        }
    })
}

exports.Subjects_ID = function(req,res){
    const ma = req.body.MA_HP
    Subject.getSubjects_id([ma], function(err,subject){
        if(err){
            res.send(err) 
        }else{
            res.status(200).json(subject)        
        }  
    })
}

exports.Search_Subjects_ID = function(req,res){
    const ma = req.body.MA_HP
    Subject.searchSubject(ma, function(err,subject){  
        if(err){
            res.send(err)
        }else{
            res.status(200).json(subject)
        }
    })
}

exports.createSubjects = function(req,res){
    const new_subject = new Subject(req.body)
    
    if(!new_subject){
        res.status(400).send({error: true, message: 'Please provide subject!'})
    }else{
        Subject.createSubject([new_subject],function(err,subject){
            if(err){
                res.send(err)
            }else{
                res.status(200).json(subject)
            }
        })
    }
}

exports.updateSubjects = function(req,res){
    const new_subject = new Subject(req.body)

    Subject.UpdateSubject(req.params.subjectId,new_subject,function(err,subject){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(subject)
        }
    })
}

exports.deleteSubjects = function(req,res){
    Subject.DeleteSubject(req.params.subjectId,function(err,subject){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(subject)
        }
    })
}
