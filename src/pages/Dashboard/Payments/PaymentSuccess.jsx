import React from "react";
import { Link, useSearchParams } from "react-router";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const axiosSecure = useAxiosSecure();
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        const updateSubscription = async () => {
            try {
                await axiosSecure.patch("/update-subscription", {
                    sessionId,
                });
            } catch (error) {
                console.error("error updating subscription:", error);
            }
        };

        if (sessionId) {
            updateSubscription();
        }
    }, [sessionId, axiosSecure]);

    return (
        <div className="p-10">
            <div className="p-5 box-content flex flex-col h-36 gap-3 bg-base-200 justify-center items-center rounded-md">
                <h2 className="text-2xl font-semibold">Payment Successful</h2>
                <p className="text-3xl">Congrats for being a premium user!</p>
                <Link to="/dashboard/" className="btn btn-secondary">
                    Go to Profile
                </Link>
            </div>
        </div>
    );
}
