import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router";
import civicConnLogo from "/civicConnect.png";
import useAuth from "../../../hooks/useAuth";
import { LogOut } from "lucide-react";
import Loading from "../../../components/Loading";

export default function Navbar() {
    const { user, logoutUser, loading } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        logoutUser()
            .then(navigate("/login"))
            .catch((err) => {
                console.log("", err);
            });
    };

    const links = (
        <>
            <li>
                <NavLink to="/" className="mx-1">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/issues" className="mx-1">
                    All Issues
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard/report-issue" className="mx-1">
                    Report Issue
                </NavLink>
            </li>
            <li>
                <NavLink to="/dashboard" className="mx-1">
                    Dashboard
                </NavLink>
            </li>
        </>
    );
    return (
        <div className="max-w-375 mx-auto navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {" "}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />{" "}
                        </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>
                <Link to="/" className="flex items-center gap-2">
                    <img className="w-7 h-7" src={civicConnLogo} alt="" />
                    <span className="text-xl font-semibold ">
                        Civic
                        <span className="font-bold text-primary">Connect</span>
                    </span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <div className="navbar-end gap-2">
                {loading ? (
                    <Loading height="h-auto" width="w-auto" color="text-accent" />
                ) : user ? (
                    <div className="dropdown dropdown-end cursor-pointer">
                        <div
                            tabIndex={0}
                            role="button"
                            className="rounded-full w-8 h-8 overflow-hidden"
                        >
                            <img
                                className="w-full h-full object-cover"
                                src={
                                    user.photoURL
                                        ? user.photoURL
                                        : "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
                                }
                                alt=""
                            />
                        </div>
                        <ul
                            tabIndex="-1"
                            className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm"
                        >
                            <Link
                                to="/dashboard/my-profile"
                                className="font-semibold hover:bg-base-200 rounded-md transition-color duration-300 p-2"
                            >
                                {user.displayName || user.email}
                            </Link>
                            <Link to="/dashboard" className="hover:bg-base-200 rounded-md transition-color duration-300 p-2">Dashboard</Link>
                            <button
                                className="btn btn-accent"
                                onClick={handleSignOut}
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </ul>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-primary">
                            Login
                        </Link>
                        <Link to="/register" className="btn btn-secondary">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
