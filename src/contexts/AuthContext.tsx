// // src/components/ProtectedRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
//
// const ProtectedRoute = ({ element }) => {
//     const token = localStorage.getItem('authToken');
//
//     if (!token) {
//         return <Navigate to="/login" />;
//     }
//
//     return element;
// };
//
// export default ProtectedRoute;
