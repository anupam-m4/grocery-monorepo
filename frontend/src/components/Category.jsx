// import { motion } from "motion/react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/autoplay";
// import { Autoplay } from "swiper/modules";
// import { useContext } from "react";
// import { AppContext } from "../context/AppContext";
// const Category = () => {
//   const { categoriesData } = useContext(AppContext);
//   const colors = [
//     "bg-red-300",
//     "bg-green-300",
//     "bg-blue-300",
//     "bg-cyan-300",
//     "bg-purple-300",
//     "bg-pink-300",
//     "bg-orange-300",
//     "bg-teal-300",
//   ];
//   return (
//     <div className="py-12">
//       <div className="flex items-center">
//         <h2 className="max-w-lg text-lg font-medium">Category</h2>
//         <div className="ml-1 w-20 flex border-b border-secondary border-2"></div>
//       </div>
//       <h2 className="mt-4 text-secondary font-extrabold text-3xl">
//         Shop By Collection{" "}
//       </h2>

//       <Swiper
//         modules={{ Autoplay }}
//         autoplay={{ delay: 4000, disableOnInteraction: false }}
//         loop={true}
//         // loop={categoriesData.length > 6}
//         slidesPerView={6}
//         breakpoints={{
//           0: {
//             slidesPerView: 2,
//           },

//           768: {
//             slidesPerView: 3,
//           },
//           1024: {
//             slidesPerView: 6,
//           },
//         }}
//         className="w-full my-5"
//       >
//         {categoriesData.map((category, i) => (
//           <SwiperSlide key={i}>
//             <motion.div
//               whileHover={{ rotate: 360 }}
//               transition={{ duration: 0.3 }}
//               className={`w-[130px] md:w-[150px] h-[170px]  rounded-md ${colors[i]} flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300`}
//             >
//               <img
//                 // src={`http://localhost:4000/uploads/${category.image}`}
//                 src={category.image}
//                 alt=""
//                 className="w-32 h-32"
//               />
//               <h3 className="text-lg font-semibold text-gray-800">
//                 {category.name}
//               </h3>
//             </motion.div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };
// export default Category;
// -----------------------------------------

import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Category = () => {
  const { categoriesData } = useContext(AppContext);

  // Gradient color pairs for each card
  const gradients = [
    "from-pink-200 via-red-200 to-yellow-100",
    "from-green-200 via-emerald-200 to-lime-100",
    "from-blue-200 via-cyan-200 to-sky-100",
    "from-teal-200 via-green-200 to-cyan-100",
    "from-purple-200 via-pink-200 to-rose-100",
    "from-orange-200 via-amber-200 to-yellow-100",
    "from-indigo-200 via-blue-200 to-cyan-100",
    "from-rose-200 via-pink-200 to-orange-100",
  ];

  return (
    <div className="py-16 bg-[#f9fafb]">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-secondary font-extrabold text-3xl md:text-4xl">
          Shop By Collection
        </h2>
        <p className="text-gray-600 mt-3 text-base md:text-lg">
          Discover our wide range of handpicked categories just for you.
        </p>
        <div className="mx-auto mt-3 w-24 border-b-4 border-primary rounded-full"></div>
      </div>

      {/* Category Swiper */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={categoriesData.length > 6}
        slidesPerView={6}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 6 },
        }}
        className="w-full px-5 md:px-10"
      >
        {categoriesData.map((category, i) => (
          <SwiperSlide key={i}>
            <motion.div
              whileHover={{ scale: 1.08, y: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`bg-gradient-to-br ${gradients[i % gradients.length]} 
              w-[140px] md:w-[160px] h-[180px] mx-auto rounded-2xl 
              flex flex-col items-center justify-center 
              shadow-md hover:shadow-xl cursor-pointer 
              transition-all duration-300`}
            >
              <div className="bg-white/70 backdrop-blur-md rounded-full p-3 mb-2">
                <img
                  // src={category.image}
                   src={`http://localhost:4000/uploads/${category.image}`}
                  alt={category.name}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <motion.h3
                whileHover={{ scale: 1.05 }}
                className="text-sm md:text-lg font-semibold text-gray-800 mt-2"
              >
                {category.name}
              </motion.h3>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
