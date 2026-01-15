import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useaxiosInstance from "../../hooks/useAxios";
import IssueCard from "../../components/IssueCard";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Loading from "../../components/Loading";

export default function AllIssues() {
    const axiosInstance = useaxiosInstance();
    // const [totalIssues, setTotalIssues] = useState(0);
    // const [totalPages, setTotalPages] = useState(0);
    const limit = 6;
    const [currPage, setCurrPage] = useState(0);
    const [searchText, setSearchText] = useState("");
    // const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("");

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        setCurrPage(0);
    };

    const handlePickCategory = (e) => {
        setCurrPage(0);
        setCategory(e.target.value);
    };

    const { data, isLoading } = useQuery({
        queryKey: ["issues", currPage, searchText, category],
        queryFn: async () => {
            const res = await axiosInstance.get(
                `/issues?limit=${limit}&skip=${
                    currPage * limit
                }&search=${searchText}&category=${category}`
            );
            // console.log("", data);

            // setTotalIssues(res.data.total);
            // const pages = Math.ceil(totalIssues / limit);
            // setTotalPages(pages);
            return res.data;
        },
    });

    const issues = data?.result ?? [];
    const totalIssues = data?.total ?? 0;
    const totalPages = Math.ceil(totalIssues / limit);

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await axiosInstance.get("/issues");
            const categoriesData = res?.data?.result?.map(
                (issue) => issue.category
            );
            // console.log('', categoriesData);
            return [...new Set(categoriesData)];
            // return categories;
        },
    });

    // console.log('', isLoading);

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
            <div className="mt-5 flex flex-wrap gap-5 justify-between">
                <input
                    className="outline-none border border-neutral rounded-sm p-3"
                    type="text"
                    placeholder="Search Issues"
                    onChange={handleSearch}
                />

                <div className="flex gap-2">
                    <button
                        onClick={() => setCategory("")}
                        className="btn btn-error"
                    >
                        Remove Filter
                    </button>
                    <select
                        value={category}
                        className="select select-neutral bg-base-200"
                        onChange={handlePickCategory}
                    >
                        <option value="" disabled={true}>
                            Pick a category
                        </option>
                        {categories?.map((c) => (
                            <option key={c} value={c}>
                                {c.charAt(0).toUpperCase() + c.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-7">
                    {issues.map((issue, idx) => (
                        <IssueCard key={idx} issue={issue} />
                    ))}
                </div>
            )}

            <div className="flex flex-wrap justify-center gap-3 mt-7">
                <button
                    className="btn bg-neutral/30"
                    onClick={() => {
                        setCurrPage((prev) => {
                            if (prev === 0) {
                                return totalPages - 1;
                            } else return prev - 1;
                        });
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
