const Class = require('../models/class')

exports.list_Class = function(req,res){
    Class.getAllClass(function(err,classs){
        if(err){
            res.send(err) 
        }else{
            res.send(classs)
        }
    })
}

exports.list_Classes = function(req,res){
    Class.getClass_ID(function(err,classs){
        if(err){
            res.send(err) 
        }else{
            res.send(classs)
        }
    })
}

exports.Class_ID = function(req,res){
    Class.getClass(req.params.classId, function(err,classs){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(classs)
        }
    })
}

exports.Search_Class_ID = function(req,res){
    const lop = req.body.MA_LOP_THI
    Class.searchClass(lop, function(err,classs){
        if(err){
            res.send(err)
        }else{ 
            res.status(200).json(classs)
        }
    })
}

exports.createClass = function(req,res){
    const new_class = new Class(req.body)
    
    if(!new_class){
        res.status(400).send({error: true, message: 'Please provide class!'})
    }else{
        Class.createClass([new_class],function(err,classs){
            if(err){
                res.send(err)
            }else{
                res.status(200).json(classs)
            }
        })
    }
}

exports.updateClass = function(req,res){
    const new_class = new Class(req.body)

    Class.UpdateClass(req.params.classId,new_class,function(err,classs){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(classs)
        }
    })
}

exports.deleteClass = function(req,res){
    Class.DeleteClass(req.params.classId,function(err,classs){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(classs)
        }
    })
}
