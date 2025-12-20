import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { registerUser } = useAuth();

    const handleRegister = (data) => {
        console.log("", data);
        registerUser(data.email, data.password)
            .then((result) => {
                console.log("", result.user);
            })
            .catch((err) => {
                console.log("", err);
            });
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Register</legend>

                    <form action="" onSubmit={handleSubmit(handleRegister)}>
                        <label className="label mt-2">Name</label>
                        <input
                            type="text"
                            {...register("name")}
                            className="input"
                            placeholder="Name"
                        />
                        <label className="label mt-2">Photo</label>
                        <input
                            type="file"
                            {...register("photo")}
                            className="file-input"
                        />
                        <label className="label mt-2">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="input"
                            placeholder="Email"
                        />
                        {errors.email?.type === "required" && (
                            <p className="text-error">Email is required</p>
                        )}
                        <label className="label mt-2">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: 8,
                                pattern:
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
                            })}
                            className="input"
                            placeholder="Password"
                        />
                        {errors.password?.type === "required" && (
                            <p className="text-error">Password is required</p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p className="text-error">
                                Password must be 8 characters or longer
                            </p>
                        )}
                        {errors.password?.type === "pattern" && (
                            <p className="text-error">
                                Password must have at least one uppercase, at
                                least one lowercase, at least one number, and at
                                least one special characters
                            </p>
                        )}
                        Already a member?{" "}
                        <Link to="/login" className="text-primary">
                            Login
                        </Link>
                        <button className="w-full btn btn-primary mt-4">
                            Register
                        </button>
                    </form>
                </fieldset>
                <div className="mt-5 text-secondary text-center">
                    <Link to="/">
                        Go to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
