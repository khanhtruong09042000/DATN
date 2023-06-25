const Schedule = require('../models/schedule')

exports.list_Schedule = function(req,res){
    Schedule.getAllSchedule(function(err,schedule){
        if(err){
            res.send(err)
        }else{
            res.send(schedule)
        }
    })
}

exports.Schedule_ID = function(req,res){
    Schedule.getSchedule(req.params.scheduleId, function(err,schedule){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(schedule)
        }
    })
}

exports.Search_Schedule_ID = function(req,res){
    const lich = req.body.ID
    Schedule.searchSchedule(lich, function(err,schedule){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(schedule)
        }
    })
}

exports.Search_Schedule_MA = function(req,res){
    const lich = req.body.MA_LOP_THI
    Schedule.searchSchedule_MA(lich, function(err,schedule){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(schedule)
        }
    })
}

exports.Search_Schedule_MSSV = function(req,res){
    const lich = req.body.MSSV
    Schedule.searchSchedule_MSSV(lich, function(err,schedule){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(schedule)
        }
    })
}

exports.createSchedule = function(req,res){
    const new_schedule = new Schedule(req.body)
    
    if(!new_schedule){
        res.status(400).send({error: true, message: 'Please provide schedule!'})
    }else{
        Schedule.createSchedule([new_schedule],function(err,schedule){
            if(err){
                res.send(err)
            }else{
                res.status(200).json(schedule)
            }
        })
    }
}

exports.updateSchedule = function(req,res){
    const new_schedule = new Schedule(req.body)

    Schedule.UpdateSchedule(req.params.scheduleId,new_schedule,function(err,schedule){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(schedule)
        }
    })
}

exports.updateSchedule1 = function(req,res){
    const new_schedule = new Schedule(req.body)

    Schedule.UpdateSchedule1(req.params.scheduleId,new_schedule,function(err,schedule){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(schedule)
        }
    })
}

exports.deleteSchedule = function(req,res){
    Schedule.DeleteSchedule(req.params.scheduleId,function(err,schedule){
        if(err){
            res.send(err)
        }else{
            res.status(200).json(schedule)
        }
    })
}
