import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import { useRef } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ManageUsers() {
    const axiosInstance = useAxiosInstance();
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const {
        data: users = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosInstance.get("/users");
            return res.data;
        },
    });

    const handleBlocking = (task, user) => {
        setLoading(true);
        setSelectedUser(user);
        const status = {};
        if (task === "block") {
            status.isBlocked = true;
        } else if (task === "unblock") {
            status.isBlocked = false;
        }

        Swal.fire({
            title: "Are you sure?",
            text: `The user is going to be ${task}ed!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosInstance
                        .patch(`/users/${user._id}`, status)
                        .then((res) => {
                            if (res.data.acknowledged) {
                                refetch();

                                Swal.fire({
                                    title: "Updated!",
                                    text: `The user has been ${task}ed`,
                                    icon: "success",
                                });
                            }
                        })
                        .catch((err) => toast.message(err.message))
                        .finally(setLoading(false));
                }
            })
            .catch((err) => {
                console.log("err", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        document.title = "User Management";
    }, []);

    return (
        <div>
            <div className="max-w-375 mx-auto p-10">
                <h2 className="text-3xl font-semibold">
                    User Management ({users.length})
                </h2>

                {isLoading ? (
                    <Loading />
                ) : users.length === 0 ? (
                    <div className="flex items-center justify-center h-24">
                        <p className="text-xl text-gray-400">No Users Found</p>
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
                                    <th>Premium User</th>
                                    <th>Blocked</th>
                                    <th>Joined</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {users.map((user, idx) => (
                                    <tr key={user._id}>
                                        <th>{idx + 1}</th>
                                        <td>{user.displayName}</td>

                                        <td>{user.email}</td>
                                        <td>{user.isPremium ? "Yes" : "No"}</td>
                                        <td>{user.isBlocked ? "Yes" : "No"}</td>
                                        <td>
                                            {new Date(
                                                user.createdAt,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>
                                            {user.isBlocked ? (
                                                <button
                                                    onClick={() =>
                                                        handleBlocking(
                                                            "unblock",
                                                            user,
                                                        )
                                                    }
                                                    className="btn btn-success"
                                                >
                                                    Unblock{" "}
                                                    {loading &&
                                                        selectedUser?._id ===
                                                            user._id && (
                                                            <Loading
                                                                height="h-auto"
                                                                width="w-auto"
                                                                color="text-white"
                                                            />
                                                        )}
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        handleBlocking(
                                                            "block",
                                                            user,
                                                        )
                                                    }
                                                    className="btn btn-error"
                                                >
                                                    Block{" "}
                                                    {loading &&
                                                        selectedUser?._id ===
                                                            user._id && (
                                                            <Loading
                                                                height="h-auto"
                                                                width="w-auto"
                                                                color="text-white"
                                                            />
                                                        )}
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
