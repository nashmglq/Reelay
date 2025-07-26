import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const Payment = () => {
  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL,
    currency: "USD",
    intent: "capture",
  };

  return (
    <div className="flex justify-center items-center">
      <div className="shadow-lg w-1/2 h-1/2">
        <PayPalScriptProvider options={initialOptions}>
          <div
            style={{
              maxWidth: "400px",
              margin: "2rem auto",
              textAlign: "center",
            }}
          >
            <h2>Buy Now</h2>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "10.00",
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  alert(
                    `Transaction completed by ${details.payer.name.given_name}`
                  );
                });
              }}
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
