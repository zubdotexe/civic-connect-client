import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useaxiosInstance from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";

export default function UserDashboard() {
    const { user } = useAuth();
    const axiosInstance = useaxiosInstance();

    const { data: userStats = {}, isLoading } = useQuery({
        queryKey: ["userStats", user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/stats/users?email=${user?.email}`,
            );
            return res.data;
        },
    });

    console.log("userStats", userStats);

    return (
        <div>
            <h1 className="bg-base-200 rounded-md p-5 text-4xl font-semibold">
                Issues
            </h1>
            {isLoading ? (
                <Loading height="h-auto" width="w-auto" />
            ) : (
                <div className="grid sm:grid-cols-2 mt-5 gap-3">
                    <div className="bg-base-200 hover:bg-base-300 shadow-sm rounded-md p-5 flex flex-col items-center">
                        <h2 className="stat-title text-xl">Total Submitted</h2>
                        <p className="stat-value">{userStats.totalIssues || 0}</p>
                    </div>
                    <div className="bg-base-200 hover:bg-base-300 shadow-sm rounded-md p-5 flex flex-col items-center">
                        <h2 className="stat-title text-xl">Total Pending</h2>
                        <p className="stat-value">
                            {userStats.byStatus?.pending || 0}
                        </p>
                    </div>
                    <div className="bg-base-200 hover:bg-base-300 shadow-sm rounded-md p-5 flex flex-col items-center">
                        <h2 className="stat-title text-xl">Total Resolved</h2>
                        <p className="stat-value">
                            {userStats.byStatus?.resolved || 0}
                        </p>
                    </div>
                    <div className="bg-base-200 hover:bg-base-300 shadow-sm rounded-md p-5 flex flex-col items-center">
                        <h2 className="stat-title text-xl">
                            Total In-progress
                        </h2>
                        <p className="stat-value">
                            {userStats.byStatus?.["in-progress"] || 0}
                        </p>
                    </div>
                </div>
            )}
            <h1 className="mt-7 bg-base-200 rounded-md p-5 text-4xl font-semibold">
                Payments
            </h1>
            {isLoading ? (
                <Loading height="h-auto" width="w-auto" />
            ) : (
                <div className="mt-5">
                    <div className="bg-base-200 hover:bg-base-300 shadow-sm rounded-md p-5 flex flex-col items-center">
                        <h2 className="stat-title text-xl">Total Paid</h2>
                        <p className="stat-value">৳ {userStats.totalPaid || 0}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
