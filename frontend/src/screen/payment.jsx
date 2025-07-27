import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const Payment = () => {
  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL,
    currency: "USD",
    intent: "capture",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <PayPalScriptProvider options={initialOptions}>
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Buy Now</h2>
            <PayPalButtons
              style={{ layout: "vertical", height: 45 }}
              createOrder={(data, actions) =>
                actions.order.create({
                  purchase_units: [{ amount: { value: "10.00" } }],
                })
              }
              onApprove={(data, actions) =>
                actions.order.capture().then((details) => {
                  alert(`Transaction completed by ${details.payer.name.given_name}`);
                })
              }
              onError={(err) => {
                console.error("PayPal Checkout Error:", err);
              }}
            />
          </div>
        </PayPalScriptProvider>
      </div>
    </div>
  );
};
