const  User  = require('../models/User.js');

class UserDAO {

    async findUserByEmail(email) {
        return await User.findOne({ email }).select('id email password first_name last_name role');
    }

    async createUser(user) {
        return await User.create(user);
    }
}

module.exports = new UserDAO();