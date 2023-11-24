import { createSlice } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../components/ToastHelper/toastHelper';

const initialState = {
    dataList: [],
    dataInfo: [],
    isUploadSuccess: false,
    isRenameSuccess: false,
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
        //RENAME
        fetchRenameDocuments: (state) => {
            state.isRenameSuccess = false;
            state.isLoading = true;
            state.error = null;
        },
        fetchRenameDocumentsSuccess: (state, action) => {
            state.dataInfo = action.payload;
            state.isRenameSuccess = true;
            state.isLoading = false;
            // state.dataList = state.dataList.map(doc => doc.name === action.payload.currentName ? { ...doc, name: action.payload.newName } : doc);
        },
        fetchRenameDocumentsFailure: (state, action) => {
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
            state.dataInfo = action.payload;
            state.isDeleteSuccess = true;
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
    fetchRenameDocuments, fetchRenameDocumentsSuccess, fetchRenameDocumentsFailure,
    fetchDeleteDocuments, fetchDeleteDocumentsSuccess, fetchDeleteDocumentsFailure,
} = documentsSlice.actions;

export default documentsSlice.reducer;