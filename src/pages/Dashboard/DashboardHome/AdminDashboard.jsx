import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosInstance from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import { Link } from "react-router";
import { Gem } from "lucide-react";

export default function UserDashboard() {
    const axiosInstance = useAxiosInstance();

    const { data: adminStats = {}, isLoading } = useQuery({
        queryKey: ["adminStats"],
        queryFn: async () => {
            const res = await axiosInstance.get(`/stats/admin`);
            return res.data;
        },
    });

    return (
        <div>
            <h1 className="bg-base-200 rounded-md p-5 text-4xl font-semibold">
                Issues
            </h1>
            {isLoading ? (
                <Loading height="h-auto" width="w-auto" />
            ) : (
                <div className="grid sm:grid-cols-3 mt-5 gap-3">
                    <div className="sm:col-span-3 bg-base-200 hover:bg-base-300 transition-color duration-300 shadow-sm rounded-md p-5 flex flex-col items-center">
                        <h2 className="stat-title text-xl">Total Submitted</h2>
                        <p className="stat-value">
                            {adminStats.totalIssues || 0}
                        </p>
                    </div>
                    <div className="bg-base-200 hover:bg-base-300 transition-color duration-300 shadow-sm rounded-md p-5 flex flex-col items-center">
                        <h2 className="stat-title text-xl">Total Pending</h2>
                        <p className="stat-value">
                            {adminStats.byStatus?.pending || 0}
                        </p>
                    </div>
                    <div className="bg-base-200 hover:bg-base-300 transition-color duration-300 shadow-sm rounded-md p-5 flex flex-col items-center">
                        <h2 className="stat-title text-xl">
                            Total In-progress
                        </h2>
                        <p className="stat-value">
                            {adminStats.byStatus?.["in-progress"] || 0}
                        </p>
                    </div>
                    <div className="bg-base-200 hover:bg-base-300 transition-color duration-300 shadow-sm rounded-md p-5 flex flex-col items-center">
                        <h2 className="stat-title text-xl">Total Working</h2>
                        <p className="stat-value">
                            {adminStats.byStatus?.["working"] || 0}
                        </p>
                    </div>
                    <div className="bg-base-200 hover:bg-base-300 transition-color duration-300 shadow-sm rounded-md p-5 flex flex-col items-center">
                        <h2 className="stat-title text-xl">Total Resolved</h2>
                        <p className="stat-value">
                            {adminStats.byStatus?.["resolved"] || 0}
                        </p>
                    </div>
                    <div className="bg-base-200 hover:bg-base-300 transition-color duration-300 shadow-sm rounded-md p-5 flex flex-col items-center">
                        <h2 className="stat-title text-xl">Total Closed</h2>
                        <p className="stat-value">
                            {adminStats.byStatus?.["closed"] || 0}
                        </p>
                    </div>
                    <div className="bg-base-200 hover:bg-base-300 transition-color duration-300 shadow-sm rounded-md p-5 flex flex-col items-center">
                        <h2 className="stat-title text-xl">Total Rejected</h2>
                        <p className="stat-value">
                            {adminStats.byStatus?.rejected || 0}
                        </p>
                    </div>
                    <div className="mt-7 bg-base-200 shadow-sm rounded-md p-5">
                        <div className="flex gap-3 items-center justify-between">
                            <h2 className="stat-title text-xl">
                                Latest Issues
                            </h2>
                            <Link
                                to="/dashboard/manage-issues"
                                className="btn btn-ghost btn-success"
                            >
                                View all
                            </Link>
                        </div>
                        {adminStats.latestIssues.map((issue) => (
                            <div
                                key={issue._id}
                                className="mt-3 flex flex-wrap gap-3 justify-between items-center rounded-md bg-base-300 hover:bg-gray-500/15 transition-color duration-300 p-3"
                            >
                                <h2 className="font-bold">{issue.title}</h2>
                                <Link
                                    to={`/issues/${issue._id}`}
                                    className="btn btn-primary btn-ghost"
                                >
                                    View
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="mt-7 bg-base-200 shadow-sm rounded-md p-5">
                        <div className="flex gap-3 items-center justify-between">
                            <h2 className="stat-title text-xl">
                                New Users
                            </h2>
                            <Link
                                to="/dashboard/manage-users"
                                className="btn btn-ghost btn-success"
                            >
                                View all
                            </Link>
                        </div>
                        {adminStats.latestUsers.map((user) => (
                            <div
                                key={user._id}
                                className="mt-3 rounded-md bg-base-300 hover:bg-gray-500/15 transition-color duration-300 p-3"
                            >
                                <div className="flex gap-1 items-center">
                                    <h2 className="font-semibold">
                                        {user?.displayName}{" "}
                                    </h2>
                                    {user?.isPremium && (
                                        <span
                                            className="tooltip"
                                            data-tip="Premium User"
                                        >
                                            <Gem size={12} />
                                        </span>
                                    )}
                                </div>
                                <p>{user.email}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-7 bg-base-200 shadow-sm rounded-md p-5">
                        <div className="flex gap-3 items-center justify-between">
                            <h2 className="stat-title text-xl">
                                Latest Payments
                            </h2>
                            <Link
                                to="/dashboard/all-payments"
                                className="btn btn-ghost btn-success"
                            >
                                View all
                            </Link>
                        </div>
                        {adminStats.latestPayments.map((payment) => (
                            <div
                                key={payment._id}
                                className="mt-3 rounded-md bg-base-300 hover:bg-gray-500/15 transition-color duration-300 p-3"
                            >
                                <div
                                    className={`border-l-4 ${payment?.type === "SUBSCRIPTION" ? "border-primary" : "border-accent"} pl-2`}
                                >
                                    <h2 className="font-semibold">
                                        {payment?.type}{" "}
                                    </h2>
                                    <p>৳ {payment.amount}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <h1 className="mt-7 bg-base-200 rounded-md p-5 text-4xl font-semibold">
                Payments
            </h1>
            {isLoading ? (
                <Loading height="h-auto" width="w-auto" />
            ) : (
                <div className="mt-5">
                    <div className="bg-base-200 hover:bg-base-300 transition-color duration-300 shadow-sm rounded-md p-5 flex flex-col items-center">
                        <h2 className="stat-title text-xl">Total Received</h2>
                        <p className="stat-value">
                            ৳ {adminStats.totalReceived || 0}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
