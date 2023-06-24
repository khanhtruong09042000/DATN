module.exports = function(app){
    const schedule = require('../controllers/schedules')

    app.route('/schedules')
        .get(schedule.list_Schedule)
        .post(schedule.createSchedule)

    app.route('/schedules_id')
        .post(schedule.Search_Schedule_ID)

    app.route('/schedules/:scheduleId')
        .get(schedule.Schedule_ID)
        .put(schedule.updateSchedule)
        .delete(schedule.deleteSchedule)
    
    app.route('/schedule/:scheduleId')
        .put(schedule.updateSchedule1)

    app.route('/schedules_ma')
        .post(schedule.Search_Schedule_MA)

    app.route('/schedules_mssv')
        .post(schedule.Search_Schedule_MSSV)
}