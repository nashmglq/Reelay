import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import { paymentStore } from "../stores/authStore";
import { CreditCard, Ticket, DollarSign } from "lucide-react";
import {motion} from "framer-motion"

export const Payment = () => {
  const [amount, setAmount] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const { payment, success, message } = paymentStore();

  const packages = [
    { id: 1, usd: 5, tickets: 250, popular: false, savings: 0 },
    { id: 2, usd: 10, tickets: 500, popular: true, savings: 0 },
    { id: 3, usd: 20, tickets: 1100, popular: false, savings: 10 },
    { id: 4, usd: 50, tickets: 3000, popular: false, savings: 20 },
  ];

  const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL,
    currency: "PHP",
    intent: "capture",
  };

  const submit = () => {
    const finalAmount = selectedPackage ? selectedPackage.usd : parseInt(amount);
    payment({ amount: finalAmount });
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setAmount(pkg.usd.toString());
  };

  const calculateTickets = (usdAmount) => usdAmount * 50;

  const currentAmount = selectedPackage ? selectedPackage.usd : parseInt(amount) || 0;
  const currentTickets = selectedPackage ? selectedPackage.tickets : calculateTickets(currentAmount);

  useEffect(() => {
    if (success) {
      setAmount("");
      setSelectedPackage(null);
    }
  }, [success]);

  return (
   <motion.div className="bg-gray-50 py-8 px-3 min-h-screen flex justify-center items-center"
    initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-black text-white rounded-full mb-3">
            <CreditCard className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Get More Tickets</h1>
          <p className="text-gray-600 text-base">Choose a package or enter a custom amount</p>
          <div className="flex items-center justify-center mt-3 text-sm text-gray-500">
            <span>₱1 = 50 Tickets</span>
          </div>
     
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-5">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Ticket className="w-5 h-5 mr-2" /> Ticket Packages
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {packages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => handlePackageSelect(pkg)}
                    className={`relative p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedPackage?.id === pkg.id
                        ? "border-black bg-black text-white"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    } ${pkg.popular ? "ring-2 ring-blue-500" : ""}`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      </div>
                    )}
                    <div className="text-center">
                      <div className={`text-xl font-bold ${selectedPackage?.id === pkg.id ? "text-white" : "text-gray-900"}`}>
                        ₱{pkg.usd}
                      </div>
                      <div className={`text-xs ${selectedPackage?.id === pkg.id ? "text-gray-200" : "text-gray-600"}`}>
                        {pkg.tickets.toLocaleString()} tickets
                      </div>
                      {pkg.savings > 0 && (
                        <div className="text-xs text-green-600 mt-0.5">+{pkg.savings}% bonus</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Amount (PHP)
                </label>
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setSelectedPackage(null);
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  min="1"
                  step="1"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-5 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
            <div className="space-y-2 text-gray-600 text-sm">
              <div className="flex justify-between">
                <span>Amount:</span>
                <span>₱{currentAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>You'll receive:</span>
                <span className="flex items-center">
                  <Ticket className="w-4 h-4 mr-1" />
                  {currentTickets.toLocaleString()} tickets
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between text-gray-900 font-semibold">
                <span>Total:</span>
                <span>₱{currentAmount} PHP</span>
              </div>

              {success && message && (
                <div className="p-2 bg-green-50 border border-green-200 rounded text-xs">
                  <p className="text-green-700 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    {message}
                  </p>
                </div>
              )}

              {currentAmount > 0 ? (
                <div className="p-3 bg-gray-50 rounded border border-gray-200">
                  <PayPalScriptProvider
                    options={initialOptions}
                    onError={(err) => console.error("PayPal Script Error:", err)}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical", color: "black", shape: "rect", label: "pay", height: 40 }}
                      createOrder={(data, actions) =>
                        actions.order.create({
                          purchase_units: [{ amount: { value: currentAmount.toString() } }],
                        })
                      }
                      onApprove={(data, actions) => actions.order.capture().then(submit)}
                      onError={(err) => console.error("PayPal Button Error:", err)}
                    />
                  </PayPalScriptProvider>
                  <div className="text-center text-xs text-gray-500 mt-2">
                    Your payment is secured by PayPal
                  </div>
                </div>
              ) : (
                <div className="text-center py-5 text-gray-500 text-sm">
                  <Ticket className="w-10 h-10 mx-auto mb-2" />
                  <p>Select a package or enter an amount to continue</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
