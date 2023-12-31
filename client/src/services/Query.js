import axios from 'axios';

const BASE_URL_LOCAL = "http://localhost:8000";
const userRegisterQuery = async (payload, config) => {
    try {
        let response = await axios.post(`${BASE_URL_LOCAL}/api/user/register`, payload, config);
        return response;
    } catch (error) {
        throw error;
    }
}

const userLoginQuery = async (payload) => {
    try {
        let response = await axios.post(`${BASE_URL_LOCAL}/api/user/login`, payload);
        return response;
    } catch (error) {
        throw error;
    }
}

const userDeleteQuery = async (userId, config) => {
    try {
        await axios.delete(`${BASE_URL_LOCAL}/api/user/delete/${userId}`, config);
    } catch (error) {
        throw error;
    }
}

const userUpdateQuery = async (userId, payload, config) => {
    try {   
        let response = await axios.patch(`${BASE_URL_LOCAL}/api/user/update/${userId}`, payload, config);
        return response;
    } catch (error) {
        throw error;
    }
}

const getUsersDataQuery = async (config) => {
    try {
        let response = await axios.get(`${BASE_URL_LOCAL}/api/user/get/`, config);
        return response;
    } catch (error) {
        throw error;
    }
}

export { userRegisterQuery, userLoginQuery, getUsersDataQuery, userDeleteQuery, userUpdateQuery }
