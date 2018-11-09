const mongoose = require('mongoose');
const Users = mongoose.model('Users');
const jwtDecode = require('jwt-decode');

const roles = {
    0: { can: ['read'] },
    1: { can: ['read', 'write', 'delete'] },
    2: { can: ['read', 'write', 'delete'] }
};

function checkPermissions (operation) {
    return async (req, res, next) => {
        const { headers: {authorization}  } = req;
        const email = jwtDecode(authorization.split(' ')[1]).email;
        const user = await Users.findOne({email});
        if (!roles[user.role] ||
            roles[user.role].can.indexOf(operation) === -1) {
            return res.status(404).json({
                errors: {
                    message: 'You are\'t admin'
                },
            });
        } else {
            next();
        }
    }
}

module.exports = {
    checkPermissions
};
