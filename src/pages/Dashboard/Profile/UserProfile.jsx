import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosInstance from "../../../hooks/useAxios";
import { CalendarPlus2, Gem, Mail } from "lucide-react";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { useEffect } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading";
import useRole from "../../../hooks/useRole";
import useBlockChecker from "../../../hooks/useBlockChecker";

export default function UserProfile() {
    const { user, updateUserProfile } = useAuth();
    const { role, roleLoading } = useRole();
    const axiosInstance = useAxiosInstance();
    const modalRef = useRef();
    const [infoUpdateLoding, setInfoUpdateLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {
        data: userInfo = {},
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["userInfo", user?.email],
        queryFn: async () => {
            let res;
            if (role === "user") {
                console.log("role", role);
                res = await axiosInstance(`/users?email=${user?.email}`);
            } else if (role === "staff") {
                console.log("role", role);
                res = await axiosInstance(`/staffs?email=${user?.email}`);
            }
            return res.data[0] || [];
        },
    });

    const { isBlocked } = useBlockChecker(userInfo);

    const handleModal = (task) => {
        if (task === "open") {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        }
    };

    const handleUpdateProfile = async (data) => {
        setInfoUpdateLoading(true);

        const profileImg = data.photo?.[0];
        const dbProfile = { displayName: data.name, photoURL: null };
        const fbProfile = { displayName: data.name, photoURL: null };

        try {
            if (profileImg) {
                const formData = new FormData();
                formData.append("image", profileImg);

                const result = await axiosInstance.post(
                    `https://api.imgbb.com/1/upload?key=${
                        import.meta.env.VITE_IMG_HOST_KEY
                    }`,
                    formData,
                );

                fbProfile.photoURL = result.data.data.url;
                dbProfile.photoURL = result.data.data.url;

                await updateUserProfile(fbProfile);
            }

            let res;
            if (role === "user") {
                res = await axiosInstance.patch(
                    `/users/${userInfo?._id}`,
                    dbProfile,
                );
            } else if (role === "staff") {
                res = await axiosInstance.patch(
                    `/staffs/${userInfo?._id}`,
                    dbProfile,
                );
            }

            if (res.data.acknowledged) {
                console.log("user info updated");
                modalRef.current.close();
            }
        } catch (err) {
            toast.error(err.message);
        } finally {
            setInfoUpdateLoading(false);
        }

        refetch();
    };

    const handleSubscription = async () => {
        setInfoUpdateLoading(true);
        const user = {
            id: userInfo?._id,
            email: userInfo?.email,
        };
        try {
            const res = await axiosInstance.post(
                "/payments/subscribe/checkout",
                user,
            );
            window.location.href = res.data.url;
            setInfoUpdateLoading(false);
        } catch (err) {
            toast.error(err.message);
            setInfoUpdateLoading(false);
        }
    };

    useEffect(() => {
        if (userInfo?.displayName) {
            document.title = `Profile | ${userInfo?.displayName}`;
        }
    }, [userInfo?.displayName]);

    return (
        <div className="max-w-375 mx-auto p-10">
            {isBlocked && (
                <div role="alert" className="alert alert-error mb-10">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <span>
                        Looks like your account is blocked. Please contact the
                        authorities.
                    </span>
                </div>
            )}
            {isLoading || roleLoading ? (
                <Loading />
            ) : (
                <>
                    <h2 className="text-3xl font-semibold">My Profile</h2>
                    <div className="bg-base-200 shadow-md mt-5 p-5 rounded-md max-w-2xl mx-auto flex flex-col justify-between gap-5">
                        <div className="flex flex-col-reverse sm:flex-row gap-5 justify-between">
                            <div className="w-40 h-w-40 overflow-hidden rounded-md shadow-sm">
                                {isLoading ? (
                                    <Loading height="h-auto" width="w-auto" />
                                ) : (
                                    <img
                                        className="w-full h-full"
                                        src={user?.photoURL}
                                        alt=""
                                    />
                                )}
                            </div>

                            <button
                                onClick={() => handleModal("open")}
                                className="btn btn-secondary"
                            >
                                Edit Profile
                            </button>
                        </div>

                        <div>
                            <div className="flex gap-3 items-center">
                                <h3 className="text-2xl font-semibold">
                                    {userInfo?.displayName}{" "}
                                </h3>
                                {userInfo?.isPremium && <Gem />}
                            </div>
                            <div className="mt-3 space-y-2">
                                <div
                                    className="flex gap-3 tooltip wrap-anywhere"
                                    data-tip="Email"
                                >
                                    <Mail /> {user?.email}
                                </div>
                                <div
                                    className="flex gap-3 tooltip"
                                    data-tip="Joined"
                                >
                                    <CalendarPlus2 />
                                    {userInfo
                                        ? new Date(
                                              userInfo?.createdAt,
                                          ).toLocaleDateString()
                                        : "Loading..."}
                                </div>
                                {role === "user" && (
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="flex gap-3 tooltip"
                                            data-tip="Subscribed"
                                        >
                                            <MdOutlineWorkspacePremium
                                                size={24}
                                            />
                                            {userInfo?.isPremium ? "Yes" : "No"}
                                        </div>
                                        {!userInfo?.isPremium && (
                                            <button
                                                className="btn btn-accent"
                                                onClick={handleSubscription}
                                            >
                                                Subscribe Today!{" "}
                                                {infoUpdateLoding && (
                                                    <Loading
                                                        height="h-auto"
                                                        width="w-auto"
                                                        color="text-neutral"
                                                    />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Open the modal using document.getElementById('ID').showModal() method */}
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
                        onSubmit={handleSubmit(handleUpdateProfile)}
                        className="mt-5 space-y-3 w-full border-base-300 rounded-box border p-4"
                    >
                        <div className="flex flex-col gap-1">
                            <label className="label">Name</label>
                            <input
                                type="text"
                                {...register("name")}
                                className="input w-full"
                                defaultValue={userInfo?.displayName}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="label">Photo</label>
                            <input
                                type="file"
                                {...register("photo")}
                                className="file-input w-full"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="input w-full"
                                defaultValue={user?.email}
                                disabled
                            />
                        </div>
                        <div className="mt-5 flex flex-wrap justify-end gap-3 items-center">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={infoUpdateLoding}
                            >
                                Update{" "}
                                {infoUpdateLoding && (
                                    <Loading
                                        height="h-auto"
                                        width="w-auto"
                                        color="text-accent"
                                    />
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => handleModal("close")}
                                className="btn"
                                disabled={infoUpdateLoding}
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
