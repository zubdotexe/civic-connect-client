import { useQuery } from "@tanstack/react-query";
import React from "react";
import useaxiosInstance from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import { Link } from "react-router";

export default function AssignStaffs() {
    const axiosInstance = useaxiosInstance();
    const {
        data: issues = [],
        isLoading: issuesLoading,
        refetch,
    } = useQuery({
        queryKey: ["issues", "pending"],
        queryFn: async () => {
            const res = await axiosInstance.get(`/issues?status=pending`);
            return res.data;
        },
    });

    console.log("data", issues);

    const pendingIssues = issues.result ?? [];
    const totalIssues = issues.total ?? 0;

    return (
        <div>
            <div className="max-w-375 mx-auto p-10">
                <div className="flex flex-wrap gap-3 justify-between">
                    <h2 className="text-3xl font-semibold">
                        Pending Issues ({totalIssues})
                    </h2>
                </div>

                {issuesLoading ? (
                    <Loading />
                ) : totalIssues === 0 ? (
                    <div className="flex items-center justify-center h-24">
                        <p className="text-xl text-gray-400">No Issues Found</p>
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
                                    <th>Priority</th>
                                    <th>Posted</th>
                                    <th>Reported By</th>
                                    <th>Assigned Staff</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {pendingIssues.map((issue, idx) => (
                                    <tr key={issue._id}>
                                        <th>{idx + 1}</th>
                                        <td>
                                            {issue.title.length > 70
                                                ? issue.title.slice(0, 70) +
                                                  "..."
                                                : issue.title}
                                        </td>
                                        <td>{issue.category}</td>
                                        <td>{issue.status}</td>
                                        <td>{issue.priority}</td>
                                        <td>
                                            {new Date(
                                                issue.createdAt,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>{issue["reportedBy"].name}</td>
                                        <td>
                                            {issue["assignedStaff"].name || (
                                                <button className="btn btn-secondary">
                                                    Assign Staff
                                                </button>
                                            )}
                                        </td>

                                        <td>
                                            <div className="flex flex-wrap gap-2">
                                                <Link
                                                    to={`/issues/${issue._id}`}
                                                    className="btn btn-accent"
                                                >
                                                    View Details
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
        </div>
    );
}
