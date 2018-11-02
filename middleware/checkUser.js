const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const Joi = require('joi');

const schema = Joi.object().keys({
    nickName: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string().email({ minDomainAtoms: 2 })
});

function checkUser () {
    return async (req, res, next) => {
        const { body: { user: { email, password, nickName } } } = req;

        const existingUser = await Users.findOne({email});

        if(email === existingUser.email){
            return res.status(422).json({
                errors: {
                    message: 'user with same email has already been created',
                },
            });
        }

        Joi.validate({ nickName: nickName, password: password, email: email }, schema, (err, value) => {
            if(err === null){
                next();
            }else{
                return res.status(422).json({
                    errors: {
                        message: err.details[0].message,
                    },
                });
            }
        });

        next();
    }
}

module.exports = {
    checkUser
};
