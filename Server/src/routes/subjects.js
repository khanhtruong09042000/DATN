module.exports = function(app){
    const subject = require('../controllers/subjects')

    app.route('/subjects')
        .get(subject.list_Subject)
        .post(subject.createSubjects)

    app.route('/subject_id')
        .get(subject.list_Subject_ID) 
        .post(subject.Search_Subjects_ID)

    // app.route('/subject_id')
    //     .post(subject.Subjects_ID)

    app.route('/subjects/:subjectId')
        .get(subject.Subject_ID)
        .put(subject.updateSubjects)
        .delete(subject.deleteSubjects)
}