import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const ProductCard = ({ product }) => {
  const { currency, addToCart, addToFavorite, removeFromFavorite, favorite } =
    useContext(AppContext);

  const isFavorite = favorite.some((item) => item._id === product._id);

  const toggleFavorite = (e) => {
    e.preventDefault(); // prevent navigation when clicking heart
    if (isFavorite) removeFromFavorite(product._id);
    else addToFavorite(product);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 250 }}
      className="
        w-[160px] sm:w-[200px] md:w-[230px] lg:w-[250px] 
        bg-white rounded-2xl p-4 
        shadow-md hover:shadow-xl
        border border-gray-100 
        transition-all ease-in-out duration-300
        cursor-pointer
      "
    >
      {/* Product Image Section */}
      <Link to={`/product/${product._id}`} className="block mb-3 relative">
        <div
          className="
            relative w-full h-[180px] 
            flex justify-center items-center 
            overflow-hidden 
            rounded-xl 
            border border-gray-200 bg-gray-50
          "
        >
          <motion.img
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.3 }}
            // src={product.images[0]}
             src={`http://localhost:4000/uploads/${product.images[0]}`}
            alt={product.name}
            className="object-contain w-full h-full p-2"
          />
        </div>

        {/* ❤️ Wishlist Icon */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-all duration-200 ${
            isFavorite ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"
          } hover:scale-110`}
        >
          <Heart
            size={18}
            className={`${isFavorite ? "fill-red-500 text-red-500" : ""}`}
          />
        </button>
      </Link>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCart(product)}
        className="
          flex items-center justify-center 
          gap-2 w-full py-2 mb-3 
          bg-secondary text-white rounded-lg 
          hover:bg-primary transition-all
        "
      >
        <span className="text-sm sm:hidden">Add to Cart</span>
        <span className="hidden sm:flex items-center gap-2">
          <ShoppingCart size={18} /> Add to Cart
        </span>
      </button>

      <hr className="my-2" />

      {/* Product Info */}
      <p className="text-secondary text-xs uppercase tracking-wide">
        {product.category?.name}
      </p>
      <h2 className="text-base font-semibold text-gray-800 line-clamp-2">
        {product.name}
      </h2>

      {/* Price Section */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
        <p className="text-sm line-through text-gray-400">
          {currency}
          {product.price}/kg
        </p>
        <p className="text-lg font-bold text-secondary">
          {currency}
          {product.offerPrice}/kg
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
