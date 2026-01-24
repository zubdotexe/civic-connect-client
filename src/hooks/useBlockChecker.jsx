import Swal from "sweetalert2";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "./useAxios";

export default function useBlockChecker(externalUserInfo, showModal = true) {
    const { user } = useAuth();
    const axiosInstance = useAxiosInstance();
    const { data: fetchedUserInfo = {} } = useQuery({
        enabled: !externalUserInfo,
        queryKey: ["userInfo", user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users?email=${user?.email}`);
            return res.data[0];
        },
    });

    const userInfo = fetchedUserInfo || externalUserInfo;
    const isBlocked = userInfo?.isBlocked || false;

    const showBlockModal = () => {
        if (userInfo.isBlocked) {
            if (showModal) {
                Swal.fire({
                    title: "Access unavailable!",
                    text: "Looks like your account is blocked. Please contact the authorities.",
                    icon: "error",
                });
            }

            return true;
        }

        return false;
    };

    return { showBlockModal, isBlocked };
}
