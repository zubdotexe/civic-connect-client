import { useQuery } from "@tanstack/react-query";
import React from "react";
import useaxiosInstance from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function ManageStaffs() {
    const axiosInstance = useaxiosInstance();
    const modalRef = useRef();
    const { registerUser, updateUserProfile, loading, setLoading } = useAuth();
    const [staffloading, setStaffLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const {
        data: staffs = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["staffs"],
        queryFn: async () => {
            const res = await axiosInstance.get("/staffs");
            return res.data;
        },
    });

    console.log("staffs", staffs);

    const handleModal = (task) => {
        if (task === "open") {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        }
    };

    const handleAddStaff = async (data) => {
        console.log("data", data);
        setStaffLoading(true);
        try {
            // const res = await registerUser(data.email, data.password);
            // setLoading(false);
            const profileImg = data.photo?.[0];

            const formData = new FormData();
            formData.append("image", profileImg);

            const imgApiUrl = `https://api.imgbb.com/1/upload?key=${
                import.meta.env.VITE_IMG_HOST_KEY
            }`;

            const imgBBRes = await axiosInstance.post(imgApiUrl, formData);

            if (!imgBBRes.data?.success) {
                throw new Error("image upload failed");
            }

            // const staffProfile = {
            //     displayName: data.name,
            //     photoURL: imgBBRes.data.data.url,
            // };

            // const updateRes = await updateUserProfile(staffProfile);
            const newStaff = {
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
                photoURL: imgBBRes.data.data.url,
            };

            const userRes = await axiosInstance.post(
                "/admin/create-staff",
                newStaff
            );

            refetch();
            reset();
            modalRef.current.close();
            Swal.fire({
                title: "Staff added!",
                text: "You have successfully added a staff",
                icon: "success",
            });
        } catch (err) {
            console.log("err", err);
            toast.error(
                err?.response?.data?.message ||
                    err.message ||
                    "Something went wrong"
            );
        } finally {
            setStaffLoading(false);
        }
    };

    useEffect(() => {
        console.log("ManageStaffs mounted");
        return () => console.log("ManageStaffs unmounted");
    }, []);

    return (
        <div>
            <div className="max-w-375 mx-auto p-10">
                <div className="flex flex-wrap gap-3 justify-between">
                    <h2 className="text-3xl font-semibold">
                        Staff Management ({staffs.length})
                    </h2>

                    <div className="flex gap-2">
                        <button
                            onClick={() => handleModal("open")}
                            className="btn btn-secondary"
                        >
                            Add Staff
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <Loading />
                ) : staffs.length === 0 ? (
                    <div className="flex items-center justify-center h-24">
                        <p className="text-xl text-gray-400">No Staffs Found</p>
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
                                    <th>Status</th>
                                    <th>Work Status</th>
                                    <th>Joined</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {staffs.map((staff, idx) => (
                                    <tr key={staff._id}>
                                        <th>{idx + 1}</th>
                                        <td>{staff.displayName}</td>

                                        <td>{staff.email}</td>
                                        <td>{staff.phone}</td>
                                        <td>{staff.status}</td>
                                        <td>{staff.workStatus}</td>

                                        <td>
                                            {new Date(
                                                staff.createdAt
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <div className="flex flex-wrap gap-2">
                                                <button className="btn btn-primary">
                                                    Update
                                                </button>
                                                <button className="btn btn-error">
                                                    Delete
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
            <dialog
                ref={modalRef}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box w-full">
                    <legend className="fieldset-legend text-2xl">
                        Update Profile Information
                    </legend>
                    {/* <fieldset className="fieldset w-full border-base-300 rounded-box border p-4"> */}
                    <form
                        onSubmit={handleSubmit(handleAddStaff)}
                        className="mt-5 space-y-3 w-full border-base-300 rounded-box border p-4"
                    >
                        <div className="flex flex-col gap-1">
                            <label className="label">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                className="input w-full"
                                placeholder="Enter Name"
                            />
                            {errors.name?.type === "required" && (
                                <p className="text-error font-semibold text-sm">
                                    Name is required
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="input w-full"
                                placeholder="Enter Email"
                            />
                            {errors.email?.type === "required" && (
                                <p className="text-error font-semibold text-sm">
                                    Email is required
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="label">Phone</label>
                            <input
                                type="text"
                                {...register("phone", { required: true })}
                                className="input w-full"
                                placeholder="Enter Phone"
                            />
                            {errors.phone?.type === "required" && (
                                <p className="text-error font-semibold text-sm">
                                    Phone is required
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="label">Photo</label>
                            <input
                                type="file"
                                {...register("photo", { required: true })}
                                className="file-input w-full"
                            />
                            {errors.photo?.type === "required" && (
                                <p className="text-error font-semibold text-sm">
                                    Photo is required
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="label">Password</label>
                            <input
                                type="password"
                                {...register(
                                    "password",
                                    { required: true },
                                    { required: true }
                                )}
                                className="input w-full"
                                placeholder="Enter Password"
                            />
                            {errors.password?.type === "required" && (
                                <p className="text-error font-semibold text-sm">
                                    Password is required
                                </p>
                            )}
                        </div>

                        <div className="mt-5 flex flex-wrap justify-end gap-3 items-center">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={staffloading}
                            >
                                Add{" "}
                                {staffloading && (
                                    <Loading
                                        height="h-full"
                                        color="text-accent"
                                    />
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => handleModal("close")}
                                className="btn"
                                disabled={staffloading}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                    {/* </fieldset> */}
                    <div className="modal-action">
                        {/* <button
                                    onClick={() => handleModal("close")}
                                    className="btn"
                                >
                                    Cancel
                                </button> */}
                    </div>
                </div>
            </dialog>
        </div>
    );
}
