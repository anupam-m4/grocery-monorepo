import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { CircleX } from "lucide-react";

const Cart = () => {
  const {
    cart,
    currency,
    navigate,
    removeFromCart,
    getCartTotal,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10">
          🛒 My Fresh Basket
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white shadow-md rounded-2xl">
            <p className="text-gray-500 text-lg mb-6">
              Your basket is empty. Add some farm-fresh items!
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300"
            >
              Browse Vegetables
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* 🧺 Cart Items */}
            <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="border-b border-gray-200 py-4 hover:bg-gray-50 transition-all duration-200 rounded-lg px-2"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-4">
                    <img
                      // src={item.images[0]}
                      src={`http://localhost:4000/uploads/${item.images[0]}`}
                      alt={item.name}
                      className="w-24 h-24 rounded-lg object-cover shadow-sm"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-gray-500 text-sm">{item.unit}</p>
                      <p className="text-gray-600 text-sm mt-1">
                        {currency}
                        {item.offerPrice} / {item.unit || "kg"}
                      </p>
                    </div>
                  </div>

                  {/* Quantity, Price */}
                  <div className="flex items-center justify-between mt-3 gap-3 flex-wrap">
                    {/* Quantity Control */}
                    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1 shadow-inner">
                      <button
                        onClick={() => decreaseQuantity(item._id)}
                        disabled={item.quantity <= 1}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 disabled:opacity-50 transition"
                      >
                        –
                      </button>
                      <p className="min-w-[40px] text-center text-gray-800 font-semibold">
                        {item.quantity} {item.unit || "kg"}
                      </p>
                      <button
                        onClick={() => increaseQuantity(item._id)}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <p className="text-gray-800 font-semibold text-sm">
                      {currency}
                      {(item.offerPrice * item.quantity).toFixed(2)}
                    </p>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <CircleX size={22} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 💰 Order Summary */}
            <div className="bg-white shadow-lg rounded-2xl p-6 h-fit sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Order Summary
              </h2>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>
                    {currency}
                    {getCartTotal().toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p>Delivery</p>
                  <p className="text-green-600 font-medium">Free</p>
                </div>
                <hr className="my-2 border-gray-200" />
                <div className="flex justify-between font-semibold text-lg text-gray-800">
                  <p>Total</p>
                  <p>
                    {currency}
                    {getCartTotal().toFixed(2)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-6 bg-green-600 text-white py-3 rounded-full font-semibold uppercase tracking-wide hover:bg-green-700 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
