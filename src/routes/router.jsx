import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AllIssues from "../pages/AllIssues/AllIssues";
import IssueDetails from "../pages/Issue/IssueDetails";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

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
                Component: IssueDetails,
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
]);
