import { useState } from "react";
import { emailStore } from "../stores/authStore";

export const Contact = ({ id }) => {
  const { emailSend, loading, success, error, message } = emailStore();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = {
      email,
      subject,
      text,
    };
    emailSend(formData);
  };

  return (
    <div id={id} className="min-h-screen bg-white text-black flex pt-20 px-20 justify-center gap-x-12">
      {/* Contact Form Side */}
      <div className="flex flex-col w-1/2 space-y-6">
        <h1 className="text-5xl font-bold text-black border-b-4 border-black pb-4">
          Contact Us
        </h1>
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
          <form className="space-y-6" onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-black p-3 bg-white placeholder-black rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-black p-3 bg-white placeholder-black rounded-md"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border border-black p-3 bg-white placeholder-black resize-none rounded-md"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            {success && <p className="text-green-600">Message sent successfully!</p>}
            {error && <p className="text-red-600">{message}</p>}
          </form>
        </div>
      </div>

      {/* Info Side */}
      <div className="flex flex-col w-1/2 space-y-6">
        <h1 className="text-5xl font-bold text-black border-b-4 border-black pb-4">
          Why Reach Out?
        </h1>
        <div className="bg-black text-white p-6 rounded-lg">
          <p className="text-lg leading-relaxed">
            Whether you're a creator with feedback, a business interested in collaboration,
            or someone with inquiries about our services, we’re here to assist you.
            Let’s connect and build something impactful together.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
          <h3 className="text-xl font-bold text-black mb-4">Quick Contact Tips:</h3>
          <ul className="space-y-3 text-gray-800">
            <li>✅ Be clear with your message or inquiry</li>
            <li>✅ Include relevant details for faster response</li>
            <li>✅ Expect a reply within 24-48 hours</li>
          </ul>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
          <h3 className="text-xl font-bold text-black mb-4">Business Hours:</h3>
          <p className="text-gray-800">Monday - Friday: 9:00 AM - 6:00 PM (PHT)</p>
          <p className="text-gray-800">Weekend inquiries will be addressed on Monday.</p>
        </div>
      </div>
    </div>
  );
};
