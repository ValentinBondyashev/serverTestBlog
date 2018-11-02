const mongoose = require('mongoose');
const passport = require('passport');
const Users = mongoose.model('Users');

function createUser () {
    return async (req, res, next) => {
        const { body: { user } } = req;
        if(!user.email) {
            return res.status(422).json({
                errors: {
                    email: 'is required',
                },
            });
        }
        if(!user.password) {
            return res.status(422).json({
                errors: {
                    password: 'is required',
                },
            });
        }

        const newUser = new Users(user);

        newUser.setPassword(user.password);

        const finalUser = await newUser.save();
        return res.json({ user: finalUser.toAuthJSON() });
    }
}

function login () {
    return (req, res, next) => {
        const { body: { user } } = req;
        if(!user.email) {
            return res.status(422).json({
                errors: {
                    email: 'is required',
                },
            });
        }

        if(!user.password) {
            return res.status(422).json({
                errors: {
                    password: 'is required',
                },
            });
        }

        return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
            if(err) {
                return next(err);
            }

            if(passportUser) {
                const user = passportUser;
                user.token = passportUser.generateJWT();
                return res.json({ user: user.toAuthJSON() });
            }

            return status(400).info;
        })(req, res, next);
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
