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
import { useEffect } from "react";

export default function Features() {
    useEffect(() => {
        document.title = "Features";
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);
    const iconStyle = "w-8 h-8 text-primary";

    const features = [
        {
            icon: <Zap className={iconStyle} />,
            title: "Quick Issue Reporting",
            desc: "Report infrastructure problems like potholes, broken streetlights, drainage issues, or garbage overflow within seconds. Add photos, precise location details, and descriptions to ensure accurate reporting.",
            details: [
                "Upload supporting images",
                "Attach issue location",
                "Add detailed descriptions",
                "Submit in just a few clicks",
            ],
        },
        {
            icon: <Clock className={iconStyle} />,
            title: "Track Every Update",
            desc: "Stay informed from the moment your issue is submitted until it is resolved and closed. Every status change is recorded transparently.",
            details: [
                "Pending → In Progress → Resolved → Closed workflow",
                "Real-time status updates",
                "Activity timeline visibility",
                "Clear resolution tracking",
            ],
        },
        {
            icon: <Shield className={iconStyle} />,
            title: "Official Resolution Process",
            desc: "Each issue is reviewed by authorized administrators and assigned to appropriate government staff, ensuring accountability and structured handling.",
            details: [
                "Admin review before assignment",
                "Official staff handling",
                "No lost or ignored reports",
                "Transparent documentation",
            ],
        },
        {
            icon: <Rocket className={iconStyle} />,
            title: "Boost Critical Issues",
            desc: "Citizens can escalate urgent cases to highlight priority. Boosted issues gain higher visibility in the admin dashboard.",
            details: [
                "Priority escalation system",
                "Faster resolution path",
                "Highlighted for administrators",
                "Supports emergency handling",
            ],
        },
        {
            icon: <Flame className={iconStyle} />,
            title: "Public Importance Voting",
            desc: "Community members can upvote issues to show collective concern and raise awareness of high-impact problems.",
            details: [
                "Democratic issue ranking",
                "Community engagement",
                "Visibility for major problems",
                "Encourages civic participation",
            ],
        },
        {
            icon: <Crown className={iconStyle} />,
            title: "Premium Citizen Access",
            desc: "Premium users receive enhanced benefits including unlimited reporting and priority handling for their submissions.",
            details: [
                "Unlimited issue submissions",
                "Priority processing",
                "Enhanced dashboard access",
                "Support for civic contributors",
            ],
        },
        {
            icon: <Lock className={iconStyle} />,
            title: "Secure Role Management",
            desc: "Role-based authentication ensures citizens, staff members, and administrators access only what they are authorized to manage.",
            details: [
                "Separate dashboards",
                "Secure login system",
                "Permission-based access control",
                "Data protection measures",
            ],
        },
        {
            icon: <Building2 className={iconStyle} />,
            title: "Smarter City Decisions",
            desc: "Aggregated issue data helps authorities identify patterns, track infrastructure weaknesses, and improve city planning.",
            details: [
                "Issue trend analysis",
                "Performance tracking",
                "Data-driven planning",
                "Improved response efficiency",
            ],
        },
    ];

    return (
        <div className="bg-base-100 text-base-content">
            <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">
                {/* Page Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Platform Features</h1>
                    <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
                        Our system combines citizen engagement, structured
                        workflows, and modern technology to create a transparent
                        and efficient public infrastructure management platform.
                    </p>
                </div>

                {/* Features Section */}
                <div className="space-y-16">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="grid md:grid-cols-2 gap-10 items-start"
                        >
                            <div className="flex items-start gap-4">
                                <div className="bg-base-200 p-4 rounded-md">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold mb-3">
                                        {feature.title}
                                    </h2>
                                    <p className="text-base-content/70 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-base-200 p-6 rounded-md">
                                <ul className="space-y-3 text-base-content/70">
                                    {feature.details.map((item, i) => (
                                        <li key={i}>• {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Benefits Section */}
                <div className="border-t pt-16 grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">
                            Benefits for Citizens
                        </h2>
                        <ul className="space-y-3 text-base-content/70">
                            <li>• Easy and fast issue reporting</li>
                            <li>• Transparent status updates</li>
                            <li>• Community-driven prioritization</li>
                            <li>• Secure and role-based access</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">
                            Benefits for Authorities
                        </h2>
                        <ul className="space-y-3 text-base-content/70">
                            <li>• Centralized issue management</li>
                            <li>• Clear resolution workflow</li>
                            <li>• Data insights for city planning</li>
                            <li>• Improved accountability tracking</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
