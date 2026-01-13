import { GrGoogle } from "react-icons/gr";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

export default function SocialLogin({ phrase }) {
    const { signInWGoogle, setLoading, loading, authMethod } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWGoogle()
            .then((result) => {
                console.log("", result.user);
                navigate("/");
            })
            .catch((err) => {
                console.log("", err);
                setLoading(false);
            });
    };

    return (
        <div>
            <button
                onClick={handleGoogleSignIn}
                className="w-full btn btn-secondary text-black"
                disabled={loading}
            >
                <GrGoogle />
                {phrase} with Google{" "}
                {loading && authMethod === "google" && (
                    <span className="loading loading-spinner text-accent"></span>
                )}
            </button>
        </div>
    );
}
