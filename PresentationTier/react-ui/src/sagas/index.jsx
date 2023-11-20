import {
    fork,
} from 'redux-saga/effects';
import { watchLogin } from './login';
import { watchDocuments } from './documents';
// import { watchUser } from './users';

function* rootSaga() {
    yield fork(watchLogin);
    yield fork(watchDocuments);
    // yield fork(watchUser);
}

export default rootSaga;
