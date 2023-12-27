const { User } = require('../models');
const { crypto } = require('../utils');

const saveUser = async (payload) => {
    try {
        payload.password = crypto.generateHash(payload.password);
        const user = await User.create(payload);
        return user;
    } catch (error) {
        return false;
    }
}

const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        return false;
    }
}

const getUserById = async (user_id) => {
    try {
        const user = await User.findById({ user_id });
        return user;
    } catch (error) {
        return false;
    }
}

const getUsers = async () => {
    try {
        const users = await User.find().select('-password');
        return users;
    } catch (error) {
        return false;
    }
}

module.exports = {
    saveUser,
    getUserByEmail,
    getUserById,
    getUsers
}
