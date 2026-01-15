import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useaxiosInstance from "../../../hooks/useAxios";

export default function MyIssues() {
    const { user } = useAuth();
    const axiosInstance = useaxiosInstance();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["issues", { email: user?.email }],
        queryFn: async () => {
            const res = await axiosInstance.get(`/issues?email=${user?.email}`);
            return res.data;
        },
    });

    const issues = data?.result ?? [];
    const totalIssues = data?.totalIssues ?? 0;
    console.log("issues", issues);

    return (
        <div className="max-w-375 mx-auto p-10">
            <h2 className="text-3xl font-semibold">My Issues</h2>

            <div className="mt-3 shadow-sm overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    {/* head */}
                    <thead className="bg-base-200">
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Status</th>
                            <th>Assigned Staff</th>
                            <th>Priority</th>
                            <th>Posted</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {issues.map((issue, idx) => (
                            <tr key={issue._id}>
                                <th>{idx + 1}</th>
                                <td>
                                    {issue.title.length > 70
                                        ? issue.title.slice(0, 70) + "..."
                                        : issue.title}
                                </td>
                                <td>{issue.category}</td>
                                <td>{issue.status}</td>
                                <td>{issue.assignedStaff.name || "N/A"}</td>
                                <td>{issue.priority}</td>
                                <td>{issue.createdAt}</td>
                                <td>
                                    <div className="flex flex-wrap gap-2">
                                        <button className="btn btn-secondary">
                                            Edit
                                        </button>
                                        <button className="btn btn-neutral">
                                            View Details
                                        </button>
                                        <button className="btn btn-error">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
