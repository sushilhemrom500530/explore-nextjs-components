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
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Nzg3ZjU3ODU1Mjc2OTg3OTZkOTk2MiIsImVtYWlsIjoiY3VzdG9tZXJAZGVtby5jb20iLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3NzI4NTgyMDYsImV4cCI6MTc3Mjk0NDYwNn0.upydxejKtWc3Z6kA1zYdB55r237b7zFvtH7pd_3P8-k";
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