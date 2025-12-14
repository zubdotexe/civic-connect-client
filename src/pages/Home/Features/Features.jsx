import React from "react";

export default function Features() {
    const features = [
        {
            icon: "⚡",
            title: "Quick Issue Reporting",
            desc: "Report problems like potholes, broken lights, or garbage overflow with photos and location in just a few clicks.",
        },
        {
            icon: "🕒",
            title: "Track Every Update",
            desc: "Follow your issue from Pending → In-Progress → Resolved → Closed with a transparent activity timeline.",
        },
        {
            icon: "👮‍♂️",
            title: "Official Resolution Process",
            desc: "Issues are reviewed by admins and handled by assigned government staff — no lost or ignored reports.",
        },
        {
            icon: "🚀",
            title: "Boost Critical Issues",
            desc: "Escalate urgent problems by boosting priority so they get resolved faster.",
        },
        {
            icon: "🔥",
            title: "Public Importance Voting",
            desc: "Upvote issues to show public importance and push critical problems higher.",
        },
        {
            icon: "👑",
            title: "Premium Citizen Access",
            desc: "Premium users can report unlimited issues and receive priority handling.",
        },
        {
            icon: "🔐",
            title: "Secure Role Management",
            desc: "Citizens, Staff, and Admins have separate dashboards with secure access and permissions.",
        },
        {
            icon: "🏙️",
            title: "Smarter City Decisions",
            desc: "Authorities gain insights from issue trends, helping improve city planning and response time.",
        },
    ];

    return (
        <div className="max-w-375 mx-auto p-10">
            <h2 className="text-3xl font-semibold">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-7">
                {features.map((feature, idx) => (
                    <div key={idx} className="bg-base-200 hover:bg-base-300/65 hover:scale-102 p-5 text-center rounded-md shadow-xl">
                        <p>{feature.icon}</p>
                        <h3 className="font-semibold text-2xl mt-2">
                            {feature.title}
                        </h3>
                        <p className="mt-3">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
