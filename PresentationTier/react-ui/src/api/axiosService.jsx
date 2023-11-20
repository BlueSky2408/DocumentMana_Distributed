import axios from 'axios';

// Set withCredentials to true for all requests
axios.defaults.withCredentials = true;

export const axiosBodyToAPI = async (method, uri, body, json = true) => {
    try {
        // const xAccessToken = getToken() ? getToken() : '';
        const headerConfig = {};
        let result;
        if (method === 'POST') {
            result = await axios.post(uri, body, headerConfig);
        } else if (method === 'PUT') {
            result = await axios.put(uri, body, headerConfig);
        } else if (method === 'DELETE') {
            const config = {
                ...headerConfig,
                data: body,
            };
            result = await axios.delete(uri, config);
        } else {
            result = await axios.post(uri, body, headerConfig);
        }
        return result;
    } catch (error) {
        console.log(error, 'errors')
        return error;
    }
};
export const sendQueryToAPI = async (uri) => {
    try {
        const headerConfig = {};
        const result = await axios.get(uri, headerConfig);
        return result;
    } catch (error) {
        return error;
    }
};