

// import { useContext } from "react";
// import { AppContext } from "../context/AppContext";
// import { CircleX, ShoppingCart, Heart } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const WishList = () => {
//   const { favorite, currency, removeFromFavorite, addToCart } =
//     useContext(AppContext);
//   const navigate = useNavigate();

//   return (
//     <div className="py-12 px-4">
//       <h1 className="text-3xl font-bold text-center mb-6 text-secondary">
//         My Wishlist
//       </h1>

//       {favorite.length === 0 ? (
//         <div className="flex flex-col items-center justify-center py-20 text-gray-600">
//           <Heart size={60} className="text-gray-400 mb-4" />
//           <p className="text-lg font-medium">Your wishlist is empty 💔</p>
//           <p className="text-sm text-gray-500 mt-1 mb-6">
//             Add some items you love to see them here!
//           </p>
//           <button
//             onClick={() => navigate("/shop")}
//             className="bg-secondary hover:bg-primary text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md"
//           >
//             🛒 Shop Now
//           </button>
//         </div>
//       ) : (
//         <div className="border border-gray-300 max-w-5xl mx-auto rounded-xl p-5 shadow-sm">
//           {/* Headings: Hidden on mobile, shown on 'md' */}
//           <div className="hidden md:grid grid-cols-3 font-semibold text-gray-700 mb-3">
//             <div>Product</div>
//             <div>Price</div>
//             <div className="text-center">Actions</div>
//           </div>
//           <hr className="w-full mb-4 text-gray-200" />

//           <ul>
//             {favorite.map((item) => (
//               <div
//                 key={item._id}
//                 // *** KEY CHANGE: Force horizontal layout (flex-row flex-nowrap) on mobile ***
//                 className="flex flex-row flex-nowrap items-center mb-5 hover:bg-gray-50 p-3 rounded-lg transition-all border-b md:border-b-0 justify-between gap-2"
//               >
//                 {/* 1. Product Name & Image (Grouped to stay together) */}
//                 <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
//                   <img
//                     // src={item.images[0]}
//                     src={`http://localhost:4000/uploads/${item.images[0]}`}
//                     alt={item.name}
//                     // *** Reduced Image Size ***
//                     className="w-12 h-12 rounded-md border border-gray-200 object-cover flex-shrink-0"
//                   />
//                   {/* *** Reduced Text Size & Truncate Name *** */}
//                   <p className="font-medium text-sm text-gray-800 truncate max-w-[80px] md:max-w-none">
//                     {item.name}
//                   </p>
//                 </div>

//                 {/* 2. Price */}
//                 {/* *** Reduced Text Size & Hidden on mobile for very tight spaces if needed, but keeping it visible here *** */}
//                 <p className="text-gray-700 font-semibold text-xs md:text-base flex-shrink-0">
//                   {currency}
//                   {item.offerPrice}
//                 </p>

//                 {/* 3. Actions */}
//                 <div className="flex items-center gap-3 flex-shrink-0">
//                   <p
//                     onClick={() => removeFromFavorite(item._id)}
//                     className="text-red-500 cursor-pointer hover:text-red-600 transition-colors"
//                     title="Remove"
//                   >
//                     {/* Optionally reduce icon size if needed, e.g., size={16} */}
//                     <CircleX size={18} />
//                   </p>
//                   <p
//                     onClick={() => {
//                       addToCart(item);
//                       if (favorite.some((fav) => fav._id === item._id)) {
//                         removeFromFavorite(item._id);
//                       }
//                     }}
//                     className="text-green-600 cursor-pointer hover:text-green-700 transition-colors"
//                     title="Add to Cart"
//                   >
//                     {/* Optionally reduce icon size if needed, e.g., size={16} */}
//                     <ShoppingCart size={18} />
//                   </p>
//                 </div>

//                 {/* Desktop Grid Layout (for md screens and up) */}
//                 <div className="hidden md:grid md:grid-cols-3 items-center w-full">
//                   {/* Product Name & Image (Desktop) */}
//                   <div className="flex items-center gap-3">
//                     <img
//                       // src={item.images[0]}
//                       src={`http://localhost:4000/uploads/${item.images[0]}`}
//                       alt={item.name}
//                       className="w-16 h-16 rounded-md border border-gray-200 object-cover"
//                     />
//                     <p className="font-medium text-gray-800">{item.name}</p>
//                   </div>

