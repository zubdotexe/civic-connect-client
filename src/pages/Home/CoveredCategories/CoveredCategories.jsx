import Marquee from "react-fast-marquee";
import {
    Construction,
    Lightbulb,
    Droplet,
    Trash2,
    Route,
    TreeDeciduous,
} from "lucide-react";

export default function CoveredCategories() {
    return (
        <div className="max-w-375 mx-auto p-10 bg-base-100">
            <h2 className="text-3xl font-semibold">Categories We Cover</h2>
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-7">
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
            </div> */}

            <div className="mt-9">
                <Marquee className="py-3">
                    <div className="mx-4 bg-base-300 rounded-md p-5 w-72 text-center shadow-md">
                        <Construction className="w-7 h-7 mx-auto mb-2 text-warning" />
                        <span>Road & Potholes</span>
                    </div>

                    <div className="mx-4 bg-base-300 rounded-md p-5 w-72 text-center shadow-md">
                        <Lightbulb className="w-7 h-7 mx-auto mb-2 text-yellow-500" />
                        <span>Street Lights</span>
                    </div>

                    <div className="mx-4 bg-base-300 rounded-md p-5 w-72 text-center shadow-md">
                        <Droplet className="w-7 h-7 mx-auto mb-2 text-blue-500" />
                        <span>Water Leakage</span>
                    </div>

                    <div className="mx-4 bg-base-300 rounded-md p-5 w-72 text-center shadow-md">
                        <Trash2 className="w-7 h-7 mx-auto mb-2 text-success" />
                        <span>Garbage Overflow</span>
                    </div>

                    <div className="mx-4 bg-base-300 rounded-md p-5 w-72 text-center shadow-md">
                        <Route className="w-7 h-7 mx-auto mb-2 text-error" />
                        <span>Footpath Damage</span>
                    </div>

                    <div className="mx-4 bg-base-300 rounded-md p-5 w-72 text-center shadow-md">
                        <TreeDeciduous className="w-7 h-7 mx-auto mb-2 text-green-600" />
                        <span>Public Space Issues</span>
                    </div>
                </Marquee>
            </div>
        </div>
    );
}
