import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

export const Payment = () => {
  const [amount, setAmount] = useState("");

  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL,
    currency: "USD",
    intent: "capture",
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col space-y-4">
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border px-4 py-2 rounded-md"
        step={1}
      />

      <div className="flex p-4 shadow-lg rounded-lg justify-center items-center w-[20%]">
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount || "1",  
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                alert(`Transaction completed by ${details.payer.name.given_name}`);
                console.log(details);
              });
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};
