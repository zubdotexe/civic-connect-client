import { useQuery } from "@tanstack/react-query";
import useAxiosInstance from "../../../hooks/useAxios";
import IssueCard from "../../../components/IssueCard";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import { motion } from "framer-motion";

const divContainerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.25 },
    },
};

const divCardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function LatestResolvedIssues() {
    const axiosInstance = useAxiosInstance();

    const { isLoading, data: issues = [] } = useQuery({
        queryKey: ["issues"],
        queryFn: async () => {
            const res = await axiosInstance.get(
                "/latest-issues?status=resolved"
            );
            return res.data;
        },
        refetchOnMount: true,
    });

    return (
        <div className="max-w-375 mx-auto p-10 bg-base-200">
            <h2 className="text-3xl font-semibold">Latest Resolved Issues</h2>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <motion.div
                        variants={divContainerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-7"
                    >
                        {issues.map((issue, idx) => (
                            <motion.div
                                key={issue._id}
                                variants={divCardVariants}
                            >
                                <IssueCard issue={issue} />
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="mt-5 flex justify-center">
                        <Link to="/issues" className="btn btn-primary">
                            View All Issues
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}
