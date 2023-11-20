import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
    const { component: Component, isAuthenticated } = props;
    const user = useSelector((state => state.login.isAuthenticated))

    return user ? <Component /> : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;


// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ component: Component, isAuthenticated }) => {
//     return isAuthenticated ? <Component /> : <Navigate to="/login" replace={true} />;
// };

// export default ProtectedRoute;