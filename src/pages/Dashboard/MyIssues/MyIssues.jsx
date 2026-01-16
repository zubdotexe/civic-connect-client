import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useaxiosInstance from "../../../hooks/useAxios";
import { SquareChartGantt, SquarePen, Trash } from "lucide-react";
import Loading from "../../../components/Loading";
import { Link } from "react-router";
import { useEffect } from "react";

const categories = [
    "water",
    "roads",
    "lightning",
    "sanitation",
    "sidewalks",
    "traffic",
    "parks",
];

export default function MyIssues() {
    const { user } = useAuth();
    const axiosInstance = useaxiosInstance();
    const [category, setCategory] = useState("");
    const { data, isLoading } = useQuery({
        queryKey: ["issues", category, { email: user?.email }],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/issues?email=${user?.email}&category=${category}`
            );
            return res.data;
        },
    });

    const issues = data?.result ?? [];
    const totalIssues = data?.total ?? 0;
    console.log("issues", issues);

    const handlePickCategory = (e) => {
        setCategory(e.target.value);
    };

    useEffect(() => {
        document.title = "My Issues";
    }, []);

    return (
        <div className="max-w-375 mx-auto p-10">
            <div className="flex flex-wrap gap-3 justify-between">
                <h2 className="text-3xl font-semibold">
                    My Issues ({totalIssues})
                </h2>

                <div className="flex gap-2">
                    <button
                        onClick={() => setCategory("")}
                        className="btn btn-error"
                    >
                        <Trash size={16} />
                    </button>
                    <select
                        value={category}
                        className="select select-neutral"
                        onChange={handlePickCategory}
                    >
                        <option value="" disabled={true}>
                            Pick a category
                        </option>
                        {categories?.map((c) => (
                            <option key={c} value={c}>
                                {c.charAt(0).toUpperCase() + c.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {isLoading ? (
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
                                    <td>
                                        {new Date(
                                            issue.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <div className="flex flex-wrap gap-2">
                                            <div
                                                className="tooltip"
                                                data-tip="Edit Issue"
                                            >
                                                <button className="btn btn-secondary">
                                                    <SquarePen size={16} />
                                                </button>
                                            </div>
                                            <div
                                                className="tooltip"
                                                data-tip="View Issue"
                                            >
                                                <Link
                                                    to={`/issues/${issue._id}`}
                                                    className="btn btn-neutral"
                                                >
                                                    <SquareChartGantt
                                                        size={16}
                                                    />
                                                </Link>
                                            </div>
                                            <div
                                                className="tooltip"
                                                data-tip="Delete Issue"
                                            >
                                                <button className="btn btn-error">
                                                    <Trash size={16} />
                                                </button>
                                            </div>
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
