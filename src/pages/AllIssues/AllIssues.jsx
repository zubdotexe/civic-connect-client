import { useQuery } from "@tanstack/react-query";
import React from "react";
import useaxiosInstance from "../../hooks/useAxios";
import IssueCard from "../../components/IssueCard";

export default function AllIssues() {
    const axiosInstance = useaxiosInstance();
    const { data: issues = [] } = useQuery({
        queryKey: ["issues"],
        queryFn: async () => {
            const res = await axiosInstance.get("/issues");
            return res.data;
        },
    });
    return (
        <div className="max-w-375 mx-auto p-10 bg-base-200">
            <h2 className="text-3xl font-semibold">All Issues</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-7">
                {issues.map((issue, idx) => (
                    <IssueCard key={idx} issue={issue} />
                ))}
            </div>
        </div>
    );
}
