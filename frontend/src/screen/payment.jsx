import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { paymentStore } from "../stores/authStore";

export const Payment = () => {
  const [amount, setAmount] = useState("");
  const { payment, loading, success, error, message } = paymentStore();

  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL,
    currency: "USD",
    intent: "capture",
  };
  const submit = () => {


    const formData = { amount: parseInt(amount) };
    payment(formData);

    if(success){
      setAmount("")
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col space-y-4">
      <label>Insert Amount</label>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border px-4 py-2 rounded-md"
        step={1}
      />

      {success && message ? <p>{message}</p>: null}

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
                submit();
              });
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};
