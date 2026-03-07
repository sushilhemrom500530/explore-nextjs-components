"use client";
import { stripePromise } from "@/src/lib/stripe";
import { Elements } from "@stripe/react-stripe-js";
import AddCardForm from "../add-card";
import BuyForm from "../buy-form";


export default function PaymentPage() {
    return (
        <Elements stripe={stripePromise}>
            <div className="max-w-md mx-auto py-10 px-6 space-y-10">
                <section>
                    <h2 className="text-xl font-semibold mb-4">Add a Card</h2>
                    <AddCardForm />
                </section>
                <hr />
                <section>
                    <h2 className="text-xl font-semibold mb-4">Place an Order</h2>
                    <BuyForm />
                </section>
            </div>
        </Elements>
    );
}