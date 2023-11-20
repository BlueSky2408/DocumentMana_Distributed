import { createSlice } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../components/ToastHelper/toastHelper';

const initialState = {
    dataList: [],
    dataInfo: {},
    isUploadSuccess: false,
    isDeleteSuccess: false,
    isLoading: false,
    error: null,
};

const documentsSlice = createSlice({
    name: 'documents',
    initialState,
    reducers: {
        //LIST
        fetchListDocuments: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchSuccessDocuments: (state, action) => {
            state.dataList = action.payload;
            state.isLoading = false;
        },
        fetchFailureDocuments: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        //UPLOAD
        fetchUploadDocuments: (state) => {
            state.isUploadSuccess = false;
            state.isLoading = true;
            state.error = null;
        },
        fetchUploadDocumentsSuccess: (state, action) => {
            const { data } = action.payload;
            toastSuccess(data);
            state.isUploadSuccess = true;
            state.isLoading = false;
        },
        fetchUploadDocumentsFailure: (state, action) => {
            const { error } = action.payload;
            toastError(error);
            state.isLoading = false;
            state.error = error;
        },
        //DELETE
        fetchDeleteDocuments: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        fetchDeleteDocumentsSuccess: (state, action) => {
            const { data } = action.payload;
            toastSuccess(data);
            state.isLoading = false;
        },
        fetchDeleteDocumentsFailure: (state, action) => {
            const { error } = action.payload;
            toastError(error);
            state.isLoading = false;
            state.error = error;
        }
    },
});

export const {
    fetchListDocuments, fetchSuccessDocuments, fetchFailureDocuments,
    fetchUploadDocuments, fetchUploadDocumentsSuccess, fetchUploadDocumentsFailure,
    fetchDeleteDocuments, fetchDeleteDocumentsSuccess, fetchDeleteDocumentsFailure,
} = documentsSlice.actions;

export default documentsSlice.reducer;