import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuth } from "../redux/slices/authSlice";

const ProtectedRoutes = ({ children, role }) => {
    const { isAuthenticated, role: userRole } = useSelector(selectAuth);
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    /* if role of the user is not same as allowed role */
    if (role && role !== userRole) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoutes;
