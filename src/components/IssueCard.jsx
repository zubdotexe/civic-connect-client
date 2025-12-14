import React from "react";

export default function IssueCard({ issue }) {
    return (
        <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
                <h2 className="card-title">{issue.title}</h2>
                <figure>
                    <img
                        // src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        src={issue.image}
                        className="rounded-sm h-48 w-full"
                        alt="Shoes"
                    />
                </figure>
                <p>{issue.description}</p>
                <div className="flex space-x-3">
                    <p className="badge badge-soft badge-primary">
                        {issue.category}
                    </p>
                    {
                        issue.status === "resolved" ? (<p className="badge badge-soft badge-success">
                        {issue.status}
                    </p>) : (<p className="badge badge-soft badge-warning">
                        {issue.status}
                    </p>)
                    }
                </div>

                <div>
                    <p className="font-semibold">UpVotes</p>
                    <p className="text-xl">{issue.upvoteCount}</p>
                    <p className="font-semibold mt-3">Location</p>
                    <p>{issue.location}</p>
                </div>
                <button className="w-full btn btn-secondary">
                    View Details
                </button>
            </div>
        </div>
    );
}
