import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
// import { AuthContext } from '../contexts/AuthContext';
import {useAuth} from '../contexts/AuthProvider';

const ProtectedLayout = () => {
    const {user, loading} = useAuth();

    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>
    }
    if (!user) {
        return <Navigate to="/login" state={{from: location}} replace />
    }

  return <Outlet />
}

export default ProtectedLayout