const router = require('express').Router();
const { PostsController } = require('../../controlles');
const auth = require('../../middleware/auth');
const { PermissionsMiddleware } = require('../../middleware');

/*get posts*/
router.get('/:page', auth.optional, PostsController.getPosts());

/*create post*/
router.post('/post', auth.optional, PostsController.createPost());

/*get single post*/
router.get('/post/:id', auth.optional, PostsController.getPost());

/*delete post*/
router.delete('/:id', auth.optional, PermissionsMiddleware.checkPermissions('delete'), PostsController.deletePost());

/*edit post*/
router.post('/update', auth.optional, PostsController.updatePost());

module.exports = router;
