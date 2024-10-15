// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// export default function Protected({ children, authentication = true }) {
//     const navigate = useNavigate();
//     const [loader, setLoader] = useState(true);
//     const authStatus = useSelector(state => state.auth.isAuthenticated); // Get authentication status from Redux store

//     useEffect(() => {
//         // Check if the user should be authenticated
//         if (authentication) {
//             if (authStatus !== true) {
//                 navigate("/login"); // Navigate to login if not authenticated
//             }
//         } else {
//             if (authStatus === true) {
//                 navigate("/"); // Navigate to home if authenticated and access to a non-auth route
//             }
//         }
//         setLoader(false); // Stop the loader after checking
//     }, [authStatus, navigate, authentication]);

//     return loader ? <h1>Loading...</h1> : <>{children}</>;
// }
