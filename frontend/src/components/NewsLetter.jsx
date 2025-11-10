import { assets } from "../assets/assets";
import { motion } from "motion/react";

const NewsLetter = () => {
  return (
    <div className="bg-[#FFF4DF] py-16 rounded-2xl mt-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 max-w-6xl mx-auto">
        
        {/* Left Side - Image */}
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
          src={assets.organic_fruits}
          alt="newsletter"
          className="w-56 md:w-72"
        />

        {/* Middle - Text */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-secondary">
            Subscribe to Our Newsletter
          </h1>
          <p className="text-base text-gray-700">
            Get 10% off your first order and receive fresh offers every week!
          </p>

          {/* Form */}
          <form className="flex items-center mt-4 bg-white border border-gray-200 h-12 w-full md:w-[400px] rounded-full overflow-hidden shadow-sm">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-full pl-6 outline-none text-sm bg-transparent placeholder-gray-500"
              required
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-secondary hover:bg-primary transition-all duration-300 px-6 h-full rounded-full text-sm text-white cursor-pointer font-medium"
            >
              Subscribe
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
