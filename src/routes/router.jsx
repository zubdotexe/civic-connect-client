import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AllIssues from "../pages/AllIssues/AllIssues";
import IssueDetails from "../pages/Issue/IssueDetails";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/NotFound/NotFound";
import DashboardLayout from "../layouts/DashboardLayout";
import ReportIssue from "../pages/Dashboard/ReportIssue/ReportIssue";
import StaffRegister from "../pages/StaffRegister/StaffRegister";
import MyIssues from "../pages/Dashboard/MyIssues/MyIssues";
import UserProfile from "../pages/Dashboard/Profile/UserProfile";
import ManageStaffs from "../pages/Dashboard/ManageStaffs/ManageStaffs";
import AssignStaffs from "../pages/Dashboard/AssignStaffs/AssignStaffs";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "issues",
                Component: AllIssues,
            },
            {
                path: "issues/:issueId",
                element: (
                    <PrivateRoute>
                        <IssueDetails />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "register",
                Component: Register,
            },
            {
                path: "login",
                Component: Login,
            },
        ],
    },
    {
        path: "dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                path: "report-issue",
                Component: ReportIssue,
            },
            {
                path: "my-issues",
                Component: MyIssues,
            },
            {
                path: "my-profile",
                Component: UserProfile,
            },
            {
                path: "manage-staffs",
                Component: ManageStaffs,
            },
            {
                path: "assign-staffs",
                Component: AssignStaffs,
            },
        ],
    },
    {
        path: "*",
        Component: NotFound,
    },
]);
