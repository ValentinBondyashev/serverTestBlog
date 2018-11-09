const mongoose = require('mongoose');
const Post = mongoose.model('Post');

function getPosts () {
    return async (req, res) => {
        const perPage = 5;
        const { params: { page } } = req;
        const countPosts = await Post.find({}).count();
        const posts = await Post.find({}).skip((perPage * page) - perPage).limit(perPage);
        return res.json({ posts, countPosts })
    }
}

function getPost () {
    return async (req, res) => {
        const { params: { id } } = req;
        const post = await Post.find({_id:id});
        return res.json({ post })
    }
}

function createPost () {
    return async (req, res) => {
        const { body: { post } } = req;
        const finalPost = await Post(post).save();
        return  res.json({ post: finalPost });
    }
}

function deletePost () {
    return async (req, res) => {
        const { params: { id } } = req;
        const post = await Post.findByIdAndRemove(id);
        return res.json({ post: post });
    }
}

function updatePost () {
    return async (req, res) => {
        const { body } = req;
        console.log(body);
        const post = await Post.update({_id: body.postId}, {title: body.title, text: body.text});
        return res.json({ post: post });
    }
}

module.exports = {
    getPosts,
    createPost,
    deletePost,
    updatePost,
    getPost
};
