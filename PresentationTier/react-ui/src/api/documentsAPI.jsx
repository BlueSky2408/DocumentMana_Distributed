import { axiosBodyToAPI, sendQueryToAPI } from "./axiosService";
import queryString from "query-string";

const API_LIST_DOCUMENT = "http://localhost:3001/api/documents/list";
const API_UPLOAD_DOCUMENT = "http://localhost:3001/api/documents/upload";
const API_DELETE_DOCUMENT = "http://localhost:3001/api/documents/delete";

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

export const fetchDeleteDocumentApi = (params = {}) => {
    const body = params;
    return axiosBodyToAPI('DELETE', API_DELETE_DOCUMENT, body);
}