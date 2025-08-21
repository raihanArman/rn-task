import { AuthResponse } from "@/utils/auth_types";
import { axiosInstance } from "./axios_instance";

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {

        const response = await axiosInstance.post("/api/auth/login", {
            email,
            password,
        });

        return response.data;
    } catch (error: any) {
        console.log("got error: ", error);
        const msg = error?.response?.data?.error || "Login Failed";
        throw new Error(msg);
    }
};

export const register = async (
    email: string,
    password: string,
    name: string,
    profilePicture: string | null,
): Promise<AuthResponse> => {
    try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("name", name);

        if (profilePicture) {
            const fileName = profilePicture.split("/").pop() || "profile.jpg";
            const fileType = fileName.split(".").pop();

            formData.append("profile_picture", {
                uri: profilePicture,
                type: `image/${fileType}`,
                name: fileName,
            } as any);
        }

        const response = await axiosInstance.post("/api/auth/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error: any) {
        console.log("got error: ", error);
        const msg = error?.response?.data?.error || "Register Failed";
        throw new Error(msg);
    }
};