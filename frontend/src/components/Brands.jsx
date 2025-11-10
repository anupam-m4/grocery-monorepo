import { motion } from "motion/react";
import { assets } from "../assets/assets";

const Brands = () => {
  const brands = [
    assets.brand_1,
    assets.brand_2,
    assets.brand_3,
    assets.brand_4,
    assets.brand_5,
  ];

  return (
    <div className="py-16 bg-gray-50">
      <h2 className="text-center text-secondary font-extrabold text-3xl mb-10">
        Trusted By Top Organic Brands
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-8">
        {brands.map((brand, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
            className="p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
          >
            <img
              src={brand}
              alt={`brand-${index}`}
              className="w-[160px] h-[160px] object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
