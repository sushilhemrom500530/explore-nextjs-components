"use client";

import { useState, useEffect, useCallback } from "react";
import useApi from "../use-api";
import { message } from "antd";

interface UseGetResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export const useGetPaymentCards = <T = any>(): UseGetResponse<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await useApi.get("/invoice/cards");
                setData(response?.data?.data);
            } catch (err: any) {
                setError(err.response?.data?.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [trigger]);

    const refetch = () => setTrigger((prev) => prev + 1);

    return { data, loading, error, refetch };
};


interface AddCardPayload {
    paymentMethodId: string;
}

interface AddCardResponse {
    success: boolean;
    message: string;
}

interface UseAddCardResponse {
    execute: (payload: AddCardPayload) => Promise<AddCardResponse | null>;
    loading: boolean;
    error: string | null;
}

export const useAddCard = (): UseAddCardResponse => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(
        async (payload: AddCardPayload): Promise<AddCardResponse | null> => {
            setLoading(true);
            setError(null);
            try {
                const response = await useApi.post("/invoice/add-card", payload);
                message.success("Card added successfully!");
                return response.data;
            } catch (err: any) {
                const errorMessage =
                    err.response?.data?.message || "Failed to add card";
                setError(errorMessage);
                message.error(errorMessage);
                return null;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return { execute, loading, error };
};


interface MenuItem {
    menu: string;
    size: string;
    total_quantity: number;
}

interface BuyProductPayload {
    menu_list: MenuItem[];
    payment_method: "online" | "cash";
    paymentMethodId?: string;
    address: string;
    note?: string;
    payment_info?: string;
    total_price: number;
}

interface BuyProductResponse {
    success: boolean;
    message: string;
    data: any[];
}

interface UseBuyProductResponse {
    execute: (payload: BuyProductPayload) => Promise<BuyProductResponse | null>;
    data: BuyProductResponse | null;
    loading: boolean;
    error: string | null;
}

export const useBuyProduct = (): UseBuyProductResponse => {
    const [data, setData] = useState<BuyProductResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(
        async (payload: BuyProductPayload): Promise<BuyProductResponse | null> => {
            setLoading(true);
            setError(null);
            try {
                const response = await useApi.post("/invoice/buy", payload);
                setData(response.data);
                message.success("Order placed successfully!");
                return response.data;
            } catch (err: any) {
                const errorMessage =
                    err.response?.data?.message || "Failed to place order";
                setError(errorMessage);
                message.error(errorMessage);
                return null;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return { execute, data, loading, error };
};