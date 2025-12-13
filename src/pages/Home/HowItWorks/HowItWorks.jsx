import React from "react";

export default function HowItWorks() {
    return (
        <div className="relative p-10 max-w-375 mx-auto bg-cover bg-bottom">
            <div
                className="absolute inset-0 bg-black opacity-20 z-0"
                style={{
                    backgroundImage:
                        "url('https://images.pexels.com/photos/842948/pexels-photo-842948.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                }}
            ></div>

            <h2 className="text-3xl font-semibold">How It Works</h2>
            <ul className="timeline timeline-vertical md:timeline-horizontal justify-center mt-5">
                <li>
                    <div className="timeline-start timeline-box text-lg">
                        <span className="text-rotate">
                            <span>
                                <span className="text-warning">
                                    Found an Issue?
                                </span>
                                <span>Report Issue</span>
                            </span>
                        </span>
                    </div>
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-7 w-7"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <hr />
                </li>
                <li>
                    <hr />
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-7 w-7"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="timeline-end timeline-box text-lg">
                        Admin Assigns
                    </div>
                    <hr />
                </li>
                <li>
                    <hr />
                    <div className="timeline-start timeline-box text-lg">
                        Staff Fixes
                    </div>
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-7 w-7"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <hr />
                </li>
                <li>
                    <hr />
                    <div className="timeline-middle">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-7 w-7"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className="timeline-end timeline-box text-lg">
                        <span className="text-rotate">
                            <span>
                                <span>Citizen Tracks</span>
                                <span className="text-success">
                                    Citizens Glad!
                                </span>
                            </span>
                        </span>
                    </div>
                    <hr />
                </li>
            </ul>
        </div>
    );
}
