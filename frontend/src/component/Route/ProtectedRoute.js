import React from 'react';
import { Navigate, Route, Routes, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedRoute = ({ element: Element, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

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