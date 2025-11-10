
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Brands from "../components/Brands";
import { Sparkles, ShoppingBag, Leaf } from "lucide-react";

const About = () => {
  const { navigate } = useContext(AppContext);

  return (
    <div className="py-16 px-6 bg-white">
      {/* About Section */}
      <h1 className="text-4xl font-extrabold text-center text-secondary">
        About Our Farm & Farmers
      </h1>

      <p className="text-lg mt-6 text-center text-gray-700 max-w-5xl mx-auto leading-relaxed">
        At <span className="font-semibold text-primary">FreshHarvest Farms</span>, we believe great food starts with great people.
        Our farmers are the heart of everything we do — passionate cultivators
        who bring you the freshest, most nutritious produce possible. Every fruit,
        vegetable, and grain is grown with love and respect for nature. When you shop
        with us, you’re not just buying food — you’re supporting a movement towards
        healthier living and a greener planet.
      </p>

      {/* Deal of the Day Section */}
      <div className="mt-16 rounded-3xl bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 text-white shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 p-10">
          {/* Left Info Section */}
          <div className="flex flex-col gap-6 max-w-xl">
            <div className="flex items-center gap-3">
              <Sparkles className="w-7 h-7 text-yellow-300" />
              <h2 className="text-3xl font-bold">Deal of the Day</h2>
            </div>
            <p className="text-lg text-green-100 leading-relaxed">
              Discover today’s freshest offers — handpicked for you straight from
              our trusted local farmers. Enjoy exclusive discounts on high-quality
              produce, dairy, and essentials. 🍅🥦  
              <br />
              Hurry — these deals are available for a limited time only!
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="mt-4 inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-8 py-3 rounded-full shadow-md hover:bg-green-100 transition-all duration-300 w-fit"
            >
              <ShoppingBag className="w-5 h-5" />
              Shop Now
            </button>
          </div>

          {/* Decorative Box */}
          <div className="relative w-full md:w-[400px] h-[250px] bg-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-500">
            <Leaf className="absolute w-32 h-32 text-green-600 opacity-10 rotate-12" />
            <div className="flex flex-col items-center gap-2 z-10">
              <h3 className="text-green-700 text-2xl font-bold">Fresh Savings 🌿</h3>
              <p className="text-gray-600 text-center max-w-xs">
                Save up to <span className="text-green-700 font-bold">25%</span> on
                organic fruits and veggies grown sustainably by our farmers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Section */}
      <Brands />
    </div>
  );
};

export default About;
