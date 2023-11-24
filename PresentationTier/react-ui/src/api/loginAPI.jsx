import { axiosBodyToAPI } from './axiosService';

const API_HOST = process.env.API_HOST || "http://localhost";
const API_LOGIN = `${API_HOST}/api/users/login`;
const API_REGISTER = `${API_HOST}/api/users/signup`;


export const fetchLoginApi = (params) => {
    const body = params;
    return axiosBodyToAPI('POST', API_LOGIN, body);
};

export const fetchRegisterApi = (params) => {
    const body = params;
    return axiosBodyToAPI('POST', API_REGISTER, body);
};