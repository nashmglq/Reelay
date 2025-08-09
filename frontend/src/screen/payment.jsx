import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { paymentStore } from "../stores/authStore";

export const Payment = () => {
  const [amount, setAmount] = useState("");
  const { payment, success, message } = paymentStore();

  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL,
    currency: "USD",
    intent: "capture",
  };

  const submit = () => {
    payment({ amount: parseInt(amount) });
    if (success) setAmount("");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full text-center space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Secure Payment</h1>

        <input
          type="number"
          placeholder="Enter amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          step={1}
        />

        {success && message && (
          <p className="text-green-600 text-sm">{message}</p>
        )}

        <div className="p-4 rounded-lg border border-gray-200">
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              style={{ layout: "vertical", color: "gold", shape: "rect", label: "paypal" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: { value: amount || "1" },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(() => {
                  submit();
                });
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
    </div>
  );
};
