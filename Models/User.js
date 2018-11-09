const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const roles = {
    user: 0,
    editor: 1,
    admin: 2,
};

const UsersSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    nickName: String,
    hash: String,
    salt: String,
    role: { type: Number, default: roles.user },
});

UsersSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        role: this.role,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
};

UsersSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        nickName: this.nickName,
        token: this.generateJWT(),
    };
};

module.exports = mongoose.model('Users', UsersSchema);
