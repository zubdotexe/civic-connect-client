import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useaxiosInstance from "../../../hooks/useAxios";
import { CalendarPlus2, Gem, Mail } from "lucide-react";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { useEffect } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function UserProfile() {
    const { user, setLoading, updateUserProfile } = useAuth();
    const axiosInstance = useaxiosInstance();
    const modalRef = useRef();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { data: userInfo = {}, isLoading, refetch } = useQuery({
        queryKey: ["userInfo", user?.email],
        queryFn: async () => {
            const res = await axiosInstance(`/users?email=${user?.email}`);
            return res.data[0];
        },
    });

    const handleModal = (task) => {
        if (task === "open") {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        }
    };

    const handleUpdateProfile = (data) => {
        const profileImg = data.photo[0];
        console.log("data", data.name);

        const dbProfile = {
            displayName: data.name,
            photoURL: null,
        };

        const fbProfile = {
            displayName: data.name,
            photoURL: null,
        };

        if (profileImg) {
            const formData = new FormData();
            formData.append("image", profileImg);

            const imgApiUrl = `https://api.imgbb.com/1/upload?key=${
                import.meta.env.VITE_IMG_HOST_KEY
            }`;

            axiosInstance
                .post(imgApiUrl, formData)
                .then((result) => {
                    // const userProfile = {
                    //     displayName: data.name,
                    //     photoURL: result.data.data.url,
                    // };

                    fbProfile.photoURL = result.data.data.url;
                    dbProfile.photoURL = result.data.data.url;

                    updateUserProfile(fbProfile)
                        .then((result) => {
                            axiosInstance
                                .patch(`/users/${userInfo?._id}`, dbProfile)
                                .then((res) => {
                                    if (res.data.acknowledged) {
                                        console.log("user info updated");
                                        modalRef.current.close();
                                    }
                                })
                                .catch((err) => {
                                    toast.error(err.message);
                                    setLoading(false);
                                });
                        })
                        .catch((err) => {
                            console.log("", err);
                            toast.error(err.message);
                            setLoading(false);
                        });
                })
                .catch((err) => {
                    console.log("err", err);
                    toast.error(err.message);
                    setLoading(false);
                });
        } else {
            axiosInstance
                .patch(`/users/${userInfo?._id}`, dbProfile)
                .then((res) => {
                    if (res.data.acknowledged) {
                        console.log("user info updated");
                        modalRef.current.close();
                    }
                })
                .catch((err) => {
                    toast.error(err.message);
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        if (userInfo?.displayName) {
            document.title = `Profile | ${userInfo?.displayName}`;
        }
    }, [userInfo?.displayName]);

    return (
        <div className="max-w-375 mx-auto p-10">
            <h2 className="text-3xl font-semibold">My Profile</h2>
            <div className="bg-base-200 shadow-md mt-5 p-5 rounded-md max-w-2xl mx-auto flex flex-col justify-between gap-5">
                <div className="flex flex-col-reverse sm:flex-row gap-5 justify-between">
                    <div className="w-32 h-32 overflow-hidden rounded-md">
                        <img
                            className="w-full h-full"
                            src={user?.photoURL}
                            alt=""
                        />
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
                        <div className="flex gap-3 tooltip" data-tip="Joined">
                            <CalendarPlus2 />
                            {userInfo
                                ? new Date(
                                      userInfo?.createdAt
                                  ).toLocaleDateString()
                                : "Loading..."}
                        </div>
                        <div className="flex items-center gap-3">
                            <div
                                className="flex gap-3 tooltip"
                                data-tip="Subscribed"
                            >
                                <MdOutlineWorkspacePremium size={24} />
                                {userInfo?.isPremium ? "Yes" : "No"}
                            </div>
                            {!userInfo?.isPremium && (
                                <button className="btn btn-accent">
                                    Subscribe Today!
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

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
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={() => handleModal("close")}
                                className="btn"
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
