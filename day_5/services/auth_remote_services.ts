import { AuthResponse } from "@/utils/auth_types";
import { axiosInstance } from "./axios_instance";

import * as ImagePicker from 'expo-image-picker'

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
    profilePicture: ImagePicker.ImagePickerResult | null,
): Promise<AuthResponse> => {
    try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("name", name);

        console.log("Register -> profilePicture: Check ", profilePicture)
        if (profilePicture?.assets) {
            console.log("Register -> profilePicture: Form data ", profilePicture)

            const file: any = {
                uri: profilePicture.assets[0].uri,
                name: profilePicture.assets[0].fileName,
                type: profilePicture.assets[0].mimeType,
            };

            formData.append("profilePicture", file);
        }

        const response = await axiosInstance.post("/api/auth/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        const result = response.data
        console.log(`userProfile remote services: ${result.user.profilePicture} | token: ${result.token}`)

        return result;
    } catch (error: any) {
        console.log("got error: ", error);
        const msg = error?.response?.data?.error || "Register Failed";
        throw new Error(msg);
    }
};