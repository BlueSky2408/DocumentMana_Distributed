import { axiosBodyToAPI, sendQueryToAPI } from "./axiosService";
import queryString from "query-string";

const API_HOST = process.env.API_HOST || "http://localhost";
const API_LIST_DOCUMENT = `${API_HOST}/api/documents/list`;
const API_UPLOAD_DOCUMENT = `${API_HOST}/api/documents/upload`;
const API_RENAME_DOCUMENT = `${API_HOST}/api/documents/rename`;
const API_DELETE_DOCUMENT = `${API_HOST}/api/documents/delete`;

export const fetchListDocumentApi = (params = {}) => {
    let queryParams = '';
    if (Object.keys(params).length > 0) {
        queryParams = `?${queryString.stringify(params)}`;
    }
    return sendQueryToAPI(`${API_LIST_DOCUMENT}${queryParams}`);
};

export const fetchUploadDocumentApi = (params = {}) => {
    const body = params;
    return axiosBodyToAPI('POST', API_UPLOAD_DOCUMENT, body);
}

export const fetchRenameDocumentApi = (params = {}) => {
    const body = params;
    return axiosBodyToAPI('PUT', API_RENAME_DOCUMENT, body);
}

export const fetchDeleteDocumentApi = (params = {}) => {
    const body = params;
    return axiosBodyToAPI('DELETE', API_DELETE_DOCUMENT, body);
}