import { GrGoogle } from "react-icons/gr";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosInstance from "../../hooks/useAxios";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

export default function SocialLogin({ phrase }) {
    const { signInWGoogle, setLoading, loading, authMethod } = useAuth();
    const navigate = useNavigate();
    const axiosInstance = useAxiosInstance();

    const handleGoogleSignIn = () => {
        signInWGoogle()
            .then((result) => {
                const newUser = {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                };

                axiosInstance
                    .post("/users", newUser)
                    .then((res) => {
                        navigate("/");
                    })
                    .catch((err) => {
                        console.log("", err);
                        toast.error(err.message);
                        setLoading(false);
                    });
            })
            .catch((err) => {
                console.log("", err);
                toast.error(err.message);
                setLoading(false);
            });
    };

    return (
        <div>
            <button
                onClick={handleGoogleSignIn}
                className="w-full btn btn-secondary"
                disabled={loading}
            >
                <GrGoogle />
                {phrase} with Google{" "}
                {loading && authMethod === "google" && (
                    <Loading height="h-auto" width="w-auto" color="text-white" />
                )}
            </button>
        </div>
    );
}
