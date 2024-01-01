import axios from 'axios';

const BASE_URL = "http://localhost:8000";
const userRegisterQuery = async (payload, config) => {
    try {
        let response = await axios.post(`${BASE_URL}/api/user/register`, payload, config);
        return response;
    } catch (error) {
        throw error;
    }
}

const userLoginQuery = async (payload) => {
    try {
        let response = await axios.post(`${BASE_URL}/api/user/login`, payload);
        return response;
    } catch (error) {
        throw error;
    }
}

const userDeleteQuery = async (userId, config) => {
    try {
        await axios.delete(`${BASE_URL}/api/user/delete/${userId}`, config);
    } catch (error) {
        throw error;
    }
}

const userUpdateQuery = async (userId, payload, config) => {
    try {
        let response = await axios.patch(`${BASE_URL}/api/user/update/${userId}`, payload, config);
        return response;
    } catch (error) {
        throw error;
    }
}

const getUsersDataQuery = async (config) => {
    try {
        let response = await axios.get(`${BASE_URL}/api/user/get/`, config);
        return response;
    } catch (error) {
        throw error;
    }
}

const forgotPasswordQuery = async (email) => {
    try {
        let response = await axios.post(`${BASE_URL}/api/user/forgot-password`, email);
        return response;
    } catch (error) {
        throw error;
    }
}

const resetPasswordQuery = async (payload, config) => {
    try {
        let response = await axios.post(`${BASE_URL}/api/user/reset-password`, payload, config);
        return response;
    } catch (error) {
        throw error;
    }
}

export { userRegisterQuery, userLoginQuery, getUsersDataQuery, userDeleteQuery, userUpdateQuery, forgotPasswordQuery, resetPasswordQuery }
