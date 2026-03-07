/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios, {
    AxiosError,
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
} from "axios";
import Cookies from "js-cookie";

const useApi: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URI,
    withCredentials: true,
});
useApi.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2Q5YzJiY2JjOWM2ZjViZDRiN2EyMiIsImVtYWlsIjoiY3VzdG9tZXIyQGRlbW8uY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNzcyODcyMDE4LCJleHAiOjE3NzI5NTg0MTh9.6_BRdgKfLi6QrtzkVKNVZWmDEXPx36VJoifJRztIVX0";
        // const token =
        //     document?.cookie
        //         ?.split("; ")
        //         ?.find((row) => row.startsWith("token="))
        //         ?.split("=")[1] || null;

        if (token) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
useApi.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    (error: AxiosError<any>) => {
        const status = error.response?.status;
        const messageText = error.response?.data?.message;

        if (status === 401 || status === 403) {
            Cookies.remove("token");
            // window.location.href = "/auth/login";
            // message.error(messageText || "Unauthorized access.");
        }

        return Promise.reject(error);
    }
);

export default useApi;