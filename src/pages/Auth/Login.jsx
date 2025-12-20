import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signInUser } = useAuth();

    const handleLogin = (data) => {
        console.log("", data);
        signInUser(data.email, data.password);
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Login</legend>

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
                        <button className="w-full btn btn-primary mt-4">
                            Login
                        </button>
                    </form>
                </fieldset>
                <div className="mt-5 text-secondary text-center">
                    <Link to="/">Go to Home</Link>
                </div>
            </div>
        </div>
    );
}
