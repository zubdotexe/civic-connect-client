import { GrGoogle } from "react-icons/gr";
import useAuth from "../../hooks/useAuth";

export default function SocialLogin({phrase}) {
    const { signInWGoogle } = useAuth();

    const handleGoogleSignIn = () => {
        signInWGoogle()
            .then((result) => {
                console.log("", result.user);
            })
            .catch((err) => {
                console.log("", err);
            });
    };

    return (
        <div>
            <button
                onClick={handleGoogleSignIn}
                className="w-full btn bg-secondary text-black"
            >
                <GrGoogle />
                {phrase} with Google
            </button>
        </div>
    );
}
