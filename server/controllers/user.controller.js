const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { crypto } = require('../utils');

const registerUser = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (user) {
            res.status(400).json({ message: "User Already Exists" });
        } else {
            let password = crypto.generateHash(req.body.password);
            user = await userModel.create({
                name: req.body.name,
                age: req.body.age,
                contactNumber: req.body.contactNumber,
                email: req.body.email,
                password: password,
            })
            return res.status(201).json({ message: "User Added Successfully", data: user });
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Internal Server Error", error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ message: "User With This Email Is Not Registered" });
        let isPasswordValid = crypto.validateHash(req.body.password, user.password.salt, user.password.hash);
        if (!isPasswordValid) return res.status(400).json({ message: "Password Mismatch" });

        user = { user_id: user._id }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' });
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        return res.status(201).json({
            message: "User Logged In Successfully",
            tokens: {
                access: accessToken,
                refresh: refreshToken
            }
        });
    } catch (error) {
        return res.status(400).json({ message: "Internal Server Error", error: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        if (!users) return res.status(400).json({ message: "Users Data Not Found" });
        return res.status(200).json({ message: "Users Data Retrieval Successfully", data: users });
    } catch (error) {
        return res.status(400).json({ message: "Internal Server Error", error: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.params.id });
        if (!user) return res.status(400).json({ message: "User Data Not Found" });
        return res.status(200).json({ message: "User Data Retrieved Successfully", data: user });
    } catch (error) {
        return res.status(400).json({ message: "Internal Server Error", error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findOneAndDelete({ _id: req.params.id });
        if (!user) return res.status(400).json({ message: "User Data Not Found" });
        return res.status(200).json({ message: "User Data Deleted Successfully", data: user });
    } catch (error) {
        return res.status(400).json({ message: "Internal Server Error", error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        let user = await userModel.findById({ _id: req.params.id });
        if (!user) return res.status(400).json({ message: "User Not Found" });
        user = await userModel.findOneAndUpdate({ _id: req.params.id }, {
            ...req.body
        }, { new: true });
        return res.status(200).json({ message: "User Data Updated Successfully", data: user });
    } catch (error) {
        return res.status(400).json({ message: "Internal Server Error", error: error.message });
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
