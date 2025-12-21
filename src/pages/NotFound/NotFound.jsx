import React from "react";
import { Link } from "react-router";

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center space-y-7 p-10">
            <div className="w-3xl rounded-xl overflow-hidden">
                <img
                className="w-full h-full object-cover"
                src="https://cdn.dribbble.com/userupload/37369373/file/original-d8a0e75b543c2066809188f570471d19.png?resize=1024x768&vertical=center"
                alt=""
            />
            </div>
            <Link to="/" className="btn btn-secondary">Go to Home</Link>
        </div>
    );
}
