import { Star } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "./Loading";
import useBlockChecker from "../hooks/useBlockChecker";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function IssueCard({ issue, refetch, isLoading }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);
    const { showBlockModal } = useBlockChecker();

    const handleUpvote = async () => {
        if (!user) return navigate("/login");
        if (showBlockModal()) return;
        setLoading(true);

        const upvote = {
            userEmail: user?.email,
        };

        try {
            const res = await axiosSecure.patch(
                `/issues/${issue._id}/upvote`,
                upvote,
            );
            if (res.data.alreadyUpvoted) {
                toast.error("Already upvoted");
            } else {
                toast.success(res.data.message);
            }
        } catch (err) {
            console.log("err", err);
            toast.error(err.message);
        } finally {
            setLoading(false);
            refetch();
        }
    };

    return (
        <div className="card bg-base-100 transform transition-transform duration-300 delay-100 hover:scale-101 shadow-sm h-full">
            <div className="card-body">
                {isLoading ? (
                    <Loading height="h-auto" width="w-auto" />
                ) : (
                    <figure>
                        <img
                            // src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            src={issue.image}
                            className="rounded-sm h-48 w-full"
                            alt={issue.image}
                        />
                    </figure>
                )}
                <h2 className="card-title">{issue.title}</h2>
                <p>{issue.description}</p>
                <div className="flex space-x-3">
                    <p className="badge badge-soft badge-primary">
                        {issue.category.charAt(0).toUpperCase() +
                            issue.category.slice(1)}
                    </p>
                    <p
                        className={`text-sm font-medium badge badge-soft ${
                            // issue?.priority === "high"
                            //     ? "badge badge-soft badge-error"
                            //     : issue?.priority === "medium"
                            //       ? "badge badge-soft badge-warning"
                            //       : "badge badge-soft badge-success"
                            issue?.priority === "high"
                                ? "badge-error"
                                : "badge-warning"
                        }`}
                    >
                        {issue.priority.charAt(0).toUpperCase() +
                            issue.priority.slice(1)}
                    </p>
                </div>

                <div>
                    <div className="flex gap-3 justify-between items-center">
                        <div>
                            <p className="font-semibold">Upvotes</p>
                            <p className="text-xl">
                                {issue.upvotes?.length || 0}
                            </p>
                        </div>
                        {user?.email !== issue.reportedBy.email && (
                            <button
                                onClick={handleUpvote}
                                className="btn btn-sm btn-accent"
                                disabled={loading}
                            >
                                <Star size={14} />{" "}
                                {loading && (
                                    <Loading
                                        height="h-auto"
                                        width="w-auto"
                                        color="text-primary"
                                    />
                                )}
                            </button>
                        )}
                    </div>
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
