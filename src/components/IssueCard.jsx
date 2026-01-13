import React from "react";
import { Link } from "react-router";

export default function IssueCard({ issue }) {
    return (
        <div className="card bg-base-100 hover:scale-101 shadow-sm">
            <div className="card-body">
                <figure>
                    <img
                        // src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        src={issue.image}
                        className="rounded-sm h-48 w-full"
                        alt="Shoes"
                    />
                </figure>
                <h2 className="card-title">{issue.title}</h2>
                <p>{issue.description}</p>
                <div className="flex space-x-3">
                    <p className="badge badge-soft badge-primary">
                        {issue.category.charAt(0).toUpperCase() +
                            issue.category.slice(1)}
                    </p>
                    <p
                        className={`text-sm font-medium ${
                            issue?.priority === "high"
                                ? "badge badge-soft badge-error"
                                : issue?.priority === "medium"
                                ? "badge badge-soft badge-warning"
                                : "badge badge-soft badge-success"
                        }`}
                    >
                        {issue.priority.charAt(0).toUpperCase() +
                            issue.priority.slice(1)}
                    </p>
                </div>

                <div>
                    <p className="font-semibold">Upvotes</p>
                    <p className="text-xl">{issue.upvoteCount}</p>
                    <p className="font-semibold mt-3">Location</p>
                    <p>{issue.location}</p>
                </div>
                <Link
                    to={`/issues/${issue._id}`}
                    className="w-full btn btn-secondary"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}
