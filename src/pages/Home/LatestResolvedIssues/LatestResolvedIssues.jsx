import { useQuery } from "@tanstack/react-query";
import useaxiosInstance from "../../../hooks/useAxios";
import IssueCard from "../../../components/IssueCard";
import { Link } from "react-router";

export default function LatestResolvedIssues() {
    const axiosInstance = useaxiosInstance();
    const { isLoading, data: issues = [] } = useQuery({
        queryKey: ["issues"],
        queryFn: async () => {
            const res = await axiosInstance.get(
                "/latest-issues?status=resolved"
            );
            return res.data;
        },
    });

    return (
        <div className="max-w-375 mx-auto p-10 bg-base-200">
            <h2 className="text-3xl font-semibold">Latest Resolved Issues</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-7">
                {issues.map((issue, idx) => (
                    <IssueCard key={idx} issue={issue} />
                ))}
            </div>
            <div className="mt-5 flex justify-center">
                <Link to="/issues" className="btn btn-primary">View All Issues</Link>
            </div>
        </div>
    );
}
