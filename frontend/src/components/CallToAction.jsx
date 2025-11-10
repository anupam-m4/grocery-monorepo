// import { assets } from "../assets/assets";
// import { motion } from "motion/react";
// const CallToAction = () => {
//   return (
//     <div>
//       <div className="flex flex-col md:flex-row items-center justify-between  gap-4">
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           className="bg-[#FDF5F1] flex flex-col md:flex-row gap-5 items-center justify-between p-4 rounded-2xl"
//         >
//           <div className="flex flex-col gap-3">
//             <h1 className="text-primary text-2xl font-bold uppercase">
//               Healthy Organic Fruits
//             </h1>
//             <h2 className="text-2xl font-semibold text-secondary">
//               Get 21% Flat Off
//             </h2>
//             <button className="px-6 py-3 bg-secondary text-white hover:bg-primary transition-all ease-in-out duration-300 cursor-pointer">
//               View all items
//             </button>
//           </div>
//           <img src={assets.organic_fruits} alt="" className="w-1/2" />
//         </motion.div>
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           className="bg-[#EEF9FC] flex flex-col md:flex-row gap-5 items-center justify-between p-4 rounded-2xl"
//         >
//           <div className="flex flex-col gap-3">
//             <h1 className="text-primary text-2xl font-bold uppercase">
//               Get 10% Flat Offer on
//             </h1>
//             <h2 className="text-2xl font-semibold text-secondary">
//               Fresh Organic Vegetables
//             </h2>
//             <button className="px-6 py-3 bg-secondary text-white hover:bg-primary transition-all ease-in-out duration-300 cursor-pointer">
//               View all items
//             </button>
//           </div>
//           <img src={assets.organic_fruits} alt="" className="w-1/2" />
//         </motion.div>
//       </div>
//     </div>
//   );
// };
// export default CallToAction;
// --------------------------------------------



import { motion } from "motion/react";
import { assets } from "../assets/assets";

const CallToAction = () => {
  const cards = [
    {
      title: "Healthy Organic Fruits",
      subtitle: "Get 21% Flat Off",
      bg: "from-[#FDF5F1] to-[#FFEFE5]",
      image: assets.organic_fruits,
      textColor: "text-[#C56A36]",
    },
    {
      title: "Fresh Organic Vegetables",
      subtitle: "Get 10% Flat Offer",
      bg: "from-[#EEF9FC] to-[#D8F3FA]",
      image: assets.organic_vegetables,
      textColor: "text-[#247A99]",
    },
  ];

  return (
    <div className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className={`bg-gradient-to-br ${card.bg} rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 p-6`}
          >
            <div className="flex flex-col gap-3 text-center md:text-left">
              <h1
                className={`text-2xl md:text-3xl font-bold uppercase ${card.textColor}`}
              >
                {card.title}
              </h1>
              <h2 className="text-2xl font-semibold text-secondary">
                {card.subtitle}
              </h2>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 mt-2 bg-secondary text-white font-medium rounded-md hover:bg-primary transition-all duration-300"
              >
                View All Items
              </motion.button>
            </div>

            <div className="w-1/2 md:w-[45%] flex justify-center">
              <img
                src={card.image}
                alt={card.title}
                className="w-full object-contain drop-shadow-lg"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CallToAction;