//                   {/* Price (Desktop) */}
//                   <p className="text-gray-700 font-semibold">
//                     {currency}
//                     {item.offerPrice}
//                   </p>

//                   {/* Actions (Desktop) */}
//                   <div className="flex items-center gap-5 justify-center">
//                     <p
//                       onClick={() => removeFromFavorite(item._id)}
//                       className="text-red-500 cursor-pointer hover:text-red-600 transition-colors"
//                       title="Remove from Wishlist"
//                     >
//                       <CircleX />
//                     </p>
//                     <p
//                       onClick={() => {
//                         addToCart(item);
//                         if (favorite.some((fav) => fav._id === item._id)) {
//                           removeFromFavorite(item._id);
//                         }
//                       }}
//                       className="text-green-600 cursor-pointer hover:text-green-700 transition-colors"
//                       title="Add to Cart"
//                     >
//                       <ShoppingCart />
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WishList;


import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { CircleX, ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const { favorite, currency, removeFromFavorite, addToCart } =
    useContext(AppContext);
  const navigate = useNavigate();

  const BASE_IMAGE_URL = "http://localhost:4000/uploads";

  return (
    <div className="py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-secondary">
        My Wishlist
      </h1>

      {favorite.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-600">
          <Heart size={60} className="text-gray-400 mb-4" />
          <p className="text-lg font-medium">Your wishlist is empty 💔</p>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Add some items you love to see them here!
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-secondary hover:bg-primary text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md"
          >
            🛒 Shop Now
          </button>
        </div>
      ) : (
        <div className="border border-gray-300 max-w-5xl mx-auto rounded-xl p-5 shadow-sm">
          {/* Headings: Hidden on mobile, shown on 'md' */}
          <div className="hidden md:grid grid-cols-3 font-semibold text-gray-700 mb-3">
            <div>Product</div>
            <div>Price</div>
            <div className="text-center">Actions</div>
          </div>
          <hr className="w-full mb-4 text-gray-200" />

          <ul>
            {favorite.map((item) => (
              <div
                key={item._id}
                // *** MERGED LAYOUT CLASSES ***
                // Mobile: flex row | Desktop: grid 3-cols
                className="flex md:grid md:grid-cols-3 items-center mb-5 hover:bg-gray-50 p-3 rounded-lg transition-all border-b md:border-b-0 justify-between gap-2"
              >
                {/* 1. Product Name & Image */}
                {/* The container for image and name is now the first grid column on desktop */}
                <div className="flex items-center gap-3 flex-shrink-0 min-w-0">
                  <img
                    src={`${BASE_IMAGE_URL}/${item.images[0]}`}
                    alt={item.name}
                    // Use desktop size and hide on mobile for compact view if needed, but for now, rely on overall container size
                    className="w-12 h-12 md:w-16 md:h-16 rounded-md border border-gray-200 object-cover flex-shrink-0"
                  />
                  <p className="font-medium text-sm md:text-base text-gray-800 truncate max-w-[80px] md:max-w-none">
                    {item.name}
                  </p>
                </div>

                {/* 2. Price */}
                {/* Mobile: flex item | Desktop: 2nd grid column */}
                <p className="text-gray-700 font-semibold text-xs md:text-base flex-shrink-0">
                  {currency}
                  {item.offerPrice}
                </p>

                {/* 3. Actions */}
                {/* Mobile: flex item | Desktop: 3rd grid column, centered */}
                <div className="flex items-center gap-3 flex-shrink-0 md:justify-center">
                  <p
                    onClick={() => removeFromFavorite(item._id)}
                    className="text-red-500 cursor-pointer hover:text-red-600 transition-colors"
                    title="Remove"
                  >
                    <CircleX size={18} />
                  </p>
                  <p
                    onClick={() => {
                      addToCart(item);
                      if (favorite.some((fav) => fav._id === item._id)) {
                        removeFromFavorite(item._id);
                      }
                    }}
                    className="text-green-600 cursor-pointer hover:text-green-700 transition-colors"
                    title="Add to Cart"
                  >
                    <ShoppingCart size={18} />
                  </p>
                </div>
                
                {/* *** THE FOLLOWING DUPLICATE CODE WAS REMOVED ***
                  <div className="hidden md:grid md:grid-cols-3 items-center w-full"> 
                    ... duplicate image, name, price, and actions ...
                  </div> 
                */}
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WishList;