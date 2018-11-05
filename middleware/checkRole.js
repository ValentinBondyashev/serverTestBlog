const mongoose = require('mongoose');
const Users = mongoose.model('Users');

const roles = {
    'user': { can: ['read'] },
    'admin': { can: ['read', 'write', 'delete'] }
};

function permission (operation) {
    return async (req, res, next) => {
        const { params: { id } } = req;
        const { payload: { email } } = req;

        const user = await Users.findOne({email});

        if (!roles[user.role] ||
            roles[user.role].can.indexOf(operation) === -1) {
            return res.status(404).json({
                errors: {
                    message: 'You are\' t admin'
                },
            });
        } else {
            next();
        }

    }
}

module.exports = {
    permission
};
