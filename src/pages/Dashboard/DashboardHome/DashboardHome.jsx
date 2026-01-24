import React from "react";
import UserDashboard from "./UserDashboard";

import StaffDashboard from "./StaffDashboard";
import AdminDashboard from "./AdminDashboard";
import useRole from "../../../hooks/useRole";
import Loading from "../../../components/Loading";

export default function DashboardHome() {
    const { role, roleLoading } = useRole();

    const checkRole = () => {
        switch (role) {
            case "admin":
                return <AdminDashboard />;
            case "staff":
                return <StaffDashboard />;
            case "user":
                return <UserDashboard />;
        }
    };

    return (
        <div className="max-w-375 mx-auto p-10">
            {roleLoading ? <Loading /> : checkRole()}
        </div>
    );
}
