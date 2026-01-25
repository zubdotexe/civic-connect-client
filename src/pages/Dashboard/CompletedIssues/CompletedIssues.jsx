import React, { useEffect } from "react";
import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";
import useAxiosInstance from "../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

export default function CompletedIssues() {
    const { user } = useAuth();
    const axiosInstance = useAxiosInstance();

    const { data: issues = [], isLoading } = useQuery({
        queryKey: ["issues", user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/issues?staffEmail=${user?.email}&status=closed`,
            );

            return res.data;
        },
    });

    const completedIssues = issues?.result ?? [];
    const totalCompletedIssues = issues?.total ?? 0;

    useEffect(() => {
        document.title = "Completed Issues";
    }, []);

    return (
        <div className="max-w-375 mx-auto p-10">
            <div className="flex flex-wrap gap-3 justify-between">
                <h2 className="text-3xl font-semibold">
                    Completed Issues ({totalCompletedIssues})
                </h2>
            </div>
            {isLoading ? (
                <Loading />
            ) : totalCompletedIssues === 0 ? (
                <div className="flex items-center justify-center h-24">
                    <p className="text-xl text-gray-400">No Issues Completed</p>
                </div>
            ) : (
                <div className="mt-3 shadow-sm overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-base-200">
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Reported By</th>
                                <th>Priority</th>
                                <th>Posted</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {completedIssues.map((issue, idx) => (
                                <tr key={issue._id}>
                                    <th>{idx + 1}</th>
                                    <td>
                                        {issue.title.length > 70
                                            ? issue.title.slice(0, 70) + "..."
                                            : issue.title}
                                    </td>
                                    <td>{issue.category}</td>
                                    <td>{issue.status}</td>
                                    <td>{issue.reportedBy.name || "N/A"}</td>
                                    <td>{issue.priority}</td>
                                    <td>
                                        {new Date(
                                            issue.createdAt,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <div className="flex flex-wrap gap-2">
                                            <Link
                                                to={`/issues/${issue._id}`}
                                                className="btn btn-accent"
                                            >
                                                View Issue
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
