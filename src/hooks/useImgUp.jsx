import React from "react";
import useaxiosInstance from "./useAxios";

export default function useImgUp() {
    const axiosInstance = useaxiosInstance();

    const uploadImage = async (file) => {
        if (!file) return null;

        const formData = new FormData();
        formData.append("image", file);

        const imgApiUrl = `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMG_HOST_KEY
        }`;

        const res = await axiosInstance.post(imgApiUrl, formData);
        return res.data.data.url;
    };

    return { uploadImage };
}
