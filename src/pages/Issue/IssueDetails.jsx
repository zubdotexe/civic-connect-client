import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useaxiosInstance from "../../hooks/useAxios";
import NotFound from "../NotFound/NotFound";
import Loading from "../../components/Loading";
import { motion } from "framer-motion";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Rocket, Star, UserIcon } from "lucide-react";
import { toast } from "react-toastify";

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.25,
        },
    },
};

const childVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function IssueDetails() {
    const { issueId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosInstance = useaxiosInstance();
    const [loading, setLoading] = useState(false);

    const {
        isLoading,
        data: issue,
        refetch,
    } = useQuery({
        queryKey: ["issue", issueId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/issues/${issueId}`);
            return res.data;
        },
    });

    const { data: issueLogs = [], isLoading: trackingLoading } = useQuery({
        queryKey: ["issueTracking", { issueId: issue?._id }],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/issues/trackings/${issue?._id}`,
            );

            return res.data;
        },
    });

    const statusColor = {
        pending: "bg-purple-400",
        "in-progress": "badge-primary",
        working: "badge-warning",
        resolved: "badge-success",
        closed: "badge-neutral",
    };

    const handleUpvote = async () => {
        if (!user) return navigate("/login");
        setLoading(true);

        const upvote = {
            userEmail: user?.email,
        };

        try {
            const res = await axiosInstance.patch(
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

    const { data: userInfo = {} } = useQuery({
        queryKey: ["userInfo", user?.email],
        queryFn: async () => {
            let res;
            if (user?.email.endsWith("civicconnect.com")) {
                res = await axiosInstance(`/staffs?email=${user?.email}`);
            } else {
                res = await axiosInstance(`/users?email=${user?.email}`);
            }
            return res.data[0] || [];
        },
    });

    const handleBoost = async () => {
        setLoading(true);
        const boostInfo = {
            userId: userInfo?._id,
            issueId: issue?._id,
            email: userInfo?.email,
        };
        try {
            const res = await axiosInstance.post(
                "/payments/boost-issue/checkout",
                boostInfo,
            );
            window.location.href = res.data.url;
        } catch (err) {
            toast.error(err.message);
            setLoading(false);
        }
    };

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
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                {isLoading ? (
                    <Loading />
                ) : (
                    <motion.div
                        variants={childVariants}
                        className="max-w-3xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg"
                    >
                        <div className="mb-6">
                            <img
                                src={issue?.image}
                                alt={issue?.title}
                                className="w-full h-72 object-cover rounded-lg"
                            />
                        </div>

                        <div className="space-y-4">
                            {/* Title and basic info */}
                            <div className="flex justify-between items-center gap-3">
                                <h1 className="text-3xl font-semibold text-gray-800">
                                    {issue?.title}
                                </h1>
                                <div className="flex items-center gap-2">
                                    {issue.reportedBy.email === user?.email && (
                                        <button
                                            onClick={handleBoost}
                                            className="btn btn-primary btn-sm"
                                            disabled={
                                                loading || issue?.isBoosted
                                            }
                                        >
                                            <Rocket size={14} />
                                            Boost
                                            {loading && (
                                                <Loading
                                                    height="h-auto"
                                                    width="w-auto"
                                                    color="text-white"
                                                />
                                            )}
                                        </button>
                                    )}
                                    {user?.email !== issue.reportedBy.email && (
                                        <button
                                            onClick={handleUpvote}
                                            className="btn btn-sm btn-accent"
                                            disabled={loading}
                                        >
                                            <Star size={14} />
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
                            </div>
                            <p className="text-lg text-gray-600">
                                {issue?.location}
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Reported by:</strong>{" "}
                                {issue?.reportedBy.name}
                            </p>

                            {/* Description */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Description
                                </h2>
                                <p className="text-gray-600">
                                    {issue?.description}
                                </p>
                            </div>

                            {/* Category, Priority, Status, Upvotes */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="flex items-center space-x-2">
                                    <span className="font-semibold text-gray-600">
                                        Category:
                                    </span>
                                    <span className="text-gray-600">
                                        {issue?.category
                                            .charAt(0)
                                            .toUpperCase() +
                                            issue?.category.slice(1)}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="font-semibold text-gray-600">
                                        Priority:
                                    </span>
                                    <span
                                        className={`text-sm font-medium badge ${
                                            // issue?.priority === "high"
                                            //     ? "text-red-600"
                                            //     : issue?.priority === "medium"
                                            //       ? "text-green-600"
                                            //       : "text-green-600"
                                            issue?.priority === "high"
                                                ? "badge-error"
                                                : "badge-warning"
                                        }`}
                                    >
                                        {issue?.priority
                                            .charAt(0)
                                            .toUpperCase() +
                                            issue?.priority.slice(1)}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="font-semibold text-gray-600">
                                        Status:
                                    </span>
                                    <span
                                        className={`text-sm font-medium badge ${
                                            statusColor[issue?.status]
                                        }`}
                                    >
                                        {issue?.status.charAt(0).toUpperCase() +
                                            issue?.status.slice(1)}
                                    </span>
                                </div>
                                {/* Upvote count */}
                                <div className="flex items-center space-x-2">
                                    <span className="font-semibold text-gray-600">
                                        Upvotes:
                                    </span>
                                    <span className="">
                                        {issue?.upvotes?.length || 0}
                                    </span>
                                </div>
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
                                    {new Date(
                                        issue?.createdAt,
                                    ).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Last updated:</strong>{" "}
                                    {new Date(
                                        issue?.updatedAt,
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </motion.div>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.2 }}
            >
                <motion.div
                    variants={childVariants}
                    className="mt-10 max-w-3xl mx-auto p-6 bg-base-100 rounded-lg shadow-lg"
                >
                    <h2 className="text-xl font-semibold">Issue Timeline</h2>
                    <ul className="timeline timeline-vertical max-w-2xl">
                        {[...issueLogs].reverse().map((log, idx) => (
                            <li key={idx} className="mt-5">
                                {idx !== 0 && <hr />}
                                <div className="timeline-start">
                                    {/* {new Date(
                                        log.createdAt,
                                    ).toLocaleDateString()} */}
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

                                <div className="timeline-middle shadow-sm sm:w-2xs bg-base-200 hover:bg-base-300 p-4 rounded-md">
                                    <p>{log.issueNote}</p>
                                    <div className="flex justify-between items-center gap-3 mt-2">
                                        {log.issueStatus && (
                                            <p
                                                className={`badge ${statusColor[log.issueStatus]}`}
                                            >
                                                {log.issueStatus
                                                    ?.charAt(0)
                                                    .toUpperCase() +
                                                    log.issueStatus?.slice(1)}
                                            </p>
                                        )}
                                        <p className="text-sm text-neutral">
                                            {new Date(
                                                log.createdAt,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                {idx !== issueLogs.length - 1 && <hr />}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </motion.div>
        </div>
    );
}
