const router = require('express').Router();
const auth = require('../../middleware/auth');
const { UserMiddleware } = require('../../middleware');
const { UsersController } = require('../../controlles');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, UserMiddleware.checkUser() , UsersController.createUser());

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, UsersController.login());

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required,  UsersController.currentUser());

module.exports = router;
