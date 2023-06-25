module.exports = function(app){
    const teacher = require('../controllers/teachers')

    app.route('/teachers')
        .get(teacher.list_Teacher)
        .post(teacher.createTeachers)

    app.route('/teacher_id') 
        .get(teacher.list_Teacher_ID)  
        .post(teacher.Search_ID)  

    app.route('/teachers/:teacherId')
        .get(teacher.Teacher_ID) 
        .put(teacher.updateTeachers) 
        .delete(teacher.deleteTeachers) 
}