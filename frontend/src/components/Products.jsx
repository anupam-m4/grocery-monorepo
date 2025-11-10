import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ProductCard from "./ProductCard.jsx";

const Products = () => {
  const { productsData } = useContext(AppContext);

  return (
    <div className="py-16 bg-[#f9fafb]">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-secondary font-extrabold text-3xl md:text-4xl">
          Pick Your Favorite One
        </h2>
        <p className="text-gray-600 mt-3 text-base md:text-lg">
          Recently Arrived Products — Freshly stocked, just for you!
        </p>
        <div className="mx-auto mt-3 w-24 border-b-4 border-primary rounded-full"></div>
      </div>

      {/* Product Grid */}
      <div
        className="
          mt-10 
          grid 
          grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
          gap-8 xl:gap-10
          justify-items-center
          px-4 sm:px-8 md:px-12 lg:px-20
        "
      >
        {productsData.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
