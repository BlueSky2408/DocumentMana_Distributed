import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// export const register = (username, email, password) => (dispatch) => {
//     return AuthService.register(username, email, password).then(
//         (response) => {
//             dispatch({
//                 type: REGISTER_SUCCESS,
//             });

//             dispatch({
//                 type: SET_MESSAGE,
//                 payload: response.data.message,
//             });

//             return Promise.resolve();
//         },
//         (error) => {
//             const message =
//                 (error.response &&
//                     error.response.data &&
//                     error.response.data.message) ||
//                 error.message ||
//                 error.toString();

//             dispatch({
//                 type: REGISTER_FAIL,
//             });

//             dispatch({
//                 type: SET_MESSAGE,
//                 payload: message,
//             });

//             return Promise.reject();
//         }
//     );
// };

export const login = (credentials) => async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' }); // Dispatch a login request action if you want to track the start of the process.

    try {
        const response = await axios.post('/api/users/login', credentials);

        if (response.data.accessToken) {
            const token = response.data.accessToken;

            // Store the token in local storage or in Redux store
            localStorage.setItem('token', token);
            dispatch({ type: 'LOGIN_SUCCESS', payload: token });

            // Set the auth token for subsequent requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            // Handle the case where accessToken is not present or not in expected format.
            console.error('Login failed: No accessToken found in response');
            dispatch({ type: 'LOGIN_FAILURE', error: 'No accessToken found in response' });
        }
    } catch (error) {
        console.error('Login failed:', error);
        dispatch({ type: 'LOGIN_FAILURE', error: error.toString() });
    }
};




// export const logout = () => (dispatch) => {
//     AuthService.logout();

//     dispatch({
//         type: LOGOUT,
//     });
// };
