
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";
import { Heart, ShoppingBasket } from "lucide-react";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { productsData, currency, addToCart, addToFavorite } =
    useContext(AppContext);
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const foundProduct = productsData.find((item) => item._id === id);
    setProduct(foundProduct);
    // CRITICAL: Set mainImage state with the name of the first image
    if (foundProduct && foundProduct.images.length > 0) setMainImage(foundProduct.images[0]);
  }, [id, productsData]);

  useEffect(() => {
    if (product) {
      const related = productsData.filter(
        // Filter out the current product itself
        (item) => item?.category?.name === product?.category?.name && item._id !== product._id
      );
      setRelatedProducts(related);
    }
  }, [product, productsData]);

  if (!product) return null;

  // Define your base URL for images
  const BASE_IMAGE_URL = "http://localhost:4000/uploads";

  return (
    <div className="py-16 px-4 md:px-10 lg:px-20">
      <div className="flex flex-col md:flex-row items-start gap-10">
        {/* LEFT — IMAGE SECTION */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          {/* Main Image Box */}
          <div className="relative w-full max-w-md bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm flex justify-center items-center">
            {/* FIX: Use mainImage state variable here */}
            <img
              src={`${BASE_IMAGE_URL}/${mainImage}`} 
              alt={product.name}
              className="object-contain h-[300px] md:h-[450px] transition-transform duration-300 hover:scale-105"
            />
          </div> 

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-4 mt-5">
            {product.images.map((img, index) => (
              <img
                key={index}
                // CORRECT: Use the 'img' variable defined in the map function
                src={`${BASE_IMAGE_URL}/${img}`} 
                alt={product.name}
                onClick={() => setMainImage(img)}
                className={`h-20 w-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === img
                    ? "border-secondary ring-2 ring-secondary"
                    : "border-gray-200"
                } hover:opacity-90 transition-all duration-300`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — PRODUCT DETAILS (No changes needed here) */}
        <div className="w-full md:w-1/2 space-y-5">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

          <div className="flex items-center gap-4">
            <p className="text-gray-500 line-through text-lg">
              {currency}
              {product.price}/kg
            </p>
            <p className="text-2xl font-semibold text-secondary">
              {currency}
              {product.offerPrice}/kg
            </p>
          </div>

          <p className="text-gray-600 text-base leading-relaxed">
            {product.smallDesc}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <motion.button
              onClick={() => addToCart(product)}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-secondary text-white font-semibold rounded-md hover:bg-primary transition-all"
            >
              <ShoppingBasket size={18} />
              Add to Cart
            </motion.button>

            <motion.button
              onClick={() => addToFavorite(product)}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-secondary text-white font-semibold rounded-md hover:bg-primary transition-all"
            >
              <Heart size={18} />
              Add to Wishlist
            </motion.button>
          </div>

          <p className="text-secondary text-xl font-semibold mt-4">
            Category: {product.category.name}
          </p>

          {/* Description Box */}
          <div className="mt-6 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <h2 className="bg-secondary text-white py-3 px-4 text-xl font-semibold">
              Description
            </h2>
            <p className="p-4 text-gray-700 leading-relaxed">
              {product.longDesc}
            </p>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <h2 className="mt-16 text-secondary font-extrabold text-3xl text-center">
        Related Products
      </h2>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
        {/* Filter out the current product from related products list */}
        {relatedProducts
          .filter(item => item._id !== product._id)
          .map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
      </div>
    </div>
  );
};

export default ProductDetails;