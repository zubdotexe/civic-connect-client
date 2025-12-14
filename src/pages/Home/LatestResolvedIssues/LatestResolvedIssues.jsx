import { useQuery } from "@tanstack/react-query";
import useaxiosInstance from "../../../hooks/useAxios";

export default function LatestResolvedIssues() {
    const axiosInstance = useaxiosInstance();
    const { isLoading, data: issues = [] } = useQuery({
        queryKey: ["issues"],
        queryFn: async () => {
            const res = await axiosInstance.get("/latest-issues?status=resolved");
            return res.data;
        },
    });

    return (
        <div className="max-w-375 mx-auto p-10 bg-base-200">
            <h2 className="text-3xl font-semibold">Latest Resolved Issues</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-7">
                {issues.map((issue, idx) => (
                    <div key={idx} className="card bg-base-100 shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title">{issue.title}</h2>
                            <figure>
                                <img
                                    // src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                    src={issue.image}
                                    className="rounded-sm h-48 w-full"
                                    alt="Shoes"
                                />
                            </figure>
                            <p>{issue.description}</p>
                            <div className="flex space-x-3">
                                <p className="badge badge-soft badge-primary">
                                    {issue.category}
                                </p>
                                <p className="badge badge-soft badge-secondary">
                                    {issue.status}
                                </p>
                            </div>

                            <div>
                                <p className="font-semibold">UpVotes</p>
                                <p className="text-xl">{issue.upvoteCount}</p>
                                <p className="font-semibold mt-3">Location</p>
                                <p>{issue.location}</p>
                            </div>
                            <button className="w-full btn btn-secondary">View Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
