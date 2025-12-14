import React, { useEffect } from "react";
import Hero from "../Hero/Hero";
import HowItWorks from "../HowItWorks/HowItWorks";
import Features from "../Features/Features";
import Benefits from "../Benefits/Benefits";
import CoveredCategories from "../CoveredCategories/CoveredCategories";
import LatestResolvedIssues from "../LatestResolvedIssues/LatestResolvedIssues";

export default function Home() {
    useEffect(() => {
        document.title = "Home";
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);
    return (
        <div>
            <Hero />
            <LatestResolvedIssues />
            <Features />
            <HowItWorks />
            <Benefits />
            <CoveredCategories />
        </div>
    );
}
