import React from "react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-black p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-black p-2 bg-white placeholder-black"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-black p-2 bg-white placeholder-black"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full border border-black p-2 bg-white placeholder-black resize-none"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 hover:bg-gray-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
