import React from "react";

export default function Benefits() {
    const benefits = [
        {
            citizens: "Track issues anytime",
            authorities: "Centralized issue management",
        },
        {
            citizens: "Priority boosting",
            authorities: "Data-driven planning",
        },
        {
            citizens: "Public upvotes",
            authorities: "Accountability tracking",
        },
    ];
    return (
        <div className="max-w-375 mx-auto p-10 bg-base-200">
            <h2 className="text-3xl font-semibold">
                Citizen Benefits vs Authority Benefits
            </h2>
            <div className="w-full md:max-w-3/5 mx-auto mt-7">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="text-2xl">
                                {/* <th></th> */}
                                <th className="text-right">For Citizens</th>
                                <th className="text-left">For Authorities</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {benefits.map((benefit, idx) => (
                                <tr key={idx}>
                                    {/* <th>1</th> */}
                                    <td className="text-right">{benefit.citizens}</td>
                                    <td className="text-left">{benefit.authorities}</td>
                                    {/* <td>Blue</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
