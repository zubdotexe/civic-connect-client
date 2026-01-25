import React, { useEffect } from "react";
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

    useEffect(() => {
        document.title = `${role?.charAt(0).toUpperCase() + role?.slice(1)} Dashboard`;
    }, []);

    return (
        <div className="max-w-375 mx-auto p-10">
            {roleLoading ? <Loading /> : checkRole()}
        </div>
    );
}
