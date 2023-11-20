const initialState = {
    data: [],
    loading: false,
    error: null,
};

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DATA_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_DATA_SUCCESS':
            return {
                ...state,
                data: action.payload.data,
                loading: false,
                error: null,
            };
        case 'FETCH_DATA_FAILURE':
            return {
                ...state,
                data: [],
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};