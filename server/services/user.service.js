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
        const user = await User.findById({ _id: user_id });
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

const deleteUser = async (user_id) => {
    try {
        const user = await User.findOneAndDelete({ _id: user_id });
        return user;
    } catch (error) {
        return false;
    }
}

const updateUser = async (user_id, payload) => {
    try {
        const user = await User.findOneAndUpdate({ _id: user_id }, {
            ...payload
        }, { new: true });
        return user;
    } catch (error) {
        return false;
    }
}

module.exports = {
    saveUser,
    getUserByEmail,
    getUserById,
    getUsers,
    deleteUser,
    updateUser
}
