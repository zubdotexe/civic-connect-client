import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "./useAxiosSecure";

export default function useRole() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role, isLoading: roleLoading } = useQuery({
        queryKey: ["userRole", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/role/${user?.email}`);
            return res.data.role;
        },
    });

    return { role, roleLoading };
}
