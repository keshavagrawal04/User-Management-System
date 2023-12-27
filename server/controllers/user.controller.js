const { userService } = require('../services');
const { crypto } = require('../utils');
const jwt = require('jsonwebtoken');
const { responseMessage } = require('../configs');
const { uploadOnCloudinary } = require('../utils');

const registerUser = async (req, res) => {
    try {
        let user = await userService.getUserByEmail(req.body.email);
        if (user) {
            res.status(400).json({ message: responseMessage.USER_ALREADY_EXISTS });
        } else {
            const profileImageLocalPath = req.files?.profileImage[0]?.path;
            const profileImage = await uploadOnCloudinary(profileImageLocalPath);
            req.body.profileImage = profileImage.url;
            user = await userService.saveUser(req.body);
            return res.status(201).json({ message: responseMessage.USER_REGISTERED, data: user });
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: responseMessage.INTERNAL_SERVER_ERROR, error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        let user = await userService.getUserByEmail(req.body.email);
        console.log(user)
        if (!user) return res.status(400).json({ message: responseMessage.USER_NOT_REGISTERED });
        let isPasswordValid = crypto.validateHash(req.body.password, user.password.salt, user.password.hash);
        if (!isPasswordValid) return res.status(400).json({ message: responseMessage.PASSWORD_MISMATCH });

        user = { user_id: user._id }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' });
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        return res.status(201).json({
            message: responseMessage.USER_LOGGED_IN,
            tokens: {
                access: accessToken,
                refresh: refreshToken
            }
        });
    } catch (error) {
        return res.status(400).json({ message: responseMessage.INTERNAL_SERVER_ERROR, error: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        if (!users) return res.status(400).json({ message: responseMessage.USERS_DATA_NOT_FOUND });
        return res.status(200).json({ message: responseMessage.USER_DATA_RETRIEVAL, data: users });
    } catch (error) {
        return res.status(400).json({ message: responseMessage.INTERNAL_SERVER_ERROR, error: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(400).json({ message: responseMessage.USER_DATA_NOT_FOUND });
        return res.status(200).json({ message: responseMessage.USER_DATA_RETRIEVAL, data: user });
    } catch (error) {
        return res.status(400).json({ message: responseMessage.INTERNAL_SERVER_ERROR, error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });
        if (!user) return res.status(400).json({ message: responseMessage.USER_DATA_NOT_FOUND });
        return res.status(200).json({ message: responseMessage.USER_DELETED, data: user });
    } catch (error) {
        return res.status(400).json({ message: responseMessage.INTERNAL_SERVER_ERROR, error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        let user = await User.findById({ _id: req.params.id });
        if (!user) return res.status(400).json({ message: responseMessage.USER.USER_DATA_NOT_FOUND });
        user = await User.findOneAndUpdate({ _id: req.params.id }, {
            ...req.body
        }, { new: true });
        return res.status(200).json({ message: responseMessage.USER_UPDATED, data: user });
    } catch (error) {
        return res.status(400).json({ message: responseMessage.INTERNAL_SERVER_ERROR, error: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
}
