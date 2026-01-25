import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosInstance from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import { Download } from "lucide-react";

export default function AllPayments() {
    const axiosInstance = useAxiosInstance();
    const {
        data: payments = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const res = await axiosInstance.get("payments");
            return res.data;
        },
    });

    return (
        <div>
            <div className="max-w-375 mx-auto p-10">
                <h2 className="text-3xl font-semibold">
                    All Payments ({payments.length})
                </h2>

                {isLoading ? (
                    <Loading />
                ) : payments.length === 0 ? (
                    <div className="flex items-center justify-center h-24">
                        <p className="text-xl text-gray-400">No Users Found</p>
                    </div>
                ) : (
                    <div className="mt-3 shadow-sm overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-base-200">
                                <tr>
                                    <th></th>
                                    <th>ID</th>
                                    <th>Amount (৳)</th>
                                    <th>Date</th>
                                    <th>Issue ID</th>
                                    <th>Type</th>
                                    <th>User</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {payments.map((payment, idx) => (
                                    <tr key={payment._id}>
                                        <th>{idx + 1}</th>
                                        <td>{payment._id}</td>

                                        <td>{payment.amount}</td>
                                        <td>
                                            {new Date(
                                                payment.createdAt,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>{payment.issueId || "N/A"}</td>
                                        <td>
                                            <div
                                                className={`badge ${payment.type === "SUBSCRIPTION" ? "badge-accent" : "badge-primary"}`}
                                            >
                                                {payment.type}
                                            </div>
                                        </td>
                                        <td>{payment.userEmail || "N/A"}</td>
                                        <td>
                                            <button className="btn btn-secondary">
                                                <Download size={16} /> Invoice
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
