import React from "react";
import { Link } from "react-router";

export default function PaymentCancelled() {
    return (
        <div className="p-10">
            <div className="p-5 box-content flex flex-col h-36 gap-3 bg-base-200 justify-center items-center rounded-md">
                <h2 className="text-2xl font-semibold">Payment Cancelled</h2>
                <Link to="/dashboard/issues" className="btn btn-secondary">View All Issues</Link>
            </div>
        </div>
    );
}
