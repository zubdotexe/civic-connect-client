import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useaxiosInstance from "../../../hooks/useAxios";
import Swal from 'sweetalert2'

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
    const { register, handleSubmit } = useForm();
    const [category, setCategory] = useState("");
    const axiosInstance = useaxiosInstance();

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

                        await axiosInstance
                            .post("/issues", data)
                            .then((result) => {
                                console.log("", result);

                                Swal.fire({
                                    title: "Reported!",
                                    text: "Your issue has been reported.",
                                    icon: "success",
                                });
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
                <fieldset className="mt-5 fieldset bg-base-200 border-base-300 rounded-box w-96 border p-4">
                    {/* <legend className="fieldset-legend">Report Issue</legend> */}
                    <form
                        onSubmit={handleSubmit(handleReport)}
                        className="flex flex-col"
                    >
                        <label className="label mt-2">Title</label>
                        <input
                            type="text"
                            {...register("title")}
                            className="input w-full"
                            placeholder="Title"
                        />

                        <label className="label mt-2">Description</label>
                        <textarea
                            type="text"
                            {...register("description")}
                            className="input h-15 w-full"
                            placeholder="Description"
                        />

                        <label className="label mt-2">Category</label>
                        <select
                            value={category}
                            {...register("category")}
                            className="select select-neutral bg-base-200 w-full"
                            onChange={handlePickCategory}
                        >
                            <option value="" disabled={true}>
                                Pick a category
                            </option>
                            {categories?.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>

                        <label className="label mt-2">Image</label>
                        <input
                            type="file"
                            {...register("image")}
                            className="file-input w-full"
                            placeholder="Image"
                        />

                        <label className="label mt-2">Location</label>
                        <input
                            type="text"
                            {...register("location")}
                            className="input w-full"
                            placeholder="Location"
                        />

                        <button className="w-full btn btn-primary mt-4">
                            Report
                        </button>
                    </form>
                </fieldset>
            </div>
        </div>
    );
}
