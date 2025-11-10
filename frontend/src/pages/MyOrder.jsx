import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
const MyOrder = () => {
  const { currency, axios, user } = useContext(AppContext);
  const [myOrders, setMyOrders] = useState([]);
  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/my-orders");
      console.log(data);

      if (data.success) {
        setMyOrders(data.orders);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);
  return (
    <div className="py-12 ">
      <h1 className="text-3xl font-bold text-center">My Orders</h1>     {" "}
      <div className="border border-gray-400 max-w-5xl mx-auto p-3 mt-5">
               {" "}
        {/* Adjusting header grid: 4 columns on mobile, 5 columns on sm+ */}   
           {" "}
        <div className="grid grid-cols-4 sm:grid-cols-5 font-semibold text-gray-700 ">
                    <div>Order ID</div>          <div>Amount</div>         {" "}
          <div className="hidden sm:block">Payment</div>{" "}
          {/* Hidden on mobile */}          <div>Status</div>         {" "}
          <div>Date</div>       {" "}
        </div>
                <hr className="w-full my-4 text-gray-200" />       {" "}
        <ul className="space-y-3">
                   {" "}
          {myOrders.map((item) => (
            <li key={item._id}>
                           {" "}
              {/* Adjusting item grid: 4 columns on mobile, 5 columns on sm+ */}
                           {" "}
              <div className="grid grid-cols-4 sm:grid-cols-5 items-center text-gray-800">
                               {" "}
                <p className="text-sm font-mono">
                                    #{item._id.slice(-6).toUpperCase()}         
                       {" "}
                </p>
                                {/* Total Amount */}               {" "}
                <p className="font-semibold">
                                    {currency}                 {" "}
                  {item.totalAmount}               {" "}
                </p>
                                {/* Payment Method (Hidden on mobile) */}       
                       {" "}
                <p className="capitalize hidden sm:block">
                  {item.paymentMethod}
                </p>
                                {/* Status with color badge */}               {" "}
                <div className="flex">
                                   {" "}
                  <span
                    className={`px-2 py-0.5 text-[10px] rounded-full font-medium text-white w-fit
                          ${item.status === "Pending" && "bg-yellow-500"}
                          ${item.status === "Processing" && "bg-blue-500"}
                          ${item.status === "Shipped" && "bg-indigo-500"}
                          ${item.status === "Delivered" && "bg-green-600"}
                          ${item.status === "Cancelled" && "bg-red-500"}
                        `}
                  >
                                        {item.status}                 {" "}
                  </span>
                                 {" "}
                </div>
                                {/* Created Date */}               {" "}
                <p className="text-[10px]">
                                   {" "}
                  {new Date(item.createdAt).toLocaleDateString()}               {" "}
                </p>
                             {" "}
              </div>
                            <hr className="w-full mt-3 text-gray-200" />       
                 {" "}
            </li>
          ))}
                 {" "}
        </ul>
             {" "}
      </div>
         {" "}
    </div>
  );
};
export default MyOrder;
