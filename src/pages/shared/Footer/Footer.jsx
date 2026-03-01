import { Facebook, Linkedin, Youtube } from "lucide-react";
import civicConnLogo from "/civicConnect.png";
import { Link } from "react-router";
import useRole from "../../../hooks/useRole";

export default function Footer() {
    const { role, roleLoading } = useRole();
    return (
        <footer className="max-w-375 mx-auto footer sm:footer-horizontal bg-[#0E141B] text-[#E0E0E0] p-10">
            <nav>
                <Link to="/" className="flex items-center gap-2">
                    <img className="w-15 h-15" src={civicConnLogo} alt="" />
                    <span className="text-3xl font-semibold ">
                        Civic
                        <span className="font-bold text-primary">Connect</span>
                    </span>
                </Link>
                <p>
                    Copyright © {new Date().getFullYear()} - All right reserved
                </p>
            </nav>
            <nav>
                <h6 className="footer-title">Services</h6>
                <Link
                    to={"/dashboard/report-issue"}
                    className="link link-hover"
                >
                    Report an Issue
                </Link>
                <Link to={"/dashboard/my-issues"} className="link link-hover">
                    Track Issues
                </Link>
                {role === "admin" && (
                    <Link
                        to={"/dashboard/manage-issues"}
                        className="link link-hover"
                    >
                        Manage Issues
                    </Link>
                )}
                <Link to={"/dashboard"} className="link link-hover">
                    Dashboard
                </Link>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <Link to={"/about"} className="link link-hover">
                    About us
                </Link>
                <Link to={"/contact"} className="link link-hover">
                    Contact
                </Link>
                <Link to={"/features"} className="link link-hover">
                    Features
                </Link>
            </nav>
            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://www.notion.so/CivicConnect-LinkedIn-315716f6fb4780a7b120ebbc1ae859ec?source=copy_link">
                        <Linkedin />
                    </a>
                    <a href="https://www.notion.so/CivicConnect-LinkedIn-315716f6fb4780a7b120ebbc1ae859ec?source=copy_link">
                        <Facebook />
                    </a>
                    <a href="https://www.notion.so/CivicConnect-LinkedIn-315716f6fb4780a7b120ebbc1ae859ec?source=copy_link">
                        <Youtube />
                    </a>
                </div>
            </nav>
        </footer>
    );
}
