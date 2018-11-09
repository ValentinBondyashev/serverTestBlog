const mongoose = require('mongoose');
const passport = require('passport');
const Joi = require('joi');

const Users = mongoose.model('Users');
const UserSchema = require('../validators/UserSchema');

function createUser () {
    return async (req, res) => {
        Joi.validate(req.body.user, UserSchema.register, async (err, data) => {
            if(!err){
                const newUser = new Users(data);

                newUser.setPassword(data.password);

                const finalUser = await newUser.save();
                req.session.userId = finalUser._id;
                req.session.userLogin = finalUser.email;
                return res.json({ user: finalUser.toAuthJSON() });
            }else {
                res.status(400);
                res.send(err);
            }
        });
    }
}

function login () {
    return (req, res) => {
        const { body: { user } } = req;
        Joi.validate(user, UserSchema.login, async() => {
            return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
                if(err) {
                    return next(err);
                }
                if(passportUser) {
                    const user = passportUser;
                    user.token = passportUser.generateJWT();
                    req.session.cookie.userId = user._id;
                    req.session.cookie.userLogin = user.email;
                    console.log(req.session);
                    return res.json({ user: user.toAuthJSON() });
                }

                return status(400).info;
            })(req, res);
        });
    }
}

function currentUser () {
    return async (req, res, next) => {
        const { payload: { id } } = req;

        const user = await Users.findById(id);
        if(!user) {
            return res.sendStatus(400);
        }else {
            return res.json({ user: user.toAuthJSON() });
        }
    }
}

module.exports = {
    createUser,
    login,
    currentUser
};
