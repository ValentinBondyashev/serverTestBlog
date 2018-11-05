const mongoose = require('mongoose');
const Post = mongoose.model('Post');

function getAllPosts () {
    return async (req, res) => {
        const posts = await Post.find({}) /*.skip(3).limit(1)*/;
        return res.json({ posts })
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

function editPost () {
    return async (req, res) => {
        const { body } = req;
        const post = await Post.update({_id: body.id}, {post: body.post, dateCreated: new Date});
        return res.json({ post: post });
    }
}

module.exports = {
    getAllPosts,
    createPost,
    deletePost,
    editPost,
    getPost
};
