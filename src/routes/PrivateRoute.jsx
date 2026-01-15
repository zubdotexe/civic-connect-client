import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import { Navigate, useLocation } from "react-router";

export default function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Loading />;

    if (!user) return <Navigate to="/login" state={location.pathname}></Navigate>;

    return children;
}
