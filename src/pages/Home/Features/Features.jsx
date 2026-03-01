import { motion } from "framer-motion";
import {
    Zap,
    Clock,
    Shield,
    Rocket,
    Flame,
    Crown,
    Lock,
    Building2,
} from "lucide-react";

const divContainerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.25 } },
};

const divCardVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

const iconStyle = "w-8 h-8 text-primary";

export default function Features() {
    const features = [
        {
            icon: <Zap className={iconStyle} />,
            title: "Quick Issue Reporting",
            desc: "Report problems like potholes, broken lights, or garbage overflow with photos and location in just a few clicks.",
        },
        {
            icon: <Clock className={iconStyle} />,
            title: "Track Every Update",
            desc: "Follow your issue from Pending → In-Progress → Resolved → Closed with a transparent activity timeline.",
        },
        {
            icon: <Shield className={iconStyle} />,
            title: "Official Resolution Process",
            desc: "Issues are reviewed by admins and handled by assigned government staff — no lost or ignored reports.",
        },
        {
            icon: <Rocket className={iconStyle} />,
            title: "Boost Critical Issues",
            desc: "Escalate urgent problems by boosting priority so they get resolved faster.",
        },
        {
            icon: <Flame className={iconStyle} />,
            title: "Public Importance Voting",
            desc: "Upvote issues to show public importance and push critical problems higher.",
        },
        {
            icon: <Crown className={iconStyle} />,
            title: "Premium Citizen Access",
            desc: "Premium users can report unlimited issues and receive priority handling.",
        },
        {
            icon: <Lock className={iconStyle} />,
            title: "Secure Role Management",
            desc: "Citizens, Staff, and Admins have separate dashboards with secure access and permissions.",
        },
        {
            icon: <Building2 className={iconStyle} />,
            title: "Smarter City Decisions",
            desc: "Authorities gain insights from issue trends, helping improve city planning and response time.",
        },
    ];

    return (
        <div className="max-w-375 mx-auto p-10">
            <h2 className="text-3xl font-semibold">Features</h2>
            <motion.div
                variants={divContainerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-7"
            >
                {features.map((feature, idx) => (
                    <motion.div
                        variants={divCardVariants}
                        key={idx}
                        className="bg-base-200 transform transition-transform duration-300 delay-100 hover:bg-base-300/65 hover:scale-102 p-5 text-center rounded-md shadow-xl"
                    >
                        <p className="flex justify-center">{feature.icon}</p>
                        <h3 className="font-semibold text-2xl mt-7 wrap-break-word">
                            {feature.title}
                        </h3>
                        <p className="mt-3">{feature.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
