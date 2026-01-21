import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useaxiosInstance from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import { useRef } from "react";
import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function AssignedIssues() {
    const { user } = useAuth();
    const axiosInstance = useaxiosInstance();
    const modalRef = useRef();
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(null);
    const STATUS_ORDER = ["in-progress", "working", "resolved", "closed"];

    const disabled = (status) => {
        return (
            STATUS_ORDER.indexOf(status) <= STATUS_ORDER.indexOf(currentStatus)
        );
    };

    const {
        data: issues = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["issues", user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/issues?staffEmail=${user?.email}`,
            );

            return res.data;
        },
    });

    const assignedIssues = issues?.result ?? [];
    const totalAssignedIssues = issues?.total ?? 0;

    const handleModal = (task, issue = null) => {
        console.log("issue", issue);
        if (task === "open") {
            if (!issue) return;

            modalRef.current.showModal();
            setSelectedIssue(issue);
        } else {
            modalRef.current.close();
            // setSelectedIssue(null);
        }
        console.log("selectedIssue", selectedIssue);
    };

    const handleChangeStatus = async (status) => {
        const update = {
            status,
            issueId: selectedIssue._id,
            issueStatus: status,
        };

        switch (status) {
            case "working":
                update.issueNote = "Work started on the issue";
                break;
            case "resolved":
                update.issueNote = "Issue marked as resolved";
                break;
            case "closed":
                update.issueNote = "Issue closed by staff";
                break;
            default:
                update.issueNote = "Issue status changed to in-progress";
        }

        setCurrentStatus(status);

        console.log("", update);

        const res = await axiosInstance.patch(
            `/issues/${selectedIssue._id}/change-status`,
            update,
        );
        if (res.data.acknowledged) {
            Swal.fire({
                title: "Status updated!",
                text: "The status has been updated",
                icon: "success",
            });

            modalRef.current.close();

            refetch();
        }
    };

    useEffect(() => {
        document.title = `Assigned Issues ${user?.displayName}`;
        setCurrentStatus(selectedIssue?.status);
    }, [selectedIssue]);

    return (
        <div className="max-w-375 mx-auto p-10">
            <div className="flex flex-wrap gap-3 justify-between">
                <h2 className="text-3xl font-semibold">
                    Assigned Issues ({totalAssignedIssues})
                </h2>
            </div>

            {isLoading ? (
                <Loading />
            ) : totalAssignedIssues === 0 ? (
                <div className="flex items-center justify-center h-24">
                    <p className="text-xl text-gray-400">No Issues Assigned</p>
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
                            {assignedIssues.map((issue, idx) => (
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
                                            <button
                                                className="btn btn-primary"
                                                onClick={() =>
                                                    handleModal("open", issue)
                                                }
                                                disabled={
                                                    issue.status === "closed"
                                                }
                                            >
                                                Change Status
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog
                ref={modalRef}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box w-full">
                    <div className="flex justify-between items-center">
                        <legend className="fieldset-legend text-2xl">
                            {selectedIssue?.title}
                        </legend>
                        <button
                            onClick={() => handleModal("close")}
                            className="btn px-3 btn-error"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <h3 className="mt-3 text-md">Update Issue Status</h3>
                    <div className="mt-2 space-y-3 flex flex-col w-full border-base-300 rounded-box border p-4">
                        <button
                            disabled={disabled("in-progress")}
                            onClick={() => handleChangeStatus("in-progress")}
                            className="btn btn-primary"
                        >
                            In-progress
                        </button>
                        <button
                            disabled={disabled("working")}
                            onClick={() => handleChangeStatus("working")}
                            className="btn btn-warning"
                        >
                            Working
                        </button>
                        <button
                            disabled={disabled("resolved")}
                            onClick={() => handleChangeStatus("resolved")}
                            className="btn btn-success"
                        >
                            Resolved
                        </button>
                        <button
                            disabled={disabled("closed")}
                            onClick={() => handleChangeStatus("closed")}
                            className="btn btn-neutral"
                        >
                            Closed
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
