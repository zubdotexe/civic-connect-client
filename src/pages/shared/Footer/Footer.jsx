import { Facebook, Linkedin, Youtube } from "lucide-react";
import civicConnLogo from "../../../assets/civicConnect.png";
import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="max-w-375 mx-auto footer sm:footer-horizontal bg-[#0E141B] text-[#E0E0E0] p-10">
            <nav>
                <Link to="/" className="flex items-center gap-2">
                    <img className="w-15 h-15" src={civicConnLogo} alt="" />
                    <span className="text-2xl font-semibold ">
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
                <a className="link link-hover">Branding</a>
                <a className="link link-hover">Design</a>
                <a className="link link-hover">Marketing</a>
                <a className="link link-hover">Advertisement</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Jobs</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4">
                    <a>
                        <Linkedin />
                    </a>
                    <a>
                        <Facebook />
                    </a>
                    <a>
                        <Youtube />
                    </a>
                </div>
            </nav>
        </footer>
    );
}
