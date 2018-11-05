const router = require('express').Router();
const { PostsController } = require('../../controlles');
const auth = require('../../middleware/auth');

/*get all posts*/
router.get('/', auth.optional, PostsController.getAllPosts());

/*create post*/
router.post('/post', auth.optional, PostsController.createPost());

/*delete post*/
router.get('/:id', auth.optional, PostsController.getPost());

/*delete post*/
router.delete('/:id', auth.optional, PostsController.deletePost());

/*edit post*/
router.post('/update', auth.optional, PostsController.editPost());

module.exports = router;
