import React from "react";

export default function Loading({
    height = "h-screen",
    width = "w-full",
    color = "text-primary",
}) {
    return (
        <div className={`flex justify-center items-center ${height} ${width}`}>
            <span className={`loading loading-spinner ${color}`}></span>
        </div>
    );
}
