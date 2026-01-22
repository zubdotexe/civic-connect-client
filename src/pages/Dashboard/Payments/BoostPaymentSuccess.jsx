import React from "react";
import { useSearchParams } from "react-router";
import useaxiosInstance from "../../../hooks/useAxios";
import { useEffect } from "react";

export default function BoostPaymentSuccess() {
    const [searchParams] = useSearchParams();
    const axiosInstance = useaxiosInstance();
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        const updateSubscription = async () => {
            try {
                await axiosInstance.patch("/update-boost", {
                    sessionId,
                });
            } catch (error) {
                console.error("error updating subscription:", error);
            }
        };

        if (sessionId) {
            updateSubscription();
        }
    }, [sessionId, axiosInstance]);

    return (
        <div className="p-10">
            <div className="p-5 flex flex-col h-36 gap-3 bg-base-200 justify-center items-center rounded-md">
                <h2 className="text-2xl font-semibold">Payment Successful</h2>
                <p className="text-3xl">You have booster your issue!</p>
            </div>
        </div>
    );
}
