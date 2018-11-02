const router = require('express').Router();
const auth = require('../../middleware/auth');
const { MessagesController } = require('../../controlles');

/*get all messages*/
router.get('/', auth.optional, MessagesController.getAll());

/*send message*/
router.post('/message', auth.optional, MessagesController.sendMessage());


module.exports = router;
