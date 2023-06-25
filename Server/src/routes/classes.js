module.exports = function(app){
    const classes = require('../controllers/classes')

    app.route('/classes')
        .get(classes.list_Class)
        .post(classes.createClass)

    app.route('/class_id')
        .get(classes.list_Classes)
        .post(classes.Search_Class_ID)

    app.route('/classes/:classId')
        .get(classes.Class_ID)
        .put(classes.updateClass)
        .delete(classes.deleteClass)
}