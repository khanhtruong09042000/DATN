module.exports = function(app){
    const student = require('../controllers/students')

    app.route('/students')
        .get(student.list_Student)
        .post(student.createStudents)

    app.route('/student_mssv')
        .get(student.list_Student_MSSV)
        .post(student.searchStudents)

    app.route('/students/:studentId')
        .get(student.Student_mssv)
        .put(student.updateStudents)
        .delete(student.deleteStudents)

    app.route('/classID')
        .post(student.searchDSS)
}