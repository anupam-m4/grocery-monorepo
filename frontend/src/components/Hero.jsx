

import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { motion } from "motion/react";
import { assets } from "../assets/assets.js";

const Hero = () => {
  const { navigate } = useContext(AppContext);

  const slides = [
    {
      title: "Premium Online Store for Fresh Fruits & Veggies",
      img: assets.hero_img1,
      btn1: "SHOP NOW",
      btn2: "LEARN MORE",
    },
    {
      title: "100% Organic Groceries Delivered Fresh Daily",
      img: assets.hero_img2,
      btn1: "ORDER NOW",
      btn2: "LEARN MORE",
    },
    {
      title: "Your Daily Needs at the Best Prices",
      img: assets.hero_img3,
      btn1: "START SHOPPING",
      btn2: "LEARN MORE",
    },
  ];

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={true}
      className="w-full"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative h-[800px] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 bg-gradient-to-br from-[#e6f4d4] via-[#f8fbe6] to-[#e8f7d4] overflow-hidden"
          >
            {/* Decorative leaf overlay */}
            <img
              src={assets.leef_layer_bg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
            />

            {/* Text Section */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="z-10 flex flex-col items-center md:items-start text-center md:text-left  space-y-8 max-w-xl"
            >
              <h1 className="text-4xl md:text-6xl mt-2 font-extrabold leading-snug text-secondary">
                {slide.title}
              </h1>

              <p className="text-gray-600 text-lg md:text-xl font-medium max-w-lg">
                Shop from the freshest produce sourced directly from trusted
                farmers and delivered right to your doorstep.
              </p>

              <div className="flex gap-5 mt-5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => navigate("/shop")}
                  className="px-8 py-3 bg-primary text-white rounded-full shadow-lg hover:shadow-orange-400/50 hover:bg-orange-500 transition"
                >
                  {slide.btn1}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => navigate("/about")}
                  className="px-8 py-3 bg-secondary text-white rounded-full shadow-lg hover:shadow-green-400/50 hover:bg-green-700 transition"
                >
                  {slide.btn2}
                </motion.button>
              </div>
            </motion.div>

            {/* Image Section */}
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: [0, -20, 0], opacity: 1 }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-10 md:mt-0 z-10"
            >
              <img
                src={slide.img}
                alt="hero"
                className="h-[350px] md:h-[600px] drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
