import { axiosBodyToAPI } from './axiosService';
const API_LOGIN = "http://localhost:3001/api/users/login";
const API_REGISTER = "http://localhost:3001/api/users/signup";


export const fetchLoginApi = (params) => {
    const body = params;
    return axiosBodyToAPI('POST', API_LOGIN, body);
};

export const fetchRegisterApi = (params) => {
    const body = params;
    return axiosBodyToAPI('POST', API_REGISTER, body);
};