import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosInstance from "../hooks/useAxios";

export default function useRole() {
    const { user } = useAuth();
    const axiosInstance = useAxiosInstance();

    const { data: role, isLoading: roleLoading } = useQuery({
        queryKey: ["userRole", user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/user/role/${user?.email}`);
            return res.data.role;
        },
    });

    return { role, roleLoading };
}
