import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
});

export default function useAxiosSecure() {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const reqInterceptors = axiosSecure.interceptors.request.use(
            (config) => {
                config.headers.Authorization = `Bearer ${user?.accessToken}`;
                return config;
            },
        );

        const resInterceptors = axiosSecure.interceptors.response.use(
            (response) => {
                return response;
            },
            (err) => {
                console.log("err", err);
                if (err.status === 401 || err.status === 403) {
                    // logoutUser().then(navigate("/login"));
                }

                return Promise.reject(err);
            },
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptors);
            axiosSecure.interceptors.response.eject(resInterceptors);
        };
    }, [user, logoutUser, navigate]);

    return axiosSecure;
}
