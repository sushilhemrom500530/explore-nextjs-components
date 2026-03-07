"use client";
import { useState } from "react";
import { message } from "antd";
import { useBuyProduct, useGetPaymentCards } from "@/src/hooks/use-payment";

interface Card {
    id: string;
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
}

export default function BuyForm() {
    const [selectedCard, setSelectedCard] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<"online" | "cash">("online");

    const { data: cards, loading: cardsLoading } = useGetPaymentCards();
    const { execute: buy, loading: buyLoading } = useBuyProduct();

    const handleBuy = async () => {
        if (paymentMethod === "online" && !selectedCard) {
            message.warning("Please select a card");
            return;
        }

        const result = await buy({
            total_price: 36,
            menu_list: [
                {
                    menu: "69799c0d4780f3afafafa7c5",
                    size: "medium",
                    total_quantity: 2
                },
                {
                    menu: "69798ccec574029ed95c3742",
                    size: "medium",
                    total_quantity: 1
                },
                {
                    menu: "69798c214a879df924881ed3",
                    size: "medium",
                    total_quantity: 3
                }
            ],
            payment_method: paymentMethod,
            paymentMethodId: paymentMethod === "online" ? selectedCard : "",
            address: "Mohakhali, Dhaka",
            payment_info: {
                customer_name: "Sushil Hemrom",
                customer_phone: "01711111111",
                customer_address: "Mohakhali, Dhaka"
            },
            note: "",
        });

        if (result?.success) {
            setSelectedCard("");
        }
    };

    return (
        <div className="space-y-4">
            {/* Payment Method Toggle */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method
                </label>
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as "online" | "cash")}
                    className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                    <option value="online">Online (Card)</option>
                    <option value="cash">Cash on Delivery</option>
                </select>
            </div>

            {/* Saved Cards Dropdown */}
            {paymentMethod === "online" && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Saved Card
                    </label>
                    {cardsLoading ? (
                        <p className="text-sm text-gray-400">Loading cards...</p>
                    ) : cards?.length === 0 ? (
                        <p className="text-sm text-gray-400">
                            No saved cards. Add one above.
                        </p>
                    ) : (
                        <select
                            value={selectedCard}
                            onChange={(e) => setSelectedCard(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        >
                            <option value="">-- Choose a card --</option>
                            {cards?.map((card: Card) => (
                                <option key={card.id} value={card.id}>
                                    {card.brand.toUpperCase()} •••• {card.last4} ({card.exp_month}/{card.exp_year})
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            )}

            <button
                onClick={handleBuy}
                disabled={buyLoading || (paymentMethod === "online" && !selectedCard)}
                className="w-full bg-black text-white py-2.5 rounded-lg font-medium disabled:opacity-50 transition"
            >
                {buyLoading ? "Processing..." : "Place Order"}
            </button>
        </div>
    );
}