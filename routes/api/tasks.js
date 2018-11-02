const router = require('express').Router();
const auth = require('../../middleware/auth');
const { TasksController } = require('../../controlles');

/*get all user tasks*/
router.get('/', auth.optional, TasksController.getAllTasks());

/*create task*/
router.post('/task', auth.optional, TasksController.createTasks());

/*delete task*/
router.delete('/:id', auth.optional, TasksController.deleteTask());

/*edit task*/
router.post('/update', auth.optional, TasksController.editTask());

module.exports = router;
