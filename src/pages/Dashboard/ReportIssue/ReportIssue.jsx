import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useaxiosInstance from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

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
    const axiosInstance = useaxiosInstance();
    const { user } = useAuth();

    const handlePickCategory = (e) => {
        setCategory(e.target.value);
    };

    const handleReport = async (data) => {
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
                console.log("data", data);

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
                        data.email = user.email;
                        data.name = user.displayName;

                        await axiosInstance
                            .post("/issues", data)
                            .then((result) => {
                                console.log("", result);

                                Swal.fire({
                                    title: "Reported!",
                                    text: "Your issue has been reported.",
                                    icon: "success",
                                });

                                const issueLog = {
                                    issueId: result.data.insertedId,
                                    issueStatus: "pending",
                                };

                                axiosInstance
                                    .post("/issues/trackings", issueLog)
                                    .then((res) => {
                                        console.log("issue log inserted");
                                    })
                                    .catch((err) => {
                                        console.log("", err);
                                    });

                                reset();
                                setCategory("");
                            })
                            .catch((err) => {
                                console.log("", err);
                            });
                    })
                    .catch((err) => {
                        console.log("", err);
                    });
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
                                className="input h-15 w-full"
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

                        <button className="w-full btn btn-primary mt-4">
                            Report
                        </button>
                    </form>
                </fieldset>
            </div>
        </div>
    );
}
