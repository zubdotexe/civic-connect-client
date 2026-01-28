import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import useBlockChecker from "../../../hooks/useBlockChecker";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosInstance from "../../../hooks/useAxios";
import { toast } from "react-toastify";

const categories = [
    "water",
    "roads",
    "lightning",
    "sanitation",
    "sidewalks",
    "traffic",
    "parks",
];

export default function ReportIssue() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [category, setCategory] = useState("");
    const axiosInstance = useAxiosInstance();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePickCategory = (e) => {
        setCategory(e.target.value);
    };

    const { data: userInfo = {}, isLoading: userLoading } = useQuery({
        queryKey: ["userInfo", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            return res.data[0] || {};
        },
    });

    const { showBlockModal } = useBlockChecker(userInfo);

    const { data, isLoading: userIssuesLoading } = useQuery({
        queryKey: ["issues", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/issues?email=${user?.email}`);
            return res.data;
        },
    });

    const totalIssues = data?.total ?? 0;

    const handleReport = async (data) => {
        if (showBlockModal()) return;

        Swal.fire({
            title: "Are you sure?",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1E88E5",
            cancelButtonColor: "#43A047",
            confirmButtonText: "Yes, report it!",
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true);
                // console.log("data", data);

                const imageUrl = data.image[0];
                const formData = new FormData();
                formData.append("image", imageUrl);
                const imgApiUrl = `https://api.imgbb.com/1/upload?key=${
                    import.meta.env.VITE_IMG_HOST_KEY
                }`;

                axiosInstance
                    .post(imgApiUrl, formData)
                    .then(async (result) => {
                        data.image = result.data.data.url;
                        // adding name and email to payload
                        data.email = userInfo.email;
                        data.name = userInfo.displayName;

                        await axiosSecure
                            .post("/issues", data)
                            .then((result) => {
                                // console.log("", result);

                                Swal.fire({
                                    title: "Reported!",
                                    text: "Your issue has been reported.",
                                    icon: "success",
                                });

                                const issueLog = {
                                    issueId: result.data.insertedId,
                                    issueStatus: "pending",
                                    issueNote: "Issue reported by citizen",
                                };

                                axiosSecure
                                    .post("/issues/trackings", issueLog)
                                    .then((res) => {
                                        console.log("issue log inserted");
                                    })
                                    .catch((err) => {
                                        console.log("", err);
                                    })
                                    .finally(() => setLoading(false));

                                reset();
                                setCategory("");

                                navigate("/dashboard/my-issues");
                            })
                            .catch((err) => {
                                console.log("", err);
                                toast.error(err.message);
                            })
                            .finally(() => setLoading(false));
                    })
                    .catch((err) => {
                        console.log("", err);
                        toast.error(err.message);
                    })
                    .finally(() => setLoading(false));
            }
        });
    };

    useEffect(() => {
        document.title = "Report Issue";
    }, []);

    return (
        <div className="flex justify-center items-center p-10">
            <div>
                <h2 className="text-2xl font-semibold">Report Issue</h2>
                <fieldset className="mt-3 fieldset bg-base-200 border-base-300 rounded-box w-96 border p-4">
                    {/* <legend className="fieldset-legend">Report Issue</legend> */}
                    <form
                        onSubmit={handleSubmit(handleReport)}
                        className="flex flex-col"
                    >
                        <div className="space-y-1">
                            <label className="label text-xl">Title</label>
                            <input
                                type="text"
                                {...register("title", { required: true })}
                                className="input w-full"
                                placeholder="Title"
                            />
                            {errors?.title?.type === "required" && (
                                <p className="text-error">Title is required</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="label mt-2 text-xl">
                                Description
                            </label>
                            <textarea
                                type="text"
                                {...register("description", { required: true })}
                                className="textarea textarea-boarded h-15 w-full"
                                placeholder="Description"
                            />
                            {errors?.description?.type === "required" && (
                                <p className="text-error">
                                    Description is required
                                </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="label mt-2 text-xl">
                                Category
                            </label>
                            <select
                                value={category}
                                {...register("category", { required: true })}
                                className="select select-neutral bg-base-200 w-full"
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
                            {errors?.category?.type === "required" && (
                                <p className="text-error">
                                    Category is required
                                </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="label mt-2 text-xl">Image</label>
                            <input
                                type="file"
                                {...register("image", { required: true })}
                                className="file-input w-full"
                                placeholder="Image"
                            />
                            {errors?.image?.type === "required" && (
                                <p className="text-error">Image is required</p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <label className="label mt-2 text-xl">
                                Location
                            </label>
                            <input
                                type="text"
                                {...register("location", { required: true })}
                                className="input w-full"
                                placeholder="Location"
                            />
                            {errors?.location?.type === "required" && (
                                <p className="text-error">
                                    Location is required
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-center">
                            {userIssuesLoading ? (
                                <Loading
                                    height="h-auto"
                                    width="w-auto"
                                    color="text-accent"
                                />
                            ) : !userInfo?.isPremium && totalIssues >= 3 ? (
                                <Link
                                    to="/dashboard/my-profile"
                                    className="w-full btn btn-accent mt-4"
                                >
                                    Subscribe
                                </Link>
                            ) : (
                                <button
                                    className="w-full btn btn-primary mt-4"
                                    disabled={loading}
                                >
                                    Report{" "}
                                    {loading && (
                                        <Loading
                                            height="h-auto"
                                            width="w-auto"
                                            color="text-white"
                                        />
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </fieldset>
            </div>
        </div>
    );
}
