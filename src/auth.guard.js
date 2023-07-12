import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
    const hasJwtToken = localStorage.getItem("token") === null ? false : true;
    return hasJwtToken ? <Outlet /> : <Navigate to={'/login'} replace />
}

export default AuthGuard;