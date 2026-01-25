import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import useAxiosInstance from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import { Link } from "react-router";
import { X } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function ManageIssues() {
    const axiosInstance = useAxiosInstance();
    const modalRef = useRef();
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [staffLoading, setStaffLoading] = useState(false);

    const {
        data: issues = [],
        isLoading: issuesLoading,
        refetch: issuesRefetch,
    } = useQuery({
        queryKey: ["issues", "pending"],
        queryFn: async () => {
            const res = await axiosInstance.get(`/issues`);
            return res.data;
        },
    });

    const pendingIssues = issues.result ?? [];
    const totalIssues = issues.total ?? 0;

    const {
        data: availableStaffs = [],
        refetch: staffsRefetch,
        isLoading: staffsLoading,
    } = useQuery({
        queryKey: ["staffs", "available"],
        queryFn: async () => {
            const res = await axiosInstance.get(`/staffs?workStatus=available`);
            return res.data;
        },
    });

    const handleModal = (task, issue = null) => {
        if (task === "open") {
            modalRef.current.showModal();
            setSelectedIssue(issue);
        } else {
            modalRef.current.close();
        }
    };

    const handleAssignStaff = async (staff) => {
        const assignedStaff = {
            name: staff.displayName,
            email: staff.email,
        };

        console.log("", selectedIssue);
        setStaffLoading(true);

        try {
            const res = await axiosInstance.patch(
                `/issues/${selectedIssue?._id}`,
                assignedStaff,
            );
            if (res.data.acknowledged) {
                Swal.fire({
                    title: "Assigned!",
                    text: "The staff has been assigned",
                    icon: "success",
                });

                modalRef.current.close();

                issuesRefetch();
                staffsRefetch();
            }

            const issueLog = {
                issueId: selectedIssue._id,
                issueStatus: selectedIssue.status,
                issueNote: `Issue assigned to Staff: ${staff.displayName}`,
            };
            const trackingRes = axiosInstance.post(
                "/issues/trackings",
                issueLog,
            );
        } catch (err) {
            console.log("err", err);
            toast.error(
                err?.response?.data?.message ||
                    err.message ||
                    "Something went wrong",
            );
        } finally {
            setStaffLoading(false);
        }
    };

    const handleRejectIssue = async (issue) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const update = {
                        status: "rejected",
                        issueId: issue._id,
                        issueStatus: "rejected",
                        issueNote: "Issue has been rejected",
                    };
                    const res = await axiosInstance.patch(
                        `/issues/${issue._id}/change-status`,
                        update,
                    );
                    if (res.data.acknowledged) {
                        issuesRefetch();
                        Swal.fire({
                            title: "Updated!",
                            text: `The issue has been rejected`,
                            icon: "success",
                        });
                    }
                } catch (err) {
                    console.log("err", err);
                    toast.error(err.message);
                }
            }
        });
    };

    useEffect(() => {
        document.title = "Assign Staffs";
    }, []);

    return (
        <div>
            <div className="max-w-375 mx-auto p-10">
                <div className="flex flex-wrap gap-3 justify-between">
                    <h2 className="text-3xl font-semibold">
                        All Issues ({totalIssues})
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
                                            {issue["assignedStaff"].name ||
                                                "N/A"}
                                        </td>

                                        <td>
                                            <div className="flex flex-wrap gap-2">
                                                <Link
                                                    to={`/issues/${issue._id}`}
                                                    className="btn btn-accent"
                                                >
                                                    View Details
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleModal(
                                                            "open",
                                                            issue,
                                                        )
                                                    }
                                                    className="btn btn-secondary"
                                                    disabled={
                                                        issue["assignedStaff"]
                                                            .name ||
                                                        issue.status ===
                                                            "rejected"
                                                    }
                                                >
                                                    Assign Staff
                                                </button>
                                                {issue.status === "pending" && (
                                                    <button
                                                        onClick={() =>
                                                            handleRejectIssue(
                                                                issue,
                                                            )
                                                        }
                                                        className="btn btn-error"
                                                    >
                                                        Reject
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog
                ref={modalRef}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box w-full">
                    <div className="flex justify-between items-center">
                        <legend className="fieldset-legend text-2xl">
                            Available Staffs ({availableStaffs.length})
                        </legend>
                        <button
                            onClick={() => handleModal("close")}
                            className="btn px-3 btn-error"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    {/* <fieldset className="fieldset w-full border-base-300 rounded-box border p-4"> */}
                    {staffsLoading ? (
                        <Loading />
                    ) : availableStaffs.length === 0 ? (
                        <div className="flex items-center justify-center h-24">
                            <p className="text-xl text-gray-400">
                                No Staffs Available
                            </p>
                        </div>
                    ) : (
                        <div className="mt-3 shadow-sm overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                            <table className="table">
                                {/* head */}
                                <thead className="bg-base-200">
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {availableStaffs.map((staff, idx) => (
                                        <tr key={staff._id}>
                                            <th>{idx + 1}</th>
                                            <td>{staff.displayName}</td>
                                            <td>{staff.email}</td>
                                            <td>{staff.phone}</td>
                                            <td>
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleAssignStaff(
                                                                staff,
                                                            )
                                                        }
                                                        className="btn btn-primary"
                                                        disabled={staffLoading}
                                                    >
                                                        Assign{" "}
                                                        {staffLoading && (
                                                            <Loading
                                                                height="h-auto"
                                                                width="w-auto"
                                                                color="text-white"
                                                            />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </dialog>
        </div>
    );
}
