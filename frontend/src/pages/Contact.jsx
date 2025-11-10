import { useState, useRef, useEffect } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    message: "",
    title: "Contact from FreshHarvest",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const formRef = useRef();

  // 🕒 Automatically remove message after 10s (with fade animation)
  useEffect(() => {
    if (status) {
      const fadeTimer = setTimeout(() => setFadeOut(true), 9000); // start fade at 9s
      const clearTimer = setTimeout(() => {
        setStatus("");
        setFadeOut(false);
      }, 10000); // remove message at 10s
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(clearTimer);
      };
    }
  }, [status]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { from_name, reply_to, message } = formData;

    if (!from_name || !reply_to || !message) {
      setStatus("⚠️ Please fill all fields before submitting.");
      return;
    }

    setLoading(true);
    setStatus("");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully! We'll reply soon.");
          setFormData({
            from_name: "",
            reply_to: "",
            message: "",
            title: "Contact from FreshHarvest",
          });
          setLoading(false);
        },
        (error) => {
          console.error("EmailJS error:", error);
          setStatus("❌ Failed to send message. Try again later.");
          setLoading(false);
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 bg-white shadow-xl rounded-3xl overflow-hidden">
        {/* Left section */}
        <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold mb-4">Get in Touch 🌿</h2>
          <p className="text-gray-100 mb-6 leading-relaxed">
            Have questions about our products, services, or sustainability
            practices? Fill out the form and our team will reach out within 24
            hours.
          </p>

          <ul className="space-y-4 text-gray-100">
            <li>
              📍 <strong>Address:</strong> Puri - 002, Odisha
            </li>
            <li>
              📞 <strong>Phone:</strong> +91-9911991199
            </li>
            <li>
              ✉️ <strong>Email:</strong> anupampadhy98@gmail.com
            </li>
          </ul>
        </div>

        {/* Right section - form */}
        <div className="p-10">
          <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center md:text-left">
            Send Us a Message
          </h3>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 text-gray-600 font-medium">
                Your Name
              </label>
              <input
                type="text"
                name="from_name"
                value={formData.from_name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600 font-medium">
                Your Email
              </label>
              <input
                type="email"
                name="reply_to"
                value={formData.reply_to}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600 font-medium">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                placeholder="Write your message here..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition transform ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Status message with fade animation */}
          {status && (
            <p
              className={`text-center mt-4 text-sm transition-opacity duration-1000 ${
                fadeOut ? "opacity-0" : "opacity-100"
              } ${
                status.startsWith("✅")
                  ? "text-green-600"
                  : status.startsWith("❌")
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
