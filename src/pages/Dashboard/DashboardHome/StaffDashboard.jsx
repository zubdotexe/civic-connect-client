import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useaxiosInstance from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import { Link } from "react-router";

export default function StaffDashboard() {
    const { user } = useAuth();
    const axiosInstance = useaxiosInstance();
    const { data: userStats = {}, isLoading } = useQuery({
        queryKey: ["staffStats", user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/stats/staffs?email=${user?.email}`,
            );
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
                <div className="grid sm:grid-cols-2 mt-5 gap-3">
                    <div className="bg-base-200 hover:bg-base-300 transition-color duration-300 shadow-sm rounded-md p-5 flex flex-col items-center">
                        <h2 className="stat-title text-xl">Total Assigned</h2>
                        <p className="stat-value">
                            {userStats.totalAssignedIssues || 0}
                        </p>
                    </div>
                    <div className="bg-base-200 hover:bg-base-300 transition-color duration-300 shadow-sm rounded-md p-5 flex flex-col items-center">
                        <h2 className="stat-title text-xl">Total Resolved</h2>
                        <p className="stat-value">
                            {userStats.byStatus?.resolved || 0}
                        </p>
                    </div>
                    <div className="mt-5 sm:col-span-2">
                        <div className="bg-base-200 shadow-sm rounded-md p-5">
                            <div className="flex flex-wrap gap-3 justify-between items-center">
                                <h2 className="stat-title text-xl">
                                    Today's Task (
                                    {userStats.todayTasksResult.length})
                                </h2>
                                <Link to="/dashboard/assigned-issues" className="btn btn-ghost btn-secondary">View All Tasks</Link>
                            </div>
                            {/* <p className="stat-value">
                                {userStats.todayTasks || 0}
                            </p> */}
                            {userStats.todayTasksResult.map((task) => (
                                <div
                                    key={task._id}
                                    className="mt-3 flex flex-wrap gap-3 justify-between items-center rounded-md bg-base-300 hover:bg-gray-500/15 transition-color duration-300 p-3"
                                >
                                    <h2 className="font-bold">{task.title}</h2>
                                    <Link
                                        to={`/issues/${task._id}`}
                                        className="btn btn-primary btn-ghost"
                                    >
                                        View
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* <h1 className="mt-7 bg-base-200 rounded-md p-5 text-4xl font-semibold">
                Payments
            </h1> */}
            {/* {isLoading ? (
                <Loading height="h-auto" width="w-auto" />
            ) : (
                <div className="mt-5">
                    <div className="bg-base-200 hover:bg-base-300 transition-color duration-300 shadow-sm rounded-md p-5 flex flex-col items-center">
                        <h2 className="stat-title text-xl">Total Paid</h2>
                        <p className="stat-value">{userStats.totalPaid || 0}</p>
                    </div>
                </div>
            )} */}
        </div>
    );
}
