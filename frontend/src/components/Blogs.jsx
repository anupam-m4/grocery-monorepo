// import { motion } from "motion/react";
// import { useContext } from "react";
// import { AppContext } from "../context/AppContext";
// const Blogs = () => {
//   const { blogsData } = useContext(AppContext);
//   return (
//     <div className="py-12 ">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center justify-center">
//         {blogsData.map((item, i) => (
//           <div key={i}>
//             <motion.div
//               whileHover={{ scale: 1.1 }}
//               transition={{ ease: "easeInOut", duration: 0.5 }}
//             >
//               <img src={item.image} alt="" className="w-full rounded-2xl" />
//             </motion.div>
//             <div className="flex items-center my-4">
//               <h2 className="max-w-lg text-lg font-semibold">{item.date}</h2>
//               <div className="ml-1 w-20 flex border-b border-secondary border-2"></div>
//             </div>
//             <h1 className="text-xl font-bold">{item.title}</h1>
//             <p className="text-sm font-normal">{item.desc}</p>
//             <button className="bg-secondary text-white px-6 py-2 cursor-pointer mt-5">
//               Read More
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default Blogs;
// ---------------------------







import { motion } from "motion/react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Blogs = () => {
  const { blogsData } = useContext(AppContext);

  return (
    <div className="py-16 bg-gray-50">
      <h2 className="text-center text-secondary font-extrabold text-3xl mb-10">
        Latest Blogs & News
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogsData.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-sm font-semibold text-gray-500">
                    {item.date}
                  </h2>
                  <div className="h-[2px] w-16 bg-secondary"></div>
                </div>

                <h1 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {item.title}
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="mt-6 self-start px-5 py-2 bg-secondary text-white text-sm font-medium rounded-md hover:bg-primary transition-all"
              >
                Read More
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
