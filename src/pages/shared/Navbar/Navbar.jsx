import React from "react";
import { Link, NavLink } from "react-router";
import civicConnLogo from "../../../assets/civicConnect.png";

export default function Navbar() {
    const links = (
        <>
            <NavLink className="mx-2">Home</NavLink>
            <NavLink className="mx-2">All Issues</NavLink>
            <NavLink className="mx-2">Volunteer</NavLink>
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
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>
                <Link to="/" className="flex items-center gap-2">
                    <img className="w-7 h-7" src={civicConnLogo} alt="" />
                    <span className="text-xl font-semibold ">
                        Civic<span className="font-bold text-primary">Connect</span>
                    </span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <div className="navbar-end gap-2">
                <Link className="btn btn-primary">Login</Link>
                <Link className="btn btn-secondary">Register</Link>
            </div>
        </div>
    );
}
