"use client";
import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { message } from "antd";
import { useAddCard } from "@/src/hooks/use-payment";

export default function AddCardForm({ onSuccess }: { onSuccess?: () => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const { execute, loading } = useAddCard();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) return;

        const { error: stripeError, paymentMethod } =
            await stripe.createPaymentMethod({ type: "card", card: cardElement });

        if (stripeError) {
            message.error(stripeError.message);
            return;
        }

        const result = await execute({ paymentMethodId: paymentMethod.id });

        if (result?.success) {
            onSuccess?.();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#1a1a1a",
                                "::placeholder": { color: "#9ca3af" },
                            },
                            invalid: { color: "#ef4444" },
                        },
                    }}
                />
            </div>
            <button
                type="submit"
                disabled={loading || !stripe}
                className="w-full bg-black text-white py-2.5 rounded-lg font-medium disabled:opacity-50 transition"
            >
                {loading ? "Adding..." : "Add Card"}
            </button>
        </form>
    );
}