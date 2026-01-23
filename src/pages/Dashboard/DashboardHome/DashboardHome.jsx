import React from "react";
import UserDashboard from "./UserDashboard";
import useAuth from "../../../hooks/useAuth";
import StaffDashboard from "./StaffDashboard";
import AdminDashboard from "./AdminDashboard";

export default function DashboardHome() {
    const { user } = useAuth();

    return (
        <div className="max-w-375 mx-auto p-10">
            {user?.email.endsWith("@civicconnect.com") ? (
                user?.email.startsWith("admin") ? (
                    <AdminDashboard />
                ) : (
                    <StaffDashboard />
                )
            ) : (
                <UserDashboard />
            )}
        </div>
    );
}
