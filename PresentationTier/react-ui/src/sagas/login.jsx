import {
    fetchLoginApi,
    fetchRegisterApi,
} from '../api/loginAPI';

import {
    fetchLogin, fetchLoginSuccess, fetchLoginFailed,
    fetchRegister, fetchRegisterSuccess, fetchRegisterFailed,
} from '../reducers/login';
import {
    call,
    delay, put,
    takeLatest,
} from 'redux-saga/effects';


// Login
function* actionFetchLogin(action) {
    try {
        yield delay(500);
        const { params, navigate } = action.payload;
        const response = yield call(fetchLoginApi, params);
        console.log(response)
        // No need to handle token storage here as it's set in an httpOnly cookie by the server
        // Just handle the success response
        if (response.status === 200) {
            yield put(fetchLoginSuccess(response.data));
            navigate('/home');
        } else {
            yield put(fetchLoginFailed('Login failed'));
        }
    } catch (error) {
        console.error('Login failed:', error);
        yield put(fetchLoginFailed(error.toString()));
    }
}

function* actionFetchRegister(action) {
    try {
        const { params, navigate } = action.payload;
        const response = yield call(fetchRegisterApi, params);
        console.log(response)
        // No need to handle token storage here as it's set in an httpOnly cookie by the server
        // Just handle the success response
        if (response.status === 200) {
            yield put(fetchRegisterSuccess(response.data));
            navigate('/home');
        } else {
            yield put(fetchRegisterFailed('Login failed'));
        }
    } catch (error) {
        console.error('Login failed:', error);
        yield put(fetchRegisterFailed(error.toString()));
    }
}


export function* watchLogin() {
    yield takeLatest(fetchLogin.type, actionFetchLogin);
    yield takeLatest(fetchRegister.type, actionFetchRegister);

}


// function* actionFetchLogin(action) {
//     try {
//         yield delay(500);
//         const { params, navigate } = action.payload;
//         const axiosResponse = yield call(fetchLoginApi, params);

//         // Access the actual response data
//         const { accessToken, data, message } = axiosResponse.data;
//         console.log(data)

//         if (accessToken && accessToken.length > 0) {
//             const token = accessToken[0]; // Get the first element of the accessToken array

//             // Store the token and user info in local storage
//             localStorage.setItem('TOKEN', token);
//             if (data && data.length > 0) {
//                 localStorage.setItem('USER_INFO', JSON.stringify(data[0])); // Assuming you want the first element of the data array
//             }

//             yield put(fetchLoginSuccess(data ? data[0] : {}));
//             navigate('/home');
//         } else {
//             console.error('Login failed:', message || 'No accessToken found in response');
//             yield put(fetchLoginFailed(message || 'No accessToken found in response'));
//         }
//     } catch (error) {
//         console.error('Login failed:', error);
//         yield put(fetchLoginFailed(error.toString()));
//     }
// }