import React from "react";

export default function Loading() {
    return (
        <div className={`flex justify-center items-center h-screen w-dvw`}>
            <span className="loading loading-spinner text-primary"></span>
        </div>
    );
}
