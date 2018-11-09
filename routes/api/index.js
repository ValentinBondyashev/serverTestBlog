const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/messages', require('./messages'));
router.use('/tasks', require('./tasks'));
router.use('/posts', require('./post'));
router.use('/upload', require('./upload'));

module.exports = router;
