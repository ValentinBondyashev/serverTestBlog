const router = require('express').Router();
const path = require('path');
const mongoose = require('mongoose');
const Sharp = require('sharp');
const multer = require('multer');
const mkdirp = require('mkdirp');
const diskStorage = require('../../utils/diskStorage');
const Post = mongoose.model('Post');
const File = mongoose.model('File');

const randomString = () => Math.random().toString(36).slice(-3);

const storage = diskStorage({
    destination: (req, file, callback) => {
        const dir = '/' + randomString() + '/' + randomString();
        req.dir = dir;
        mkdirp(`./uploads${dir}`, err => callback(err, `./uploads${dir}`));
    },
    filename: async (req, file, callback) => {
        const userId = req.headers.userid;
        const fileName = Date.now().toString(36) + path.extname(file.originalname);
        const dir = req.dir;

        // find post
        const post = await Post.findById(req.headers.postid);
        if (!post) {
            const err = new Error('No Post');
            err.code = 'NOPOST';
            return callback(err);
        }

        // upload
        const upload = await File.create({
            path: dir + '/' + fileName
        });

        console.log(upload, '==================');

        // write to post
        const uploads = await Post.update({_id: req.headers.postid}, {uploads: upload.id});
        /*const uploads = post.uploads;
        console.log(post);
        uploads.push(upload.id);
        post.uploads = uploads;
        await post.save();*/

        req.filePath = dir + '/' + fileName;

        callback(null, fileName);
    },
    sharp: (req, file, cb) => {
        const resizer = Sharp()
            .resize(1024, 768)
            .max()
            .withoutEnlargement()
            .toFormat('jpg')
            .jpeg({
                quality: 40,
                progressive: true
            });
        cb(null, resizer);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            const err = new Error('Extention');
            err.code = 'EXTENTION';
            return cb(err);
        }
        cb(null, true);
    }
});


/*upload file*/
router.post('/upload', upload.single('image'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {
        console.log('file received');
        return res.send({
            success: true,
            filePath: req.filePath
        })
    }
});

module.exports = router;
