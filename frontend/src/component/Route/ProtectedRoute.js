import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
    const { loading, isAuthenticated} = useSelector((state) => state.user);

    return (
        <>
            {!loading && (
                isAuthenticated ? <Outlet /> : <Navigate to="/login" />
            )
            }



        </>
    )
};

export default ProtectedRoute;