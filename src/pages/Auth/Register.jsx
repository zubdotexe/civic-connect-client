import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import useaxiosInstance from "../../hooks/useAxios";
import { toast } from "react-toastify";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { registerUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const axiosInstance = useaxiosInstance();

    const handleRegister = (data) => {
        console.log("", data);
        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then((result) => {
                console.log("", result.user);

                const formData = new FormData();
                formData.append("image", profileImg);

                const imgApiUrl = `https://api.imgbb.com/1/upload?key=${
                    import.meta.env.VITE_IMG_HOST_KEY
                }`;

                axiosInstance
                    .post(imgApiUrl, formData)
                    .then((result) => {
                        console.log(result);

                        const userProfile = {
                            displayName: data.name,
                            photoURL: result.data.data.url,
                        };

                        updateUserProfile(userProfile)
                            .then((result) => {
                                console.log("", result);
                                navigate("/");
                            })
                            .catch((err) => {
                                console.log("", err);
                                toast.error(err.message);
                            });
                    })
                    .catch((err) => {
                        console.log("err", err);
                        toast.error(err.message);
                    });
            })
            .catch((err) => {
                console.log("", err);
                toast.error(err.message);
            });
    };

    return (
        <div className="relative h-screen flex justify-center items-center bg-black/45">
            <div className="absolute h-full w-full top-0 overflow-hidden -z-1">
                <img className="h-full w-full object-cover" src="https://cdn.pixabay.com/photo/2016/11/19/13/16/infrastructure-1839235_1280.jpg" alt="" />
            </div>
            <div>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend text-2xl">Register</legend>

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
                    <SocialLogin phrase={"Signup"} />
                </fieldset>
                <div className="mt-5 text-accent text-center">
                    <Link to="/">Go to Home</Link>
                </div>
            </div>
        </div>
    );
}
