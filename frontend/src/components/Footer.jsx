

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#155136] to-[#0f3825] text-white py-16 mt-12">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 text-center md:text-left">
        {/* Brand Info */}
        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold text-white">Organic Store</h2>
          <p className="text-sm text-gray-200 leading-relaxed">
            We deliver fresh organic products straight from farms to your table.
            Taste the goodness of nature every day.
          </p>
        </div>

        {/* Useful Pages */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">
            Useful Pages
          </h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
            <li><Link to="/shop" className="hover:text-yellow-400 transition">Shop</Link></li>
            <li><Link to="/about" className="hover:text-yellow-400 transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Help Center */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">
            Help Center
          </h3>
          <ul className="space-y-2">
            <li><Link to="#" className="hover:text-yellow-400 transition">Payment</Link></li>
            <li><Link to="#" className="hover:text-yellow-400 transition">Shipping</Link></li>
            <li><Link to="#" className="hover:text-yellow-400 transition">Product Returns</Link></li>
            <li><Link to="#" className="hover:text-yellow-400 transition">Checkout</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">
            Resources
          </h3>
          <ul className="space-y-2">
            <li><Link to="#" className="hover:text-yellow-400 transition">Privacy Policy</Link></li>
            <li><Link to="#" className="hover:text-yellow-400 transition">Terms & Conditions</Link></li>
            <li><Link to="#" className="hover:text-yellow-400 transition">FAQs</Link></li>
            <li><Link to="#" className="hover:text-yellow-400 transition">Support</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">
            Stay Connected
          </h3>
          <p className="text-sm text-gray-200 mb-3">
            Subscribe for the latest organic deals and product updates.
          </p>
          <form className="flex items-center bg-white/10 rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent flex-1 px-4 py-2 text-sm text-white placeholder-gray-300 outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-[#155136] px-4 py-2 font-semibold hover:bg-yellow-300 transition-all"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-white/20 pt-6 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} Organic Store — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
