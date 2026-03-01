import { Users, Lightbulb, ShieldCheck, Globe } from "lucide-react";
import { useEffect } from "react";

export default function About() {
    useEffect(() => {
        document.title = "About Us";
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);
    return (
        <div className="bg-base-100 text-base-content">
            <div className="max-w-5xl mx-auto px-6 py-20 space-y-20">
                {/* Page Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold">About Us</h1>
                    <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
                        We are building digital infrastructure to improve
                        real-world infrastructure. Our mission is simple —
                        create transparency, accountability, and efficiency in
                        public issue reporting.
                    </p>
                </div>

                {/* Who We Are */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Users className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-semibold">Who We Are</h2>
                    </div>

                    <p className="text-base-content/70 leading-relaxed">
                        We are a technology-driven initiative focused on
                        modernizing how public infrastructure issues are
                        reported and managed. Our platform bridges the gap
                        between citizens and administrators by providing a
                        centralized, transparent system for reporting, tracking,
                        and resolving problems.
                    </p>

                    <p className="text-base-content/70 leading-relaxed">
                        From damaged roads to faulty streetlights, small issues
                        can have big impacts. We believe technology can simplify
                        communication and accelerate resolution.
                    </p>
                </section>

                {/* Why We Built This */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Lightbulb className="w-6 h-6 text-secondary" />
                        <h2 className="text-2xl font-semibold">
                            Why We Built This
                        </h2>
                    </div>

                    <p className="text-base-content/70 leading-relaxed">
                        Traditional complaint systems are often slow, unclear,
                        and inefficient. Many reports get lost, delayed, or
                        never properly tracked.
                    </p>

                    <p className="text-base-content/70 leading-relaxed">
                        We built this platform to digitize and streamline the
                        process — making it faster for citizens to report issues
                        and easier for administrators to manage them
                        responsibly.
                    </p>
                </section>

                {/* Our Core Values */}
                <section className="space-y-8">
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-6 h-6 text-success" />
                        <h2 className="text-2xl font-semibold">
                            Our Core Values
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-base-200 hover:bg-base-300/70 p-6 rounded-md">
                            <h3 className="font-semibold mb-2">Transparency</h3>
                            <p className="text-sm text-base-content/70">
                                Clear status tracking and visible updates ensure
                                accountability at every stage.
                            </p>
                        </div>

                        <div className="bg-base-200 hover:bg-base-300/70 p-6 rounded-md">
                            <h3 className="font-semibold mb-2">Efficiency</h3>
                            <p className="text-sm text-base-content/70">
                                Digital workflows reduce delays and eliminate
                                manual bottlenecks.
                            </p>
                        </div>

                        <div className="bg-base-200 hover:bg-base-300/70 p-6 rounded-md">
                            <h3 className="font-semibold mb-2">
                                Community Impact
                            </h3>
                            <p className="text-sm text-base-content/70">
                                Empowering citizens strengthens communities and
                                improves public services.
                            </p>
                        </div>
                    </div>
                </section>

                {/* How We Work */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Globe className="w-6 h-6 text-accent" />
                        <h2 className="text-2xl font-semibold">How We Work</h2>
                    </div>

                    <p className="text-base-content/70 leading-relaxed">
                        Our system allows citizens to submit detailed issue
                        reports, upload supporting images, and monitor progress
                        in real time. Administrators receive structured data
                        through a secure dashboard where they can review,
                        update, and resolve cases efficiently.
                    </p>

                    <p className="text-base-content/70 leading-relaxed">
                        By centralizing the workflow, we reduce communication
                        gaps and create measurable accountability.
                    </p>
                </section>

                {/* Vision */}
                <section className="border-t pt-12 space-y-4">
                    <h2 className="text-2xl font-semibold">Our Vision</h2>
                    <p className="text-base-content/70 leading-relaxed">
                        We envision smarter cities where citizens actively
                        participate in maintaining infrastructure and
                        authorities respond with transparency and measurable
                        action.
                    </p>

                    <p className="text-base-content/70 leading-relaxed">
                        Strong communities are built on collaboration — and we
                        are building the digital tools to support that future.
                    </p>
                </section>
            </div>
        </div>
    );
}
