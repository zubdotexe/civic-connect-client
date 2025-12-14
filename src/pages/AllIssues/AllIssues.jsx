import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useaxiosInstance from "../../hooks/useAxios";
import IssueCard from "../../components/IssueCard";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

export default function AllIssues() {
    const axiosInstance = useaxiosInstance();
    // const [totalIssues, setTotalIssues] = useState(0);
    // const [totalPages, setTotalPages] = useState(0);
    const limit = 6;
    const [currPage, setCurrPage] = useState(0);

    const { data } = useQuery({
        queryKey: ["issues", currPage],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/issues?limit=${limit}&skip=${currPage * limit}`
            );
            // setTotalIssues(res.data.total);
            // const pages = Math.ceil(totalIssues / limit);
            // setTotalPages(pages);
            return res.data;
        },
    });

    const issues = data?.result ?? [];
    const totalIssues = data?.total ?? 0;
    const totalPages = Math.ceil(totalIssues / limit);

    // useEffect(() => {
    // console.log("", totalIssues);
    // }, []);

    useEffect(() => {
        (document.title = "All Issues"),
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
    }, []);

    return (
        <div className="max-w-375 mx-auto p-10 bg-base-200">
            <h2 className="text-3xl font-semibold">
                All Issues ({totalIssues})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-7">
                {issues.map((issue, idx) => (
                    <IssueCard key={idx} issue={issue} />
                ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-7">
                <button
                    className="btn bg-neutral/30"
                    onClick={() => {
                        setCurrPage((prev) =>
                            prev === 0 ? setCurrPage(totalPages - 1) : prev - 1
                        );
                    }}
                >
                    <ArrowBigLeft />
                </button>
                {[...Array(totalPages).keys()].map((key) => (
                    <button
                        key={key}
                        onClick={() => setCurrPage(key)}
                        className={`btn bg-neutral/30 ${
                            key === currPage && "bg-neutral/70"
                        }`}
                    >
                        {key + 1}
                    </button>
                ))}
                <button
                    className="btn bg-neutral/30"
                    onClick={() =>
                        setCurrPage((prev) => {
                            if (prev === totalPages - 1) return 0;
                            else return prev + 1;
                        })
                    }
                >
                    <ArrowBigRight />
                </button>
            </div>
        </div>
    );
}
