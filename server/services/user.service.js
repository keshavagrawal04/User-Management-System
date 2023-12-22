const userModel = require('../models/user.model');

const saveUser = async (payload) => {
    try {
        const user = await userModel.create({
            name: payload.name,
            age: payload.age,
            contactNumber: payload.contactNumber,
            email: payload.email,
            password: payload.password,
        })
    } catch (error) {
        
    }
}
