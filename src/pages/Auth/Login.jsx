import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signInUser, loading, setLoading, authMethod } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then((result) => {
                console.log("", result);
                navigate(location.state || "/");
            })
            .catch((err) => {
                toast.error(err.message);
                setLoading(false);
            });
    };

    return (
        <div className="relative h-screen flex justify-center items-center bg-black/45">
            <div className="absolute h-full w-full top-0 overflow-hidden -z-1">
                <img
                    className="h-full w-full object-cover"
                    src="https://cdn.pixabay.com/photo/2016/11/19/13/16/infrastructure-1839235_1280.jpg"
                    alt=""
                />
            </div>
            <div>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend text-2xl">Login</legend>

                    <form action="" onSubmit={handleSubmit(handleLogin)}>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="input"
                            placeholder="Email"
                        />
                        {errors.email?.type === "required" && (
                            <p className="text-error">Email is required</p>
                        )}
                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: true })}
                            className="input"
                            placeholder="Password"
                        />
                        {errors.password?.type === "required" && (
                            <p className="text-error">Password is required</p>
                        )}
                        New here?{" "}
                        <Link to="/register" className="text-primary">
                            Register
                        </Link>
                        <button
                            className="w-full btn btn-primary mt-4"
                            disabled={loading}
                        >
                            Login{" "}
                            {loading && authMethod === "login" && (
                                <Loading height="h-auto" width="w-auto" color="text-white" />
                            )}
                        </button>
                    </form>
                    <SocialLogin phrase={"Login"} />
                </fieldset>
                <div className="mt-5 text-accent text-center">
                    <Link to="/">Go to Home</Link>
                </div>
            </div>
        </div>
    );
}
