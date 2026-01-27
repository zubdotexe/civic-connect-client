import { Link } from "react-router";
import forbiddenImg from "../assets/forbidden.png";

export default function Forbidden() {
    return (
        <div className="p-10 flex flex-col justify-center items-center space-y-10">
            <div className="w-full overflow-hidden rounded-md">
                <img
                    className="w-full max-h-full object-cover"
                    src={forbiddenImg}
                    alt="forbidden"
                />
            </div>
            <Link to={"/"} className="btn btn-secondary">
                Go to Home
            </Link>
        </div>
    );
}
