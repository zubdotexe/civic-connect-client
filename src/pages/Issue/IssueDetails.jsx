import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import useaxiosInstance from "../../hooks/useAxios";
import NotFound from "../NotFound/NotFound";

export default function IssueDetails() {
    const { issueId } = useParams();
    // console.log("issueId", issueId);

    const axiosInstance = useaxiosInstance();

    const { isLoading, data: issue } = useQuery({
        queryKey: ["issue", issueId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/issues/${issueId}`);
            return res.data;
        },
    });

    // console.log("issue", issue);

    useEffect(() => {
        if (issue?.title) {
            document.title = issue.title;
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [issue]);

    if (!issue) return <NotFound />;

    return (
        <div className="min-h-screen bg-base-200 p-10">
            <div className="max-w-3xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg">
                <div className="mb-6">
                    <img
                        src={issue?.image}
                        alt={issue?.title}
                        className="w-full h-72 object-cover rounded-lg"
                    />
                </div>

                <div className="space-y-4">
                    {/* Title and basic info */}
                    <h1 className="text-3xl font-semibold text-gray-800">
                        {issue?.title}
                    </h1>
                    <p className="text-lg text-gray-600">{issue?.location}</p>
                    <p className="text-sm text-gray-500">
                        <strong>Reported by:</strong> {issue?.reportedBy.name}
                    </p>

                    {/* Description */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            Description
                        </h2>
                        <p className="text-gray-600">{issue?.description}</p>
                    </div>

                    {/* Category, Priority, Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-600">
                                Category:
                            </span>
                            <span className="text-gray-600">
                                {issue?.category}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-600">
                                Priority:
                            </span>
                            <span
                                className={`text-sm font-medium ${
                                    issue?.priority === "high"
                                        ? "text-red-600"
                                        : issue?.priority === "medium"
                                        ? "text-yellow-600"
                                        : "text-green-600"
                                }`}
                            >
                                {issue?.priority}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-600">
                                Status:
                            </span>
                            <span
                                className={`text-sm font-medium ${
                                    issue?.status === "resolved"
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                {issue?.status}
                            </span>
                        </div>
                    </div>

                    {/* Upvote count */}
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Upvotes:</span>
                        <span className="font-semibold text-gray-800">
                            {issue?.upvoteCount}
                        </span>
                    </div>

                    {/* Boosted status */}
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-600">
                            Boosted:
                        </span>
                        <span
                            className={`text-sm font-medium ${
                                issue?.isBoosted
                                    ? "text-green-600"
                                    : "text-gray-400"
                            }`}
                        >
                            {issue?.isBoosted ? "Yes" : "No"}
                        </span>
                    </div>

                    {/* Assigned Staff */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                            Assigned Staff
                        </h2>
                        <p className="text-gray-600">
                            {issue?.assignedStaff.name ? (
                                issue?.assignedStaff.name
                            ) : (
                                <span className="text-gray-400">
                                    Not assigned yet
                                </span>
                            )}
                        </p>
                    </div>

                    {/* Created and Updated At */}
                    <div className="flex justify-between text-sm text-gray-500">
                        <p>
                            <strong>Created at:</strong>{" "}
                            {new Date(issue?.createdAt).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Last updated:</strong>{" "}
                            {new Date(issue?.updatedAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-10 max-w-3xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Issue Timeline</h2>
                <ul className="timeline timeline-vertical">
                    <li>
                        <div className="timeline-start">1984</div>
                        <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="timeline-end timeline-box">
                            First Macintosh computer
                        </div>
                        <hr />
                    </li>
                    <li>
                        <hr />
                        <div className="timeline-start">1998</div>
                        <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="timeline-end timeline-box">iMac</div>
                        <hr />
                    </li>
                    <li>
                        <hr />
                        <div className="timeline-start">2001</div>
                        <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="timeline-end timeline-box">iPod</div>
                        <hr />
                    </li>
                    <li>
                        <hr />
                        <div className="timeline-start">2007</div>
                        <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="timeline-end timeline-box">iPhone</div>
                        <hr />
                    </li>
                    <li>
                        <hr />
                        <div className="timeline-start">2015</div>
                        <div className="timeline-middle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="timeline-end timeline-box">
                            Apple Watch
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
