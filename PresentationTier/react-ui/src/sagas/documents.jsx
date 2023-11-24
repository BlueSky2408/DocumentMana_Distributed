import {
    fetchListDocumentApi,
    fetchUploadDocumentApi,
    fetchRenameDocumentApi,
    fetchDeleteDocumentApi,
} from '../api/documentsAPI';

import {
    fetchListDocuments, fetchSuccessDocuments, fetchFailureDocuments,
    fetchUploadDocuments, fetchUploadDocumentsSuccess, fetchUploadDocumentsFailure,
    fetchRenameDocuments, fetchRenameDocumentsSuccess, fetchRenameDocumentsFailure,
    fetchDeleteDocuments, fetchDeleteDocumentsSuccess, fetchDeleteDocumentsFailure,
} from '../reducers/documents';
import {
    call,
    put, delay,
    takeLatest
} from 'redux-saga/effects';

// List
function* actionFetchDocuments(action) {
    try {
        const params = action.payload;
        const response = yield call(fetchListDocumentApi, params);
        if (response.status === 200) {
            const documents = response.data.data;
            console.log(documents)
            if (documents.length > 0) {
                yield put(fetchSuccessDocuments(documents));
            } else {
                yield put(fetchFailureDocuments('No documents received'));
            }
        } else {
            yield put(fetchFailureDocuments('Invalid response structure'));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        console.error('Documents fetch failed:', errorMessage);
        yield put(fetchFailureDocuments(errorMessage));
    }
}


// Upload
function* actionFetchUploadDocuments(action) {
    try {
        const params = action.payload;
        const response = yield call(fetchUploadDocumentApi, params);
        if (response.status === 200) {
            yield put(fetchUploadDocumentsSuccess(response.data));
            yield put(fetchListDocuments());
        } else {
            yield put(fetchUploadDocumentsFailure('Unable to upload document'));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        console.error('Documents upload failed:', errorMessage);
        yield put(fetchUploadDocumentsFailure(errorMessage));
    }
}

// Rename
function* actionFetchRenameDocuments(action) {
    try {
        const params = action.payload;
        const response = yield call(fetchRenameDocumentApi, params);
        if (response.status === 200) {
            yield put(fetchRenameDocumentsSuccess(response.data));
            yield put(fetchListDocuments());
        } else {
            yield put(fetchRenameDocumentsFailure('Unable to rename document'));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        console.error('Documents rename failed:', errorMessage);
        yield put(fetchRenameDocumentsFailure(errorMessage));
    }
}


// Delete
function* actionFetchDeleteDocuments(action) {
    try {
        const params = action.payload;
        console.log(params);
        const response = yield call(fetchDeleteDocumentApi, params);
        console.log(response);
        if (response.status === 200) {
            const doc = response.data;
            console.log(doc);
            yield put(fetchDeleteDocumentsSuccess(doc));
            // yield put(fetchListDocuments());
        } else {
            yield put(fetchDeleteDocumentsFailure('Unable to delete document'));
        }
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        console.error('Documents delete failed:', errorMessage);
        yield put(fetchDeleteDocumentsFailure(errorMessage));
    }
}


export function* watchDocuments() {
    yield takeLatest(fetchListDocuments.type, actionFetchDocuments);
    yield takeLatest(fetchUploadDocuments.type, actionFetchUploadDocuments);
    yield takeLatest(fetchRenameDocuments.type, actionFetchRenameDocuments);
    yield takeLatest(fetchDeleteDocuments.type, actionFetchDeleteDocuments);
}