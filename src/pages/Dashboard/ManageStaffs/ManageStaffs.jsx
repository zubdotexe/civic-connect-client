import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosInstance from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useImgUp from "../../../hooks/useImgUp";

export default function ManageStaffs() {
    const axiosInstance = useAxiosInstance();
    const addModalRef = useRef();
    const updateModalRef = useRef();
    const { registerUser, updateUserProfile, loading, setLoading } = useAuth();
    const [staffloading, setStaffLoading] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const { uploadImage } = useImgUp();

    const {
        register: addRegister,
        handleSubmit: addHandleSubmit,
        formState: { errors: addErrors },
        reset,
    } = useForm();

    const { register: updateRegister, handleSubmit: updateHandleSubmit } =
        useForm();

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

    const handleAddModal = (task) => {
        if (task === "open") {
            addModalRef.current.showModal();
        } else {
            addModalRef.current.close();
        }
    };

    const handleUpdateModal = (task, staff = null) => {
        if (task === "open") {
            updateModalRef.current.showModal();
            setSelectedStaff(staff);
        } else {
            updateModalRef.current.close();
            setSelectedStaff(null);
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
                newStaff,
            );

            refetch();
            reset();
            addModalRef.current.close();
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
                    "Something went wrong",
            );
        } finally {
            setStaffLoading(false);
        }
    };

    const handleUpdateStuff = async (data) => {
        console.log("up", data);
        setStaffLoading(true);

        try {
            const updatedStaffInfo = {};

            if (data.name) updatedStaffInfo.displayName = data.name;
            if (data.email) updatedStaffInfo.email = data.email;
            if (data.phone) updatedStaffInfo.phone = data.phone;
            if (data.photo) {
                updatedStaffInfo.photoURL = await uploadImage(data.photo[0]);
            }

            const result = await axiosInstance.patch(
                `/staffs/${selectedStaff._id}`,
                updatedStaffInfo,
            );

            if (result.data.modifiedCount) {
                Swal.fire({
                    title: "Staff Info Updated!",
                    text: "Staff information has been updated",
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
            setStaffLoading(false);
        }
    };

    const handleDelStaff = (id) => {
        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove staff!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/staffs/${id}`).then((res) => {
                    console.log(res.data);

                    if (res.data.deletedCount) {
                        // refresh the data in the ui
                        refetch();

                        Swal.fire({
                            title: "Removed!",
                            text: "The staff has been removed",
                            icon: "success",
                        });
                    }
                });
            }
        });
    };

    useEffect(() => {
        document.title = "Staff Management";
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
                            onClick={() => handleAddModal("open")}
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
                                                staff.createdAt,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() =>
                                                        handleUpdateModal(
                                                            "open",
                                                            staff,
                                                        )
                                                    }
                                                    className="btn btn-primary"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelStaff(
                                                            staff._id,
                                                        )
                                                    }
                                                    className="btn btn-error"
                                                >
                                                    Remove
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

            {/* add staff info modal */}
            <dialog
                ref={addModalRef}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box w-full">
                    <legend className="fieldset-legend text-2xl">
                        Add Staff
                    </legend>
                    {/* <fieldset className="fieldset w-full border-base-300 rounded-box border p-4"> */}
                    <form
                        onSubmit={addHandleSubmit(handleAddStaff)}
                        className="mt-5 space-y-3 w-full border-base-300 rounded-box border p-4"
                    >
                        <div className="flex flex-col gap-1">
                            <label className="label">Name</label>
                            <input
                                type="text"
                                {...addRegister("name", { required: true })}
                                className="input w-full"
                                placeholder="Enter Name"
                            />
                            {addErrors.name?.type === "required" && (
                                <p className="text-error font-semibold text-sm">
                                    Name is required
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                {...addRegister("email", { required: true })}
                                className="input w-full"
                                placeholder="Enter Email"
                            />
                            {addErrors.email?.type === "required" && (
                                <p className="text-error font-semibold text-sm">
                                    Email is required
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="label">Phone</label>
                            <input
                                type="text"
                                {...addRegister("phone", { required: true })}
                                className="input w-full"
                                placeholder="Enter Phone"
                            />
                            {addErrors.phone?.type === "required" && (
                                <p className="text-error font-semibold text-sm">
                                    Phone is required
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="label">Photo</label>
                            <input
                                type="file"
                                {...addRegister("photo", { required: true })}
                                className="file-input w-full"
                            />
                            {addErrors.photo?.type === "required" && (
                                <p className="text-error font-semibold text-sm">
                                    Photo is required
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="label">Password</label>
                            <input
                                type="password"
                                {...addRegister("password", { required: true })}
                                className="input w-full"
                                placeholder="Enter Password"
                            />
                            {addErrors.password?.type === "required" && (
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
                                        height="h-auto"
                                        width="w-auto"
                                        color="text-accent"
                                    />
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => handleAddModal("close")}
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

            {/* update staff info modal */}
            <dialog
                ref={updateModalRef}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box w-full">
                    <legend className="fieldset-legend text-2xl">
                        Update Staff Information
                    </legend>
                    {/* <fieldset className="fieldset w-full border-base-300 rounded-box border p-4"> */}
                    <form
                        onSubmit={updateHandleSubmit(handleUpdateStuff)}
                        className="mt-5 space-y-3 w-full border-base-300 rounded-box border p-4"
                    >
                        <div className="flex flex-col gap-1">
                            <label className="label">Name</label>
                            <input
                                type="text"
                                {...updateRegister("name")}
                                className="input w-full"
                                defaultValue={selectedStaff?.displayName}
                            />
                            {/* {errors.name?.type === "required" && (
                                <p className="text-error font-semibold text-sm">
                                    Name is required
                                </p>
                            )} */}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                {...updateRegister("email")}
                                className="input w-full"
                                defaultValue={selectedStaff?.email}
                            />
                            {/* {errors.email?.type === "required" && (
                                <p className="text-error font-semibold text-sm">
                                    Email is required
                                </p>
                            )} */}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="label">Phone</label>
                            <input
                                type="text"
                                {...updateRegister("phone")}
                                className="input w-full"
                                defaultValue={selectedStaff?.phone}
                            />
                            {/* {errors.phone?.type === "required" && (
                                <p className="text-error font-semibold text-sm">
                                    Phone is required
                                </p>
                            )} */}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="label">Photo</label>
                            <input
                                type="file"
                                {...updateRegister("photo")}
                                className="file-input w-full"
                            />
                            {/* {errors.photo?.type === "required" && (
                                <p className="text-error font-semibold text-sm">
                                    Photo is required
                                </p>
                            )} */}
                        </div>
                        {/* <div className="flex flex-col gap-1">
                            <label className="label">Password</label>
                            <input
                                type="password"
                                {...updateRegister("password")}
                                className="input w-full"
                                placeholder="Enter Password"
                            />
                        </div> */}

                        <div className="mt-5 flex flex-wrap justify-end gap-3 items-center">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={staffloading}
                            >
                                Update{" "}
                                {staffloading && (
                                    <Loading
                                        height="h-auto"
                                        width="w-auto"
                                        color="text-accent"
                                    />
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => handleUpdateModal("close")}
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
