import React, { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../../hooks/useAxios";
import { SquareChartGantt, SquarePen, Trash } from "lucide-react";
import Loading from "../../../components/Loading";
import { Link } from "react-router";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useBlockChecker from "../../../hooks/useBlockChecker";
import { useForm } from "react-hook-form";
import useImgUp from "../../../hooks/useImgUp";

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
    const axiosInstance = useAxiosInstance();
    const [category, setCategory] = useState("");
    const updateModalRef = useRef();
    const [selectedIssue, setSelectedIssue] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    const { uploadImage } = useImgUp();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["issues", category, { email: user?.email }],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/issues?email=${user?.email}&category=${category}`,
            );
            return res.data;
        },
    });

    const issues = data?.result ?? [];
    const totalIssues = data?.total ?? 0;
    const [loading, setLoading] = useState(false);
    const { showBlockModal } = useBlockChecker();

    const handlePickCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleDeleteIssue = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                try {
                    const res = axiosInstance.delete(`/issues/${id}`);
                    if (res.acknowledged) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        });

                        refetch();
                    }
                } catch (err) {
                    console.log("", err);
                    toast.error(err.message);
                } finally {
                    setLoading(true);
                }
            }
        });
    };

    const handleUpdateModal = (task, issue = null) => {
        if (task === "open") {
            if (showBlockModal()) return;
            updateModalRef.current.showModal();
            setSelectedIssue(issue);
        } else {
            updateModalRef.current.close();
            setSelectedIssue(null);
        }
    };

    const handleUpdateIssue = async (data) => {
        console.log("data", data);

        setLoading(true);

        try {
            const updatedIssueInfo = {};

            if (data.title) updatedIssueInfo.title = data.title;
            if (data.description)
                updatedIssueInfo.description = data.description;
            if (data.category) updatedIssueInfo.category = data.category;
            if (data.image) {
                updatedIssueInfo.photoURL = await uploadImage(data.image[0]);
            }
            if (data.location) {
                updatedIssueInfo.location = data.location;
            }

            const result = await axiosInstance.patch(
                `/issues/${selectedIssue._id}`,
                updatedIssueInfo,
            );

            if (result.data.acknowledged) {
                Swal.fire({
                    title: "Issue Edited!",
                    text: "Issue has been edited",
                    icon: "success",
                });

                refetch();
                reset();
                updateModalRef.current.close();
            }
        } catch (err) {
            console.log("err", err);
            toast.error(
                err?.response?.data?.message ||
                    err.message ||
                    "Something went wrong",
            );
        } finally {
            setLoading(false);
        }
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
                                            issue.createdAt,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <div className="flex flex-wrap gap-2">
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
                                            {issue.status === "pending" && (
                                                <>
                                                    <div
                                                        className="tooltip"
                                                        data-tip="Edit Issue"
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                handleUpdateModal(
                                                                    "open",
                                                                    issue,
                                                                )
                                                            }
                                                            className="btn btn-secondary"
                                                        >
                                                            <SquarePen
                                                                size={16}
                                                            />
                                                        </button>
                                                    </div>

                                                    <div
                                                        className="tooltip"
                                                        data-tip="Delete Issue"
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteIssue(
                                                                    issue._id,
                                                                )
                                                            }
                                                            className="btn btn-error"
                                                            disabled={loading}
                                                        >
                                                            <Trash size={16} />{" "}
                                                            {loading && (
                                                                <Loading
                                                                    height="h-auto"
                                                                    width="w-auto"
                                                                    color="text-white"
                                                                />
                                                            )}
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <dialog
                ref={updateModalRef}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box w-full">
                    <legend className="fieldset-legend text-2xl">
                        Edit Issue
                    </legend>
                    {/* <fieldset className="fieldset w-full border-base-300 rounded-box border p-4"> */}
                    <form
                        onSubmit={handleSubmit(handleUpdateIssue)}
                        className="mt-5 space-y-3 w-full border-base-300 rounded-box border p-4"
                    >
                        <div className="flex flex-col gap-1">
                            <label className="label">Title</label>
                            <input
                                type="text"
                                {...register("title")}
                                className="input w-full"
                                defaultValue={selectedIssue?.title}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="label">Description</label>
                            <textarea
                                type="text"
                                {...register("description")}
                                className="textarea textarea-boarded w-full"
                                defaultValue={selectedIssue?.description}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="label mt-2">Category</label>
                            <select
                                {...register("category", { required: true })}
                                defaultValue={selectedIssue?.category || ""}
                                className="select select-neutral bg-base-200 w-full"
                            >
                                <option value={selectedIssue?.category}>
                                    {selectedIssue?.category
                                        ? `${selectedIssue.category.charAt(0).toUpperCase() + selectedIssue.category.slice(1)}`
                                        : ""}
                                </option>

                                {categories
                                    ?.filter(
                                        (c) => c !== selectedIssue?.category,
                                    )
                                    ?.map((c) => (
                                        <option key={c} value={c}>
                                            {c.charAt(0).toUpperCase() +
                                                c.slice(1)}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="label mt-2">Image</label>
                            <input
                                type="file"
                                {...register("image")}
                                className="file-input w-full"
                                placeholder="Image"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="label">Location</label>
                            <input
                                type="text"
                                {...register("location")}
                                className="input w-full"
                                defaultValue={selectedIssue?.location}
                            />
                        </div>

                        <div className="mt-5 flex flex-wrap justify-end gap-3 items-center">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                Update{" "}
                                {loading && (
                                    <Loading
                                        height="h-auto"
                                        width="w-auto"
                                        color="text-white"
                                    />
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => handleUpdateModal("close")}
                                className="btn"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}
