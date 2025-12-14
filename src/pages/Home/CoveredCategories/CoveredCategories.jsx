import React from "react";

export default function CoveredCategories() {
    return (
        <div className="max-w-375 mx-auto p-10 bg-base-200">
            <h2 className="text-3xl font-semibold">Categories We Cover</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-7">
                <div className="bg-base-300 hover:bg-base-300/60 rounded-md p-5 text-center shadow-md">
                    <span className="text-rotate text-2xl">
                        <span className="justify-items-center">
                            <span>
                                <span>🛣️ Road & Potholes</span>
                            </span>
                            <span>
                                <span>💡 Street Lights</span>
                            </span>
                        </span>
                    </span>
                </div>
                <div className="bg-base-300 hover:bg-base-300/60 rounded-md p-5 text-center shadow-md">
                    <span className="text-rotate text-2xl">
                        <span className="justify-items-center">
                            <span>
                                <span>🚰 Water Leakage</span>
                            </span>
                            <span>
                                <span>🗑️ Garbage Overflow</span>
                            </span>
                        </span>
                    </span>
                </div>
                <div className="bg-base-300 hover:bg-base-300/60 rounded-md p-5 text-center shadow-md">
                    <span className="text-rotate text-2xl">
                        <span className="justify-items-center">
                            <span>
                                <span>🚧 Footpath Damage</span>
                            </span>
                            <span>
                                <span>🌳 Public Space Issues</span>
                            </span>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}
