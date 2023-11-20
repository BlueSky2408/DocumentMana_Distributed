// import axios from 'axios';

// export const fetchData = () => async (dispatch) => {
//     try {
//         const token = localStorage.getItem('token');

//         const response = await axios.get('/api/documents/', {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });

//         dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
//     } catch (error) {
//         console.error('Failed to fetch data:', error);
//         dispatch({ type: 'FETCH_DATA_FAILURE', payload: error });
//     }
// };

import axios from 'axios';

export const fetchData = () => async (dispatch) => {
    try {
        const response = await axios.get('/api/documents/list');
        const data = response.data;
        console.log(response.data);

        // dispatch({ type: 'FETCH_DATA_REQUEST' });
        dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
    } catch (error) {
        console.error('Data fetch failed:', error);
        dispatch({ type: 'FETCH_DATA_FAILURE', payload: error });
    }
};