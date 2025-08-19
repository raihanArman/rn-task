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

export const register = async (email: string, password: string, name: string): Promise<AuthResponse> => {
    try {
        const response = await axiosInstance.post("/api/auth/register", {
            email,
            password,
            name,
        });

        return response.data;
    } catch (error: any) {
        console.log("got error: ", error);
        const msg = error?.response?.data?.error || "Register Failed";
        throw new Error(msg);
    }
};