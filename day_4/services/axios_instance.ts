import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL, TOKEN_KEY } from "../constants";
import { rootNavigationRef } from "../app/_layout";


export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401) {
            originalRequest._retry = true;

            await AsyncStorage.clear();

            if (rootNavigationRef.isReady()) {
                rootNavigationRef.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                });
            }

            return Promise.reject(new Error("Session expired. Please login again."));
        }

        return Promise.reject(error);
    }
);