import React from "react";

export default function Skeleton() {
    return (
        <div>
            <div className="flex gap-10 p-10">
                <div className="bg-base-300/70 rounded-md w-full h-102 p-6 flex flex-col justify-between">
                    <div className="h-full">
                        <div className="bg-gray-300/50 h-2/3 w-full rounded-md"></div>
                        <div className="bg-gray-300/50 h-7 w-full mt-3 rounded-md"></div>
                        <div className="flex justify-between gap-5 mt-7">
                            <div className="bg-gray-300/50 w-full h-8 rounded-full"></div>
                            <div className="bg-gray-300/50 w-full h-8 rounded-full"></div>
                        </div>
                    </div>
                    <div className="bg-gray-300/50 h-10 w-full mt-3 rounded-md"></div>
                </div>
                <div className="bg-base-300/70 rounded-md w-full h-102 p-6 flex flex-col justify-between">
                    <div className="h-full">
                        <div className="bg-gray-300/50 h-2/3 w-full rounded-md"></div>
                        <div className="bg-gray-300/50 h-7 w-full mt-3 rounded-md"></div>
                        <div className="flex justify-between gap-5 mt-7">
                            <div className="bg-gray-300/50 w-full h-8 rounded-full"></div>
                            <div className="bg-gray-300/50 w-full h-8 rounded-full"></div>
                        </div>
                    </div>
                    <div className="bg-gray-300/50 h-10 w-full mt-3 rounded-md"></div>
                </div>
                <div className="bg-base-300/70 rounded-md w-full h-102 p-6 flex flex-col justify-between">
                    <div className="h-full">
                        <div className="bg-gray-300/50 h-2/3 w-full rounded-md"></div>
                        <div className="bg-gray-300/50 h-7 w-full mt-3 rounded-md"></div>
                        <div className="flex justify-between gap-5 mt-7">
                            <div className="bg-gray-300/50 w-full h-8 rounded-full"></div>
                            <div className="bg-gray-300/50 w-full h-8 rounded-full"></div>
                        </div>
                    </div>
                    <div className="bg-gray-300/50 h-10 w-full mt-3 rounded-md"></div>
                </div>
            </div>
        </div>
    );
}
