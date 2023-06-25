const dbSQL = require('../Database/SQL')

const Schedule = function(schedule){
    console.log(schedule)
    this.ID = schedule.ID
    this.HINH_THUC_THI = schedule.HINH_THUC_THI,
    this.NGAY_THI = schedule.NGAY_THI,
    this.KY_HOC = schedule.KY_HOC,
    this.GIO_THI = schedule.GIO_THI,
    this.MA_LOP_THI = schedule.MA_LOP_THI,
    this.MA_HP = schedule.MA_HP
}

Schedule.getAllSchedule = function getAllSchedule(result){
    dbSQL.query('Select * from lichthi', function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Shedules:" + res)
            result(null,res)
        }
    })
}

Schedule.getSchedule = function getSchedule(id,result){
    dbSQL.query('Select * from lichthi where ID = ?',id,function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Schedule:" + res)
            result(null,res)
        }
    })
}

Schedule.searchSchedule = function searchSchedule(id,result){
    dbSQL.query('Select * from lichthi where ID = ?',id,function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Schedule:" + res)
            result(null,res)
        }
    })
}

Schedule.searchSchedule_MA = function searchSchedule_MA(id,result){
    dbSQL.query('Select * from lichthi where MA_LOP_THI = ?',id,function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Schedule:" + res)
            result(null,res)
        }
    })
}

Schedule.searchSchedule_MSSV = function searchSchedule_MSSV(id,result){
    dbSQL.query('select lt.ID,lt.HINH_THUC_THI,lt.NGAY_THI,lt.KY_HOC,lt.GIO_THI,lt.MA_LOP_THI,lt.MA_HP from lichthi lt inner join danhsachsv lh on lt.MA_LOP_THI = lh.MA_LOP_THI where lh.MSSV = ?',id,function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Schedule:" + res)
            result(null,res)
        }
    })
}

Schedule.createSchedule = function createSchedule(newSchedule, result){
     dbSQL.query("Insert into lichthi set ?", newSchedule, function(err, res){
        if(err){
            console.log(err)
            result(err,null)
        }else{
            result(null,...newSchedule)
        }
    })
}

Schedule.UpdateSchedule = function UpdateSchedule(id, schedule, result){
    dbSQL.query('Update lichthi set ID = ?, NGAY_THI = ?, KY_HOC = ?,MA_LOP_THI = ?,MA_HP = ? where ID = ?',
    [schedule.ID, schedule.NGAY_THI, schedule.KY_HOC,schedule.MA_LOP_THI,schedule.MA_HP,id], function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Schedule:" + res)
            result(null,"Update schedule!")
        }
    }
    )
}

Schedule.UpdateSchedule1 = function UpdateSchedule1(id, schedule, result){
    dbSQL.query('Update lichthi set HINH_THUC_THI = ?,GIO_THI = ? where ID = ?',
    [schedule.HINH_THUC_THI,schedule.GIO_THI,id], function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Schedule:" + res)
            result(null,"Update schedule!")
        }
    }
    )
}

Schedule.DeleteSchedule = function DeleteSchedule(id,result){
    dbSQL.query('Delete from lichthi where ID = ?',id, function(err,res){
        if(err){
            console.log(err)
            result(null,err)
        }else{
            console.log("Schedule:" + res)
            result(null,"Delete schedule!")
        }
    })
}

module.exports = Schedule