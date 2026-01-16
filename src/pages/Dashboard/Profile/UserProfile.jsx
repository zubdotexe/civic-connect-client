import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import useaxiosInstance from "../../../hooks/useAxios";
import { CalendarPlus2, Gem, Mail } from "lucide-react";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { useEffect } from "react";

export default function UserProfile() {
    const { user } = useAuth();
    const axiosInstance = useaxiosInstance();
    const { data: userInfo = {}, isLoading } = useQuery({
        queryKey: ["userInfo", user?.email],
        queryFn: async () => {
            const res = await axiosInstance(`/users?email=${user?.email}`);
            return res.data[0];
        },
    });

    console.log("userInfo", userInfo);
    console.log("userInfo?.createdAt", userInfo?.createdAt);

    useEffect(() => {
        document.title = `Profile | ${user?.displayName}`;
    }, []);

    return (
        <div className="max-w-375 mx-auto p-10">
            <h2 className="text-3xl font-semibold">My Profile</h2>
            <div className="bg-base-200 mt-5 p-5 rounded-md max-w-2xl mx-auto flex flex-col justify-between gap-5">
                <div className="flex flex-col-reverse sm:flex-row gap-5 justify-between">
                    <div className="w-32 h-32 overflow-hidden rounded-md">
                        <img
                            className="w-full h-full"
                            src={user?.photoURL}
                            alt=""
                        />
                    </div>

                    <button className="btn btn-secondary">Edit Profile</button>
                </div>

                <div>
                    <div className="flex gap-3 items-center">
                        <h3 className="text-2xl font-semibold">
                            {user?.displayName}{" "}
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
                        <div
                            className="flex gap-3 tooltip"
                            data-tip="Subscribed"
                        >
                            <MdOutlineWorkspacePremium size={24} />
                            {userInfo?.isPremium ? "Yes" : "No"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
