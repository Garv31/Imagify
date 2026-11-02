
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Buy = () => {

    const { simulatePayment, token } = useContext(AppContext);
    const [loading, setLoading] = useState("");

    const plans = [
        {
            id: "basic",
            name: "Basic",
            credits: 100,
            price: 49
        },
        {
            id: "standard",
            name: "Standard",
            credits: 500,
            price: 199
        },
        {
            id: "premium",
            name: "Premium",
            credits: 1000,
            price: 349
        }
    ];

    const handlePayment = async (planId) => {

        if (!token) {
            toast.error("Please login first");
            return;
        }

        setLoading(planId);

        const success = await simulatePayment(planId);

        setLoading("");

        if (success) {
            toast.success("Credits added successfully!");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-6">

            <h1 className="text-3xl font-bold">
                Buy Credits
            </h1>

            <div className="flex flex-wrap justify-center gap-6">

                {plans.map((plan) => (

                    <div
                        key={plan.id}
                        className="border rounded-xl p-6 w-64 text-center shadow-lg"
                    >

                        <h2 className="text-2xl font-semibold">
                            {plan.name}
                        </h2>

                        <p className="text-3xl font-bold my-4">
                            ₹{plan.price}
                        </p>

                        <p className="mb-6">
                            {plan.credits} Credits
                        </p>

                        <button
                            onClick={() => handlePayment(plan.id)}
                            disabled={loading !== ""}
                            className="bg-black text-white px-6 py-3 rounded-lg w-full disabled:opacity-50"
                        >
                            {loading === plan.id
                                ? "Processing..."
                                : "Buy Now"}
                        </button>

                    </div>

                ))}

            </div>

            <p className="text-sm text-gray-500">
                Demo payment only. No actual money is charged.
            </p>

        </div>
    );
};

export default Buy;
