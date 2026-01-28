import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://civic-conn.vercel.app",
});

export default function useAxiosInstance() {
    return axiosInstance;
}
