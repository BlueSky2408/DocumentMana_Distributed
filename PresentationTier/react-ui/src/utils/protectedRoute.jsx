// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = (props) => {
//     const { component: Component, isAuthenticated } = props;
//     const user = useSelector((state => state.login.isAuthenticated))

//     return user ? <Component /> : <Navigate to="/login" replace={true} />;
// };

// export default ProtectedRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuthenticated }) => {
    return isAuthenticated ? <Component /> : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;

// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Navigate } from 'react-router-dom';
// import axios from 'axios'; // or use your preferred way to make HTTP requests
// import { setAuthentication } from '../path-to-your-redux-actions'; // Import the action to set authentication status

// const ProtectedRoute = ({ component: Component }) => {
//     const [isLoading, setIsLoading] = useState(true);
//     const isAuthenticated = useSelector(state => state.login.isAuthenticated);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const checkAuthentication = async () => {
//             try {
//                 const response = await axios.get('/api/auth/check'); // Replace with your auth check endpoint
//                 dispatch(setAuthentication(response.data.isAuthenticated));
//             } catch (error) {
//                 dispatch(setAuthentication(false));
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         if (!isAuthenticated) {
//             checkAuthentication();
//         } else {
//             setIsLoading(false);
//         }
//     }, [dispatch, isAuthenticated]);

//     if (isLoading) {
//         return <div>Loading...</div>; // Or any other loading indicator
//     }

//     return isAuthenticated ? <Component /> : <Navigate to="/login" replace={true} />;
// };

// export default ProtectedRoute;