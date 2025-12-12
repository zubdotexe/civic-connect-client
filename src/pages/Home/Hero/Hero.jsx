import React from "react";

export default function Hero() {
    return (
        <div className="max-w-375 mx-auto mt-10 p-10 bg-linear-to-br from-[#E3F2FD] to-[#F5F7FA] flex flex-col-reverse md:flex-row gap-5 items-center">
            <div className="space-y-3 flex-1">
                <h1 className="text-4xl">
                    Connecting Citizens <br /> to Smarter Cities.
                </h1>
                <p className="text-xl">
                    CivicConnect helps people report issues and authorities fix
                    them faster with a transparent, connected workflow.
                </p>
                <div className="flex gap-3">
                    <button className="btn btn-primary text-lg">
                        Report an Issue
                    </button>
                    <button className="btn btn-outline border-primary text-lg">
                        View All Issues
                    </button>
                </div>
            </div>
            <div className="relative flex-1 rounded-xl overflow-hidden">
                <img
                    className="h-80 w-dvh"
                    src="https://images.pexels.com/photos/13025339/pexels-photo-13025339.jpeg"
                    alt=""
                />
                <img
                    src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHlrdjBvbjNxZWVxM2Z4anNtbGsxajMxaDR2Y25mcGttY2JoczA3ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rgzOwma0qMbM3x7Fqi/giphy.gif"
                    alt="Golden network overlay"
                    className="absolute inset-0 w-full h-full object-cover z-1 mix-blend-overlay" // Blend mode + opacity for glow effect
                />
            </div>
        </div>
    );
}
