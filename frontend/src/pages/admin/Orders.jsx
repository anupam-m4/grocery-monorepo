// import { useContext, useState, useEffect } from "react";
// import { AppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";
// const Orders = () => {
//   const { currency, axios, admin } = useContext(AppContext);
//   const [myOrders, setMyOrders] = useState([]);
//   const fetchOrders = async () => {
//     try {
//       const { data } = await axios.get("/api/order/all");
//       console.log(data);

//       if (data.success) {
//         setMyOrders(data.orders);
//       } else {
//         console.log(data.message);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
//   useEffect(() => {
//     if (admin) {
//       fetchOrders();
//     }
//   }, []);

//   const updateOrderStatus = async (id, status) => {
//     try {
//       const { data } = await axios.put(`/api/order/status/${id}`, { status });
//       if (data.success) {
//         toast.success("Updated");
//         toast.success(data.message);
//         fetchOrders();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   return (
//     <div className="py-12">
//       <h1 className="text-3xl font-bold">All Orders</h1>
//       <div className="border border-gray-400 max-w-5xl mx-auto p-3">
//         <div className="grid grid-cols-6 font-semibold text-gray-700">
//           <div>Name</div>
//           <div>Email</div>
//           <div>Address</div>
//           <div>Amount</div>
//           <div>Payment Method</div>
//           <div>Status</div>
//         </div>
//         <hr className="w-full my-4 text-gray-200" />
//         {myOrders.length > 0 ? (
//           myOrders.map((item) => (
//             <div
//               key={item._id}
//               className="grid grid-cols-6 items-center text-sm bg-white p-2 mb-2 rounded-lg shadow-sm"
//             >
//               <p>{item.user?.name}</p>
//               <p>{item.user?.email}</p>
//               <p className="text-gray-600">
//                 {item.address.name}, {item.address.city}, {item.address.state},{" "}
//                 {item.address.country} ({item.address.zipCode})
//               </p>
//               <p className="font-semibold ml-5">${item.totalAmount}</p>
//               <p className="capitalize">{item.paymentMethod}</p>

//               <select
//                 value={item.status}
//                 onChange={(e) => updateOrderStatus(item._id, e.target.value)}
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="Processing">Processing</option>
//                 <option value="Shipped">Shipped</option>
//                 <option value="Delivered">Delivered</option>
//                 <option value="Cancelled">Cancelled</option>
//               </select>
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500">No orders found.</p>
//         )}
//       </div>
//     </div>
//   );
// };
// export default Orders;


import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
const Orders = () => {
  const { currency, axios, admin } = useContext(AppContext);
  const [myOrders, setMyOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/all");
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
    if (admin) {
      fetchOrders();
    }
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      const { data } = await axios.put(`/api/order/status/${id}`, { status });
      if (data.success) {
        toast.success("Updated");
        toast.success(data.message);
        fetchOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold">All Orders</h1>
      <div className="border border-gray-400 max-w-5xl mx-auto p-3">
        {/* Grid Header: 3 columns on mobile (Name, Payment, Status), 6 on sm+ */}
        <div className="grid grid-cols-3 sm:grid-cols-6 font-semibold text-gray-700">
          <div>Name</div>
          <div className="hidden sm:block">Email</div>
          <div className="hidden sm:block">Address</div>
          <div className="hidden sm:block">Amount</div>
          <div>Payment Method</div>
          <div>Status</div>
        </div>
        <hr className="w-full my-4 text-gray-200" />
        {myOrders.length > 0 ? (
          myOrders.map((item) => (
            <div
              key={item._id}
              
              className="grid grid-cols-3 sm:grid-cols-6 items-center text-sm bg-white p-2 mb-2 rounded-lg shadow-sm"
            >
              {/* Name - KEPT on mobile */}
              <p>{item.user?.name}</p>
              
              {/* Email - HIDDEN on mobile */}
              <p className="hidden sm:block">{item.user?.email}</p>
              
              {/* Address - HIDDEN on mobile */}
              <p className="text-gray-600 hidden sm:block">
                {item.address.name}, {item.address.city}, {item.address.state},{" "}
                {item.address.country} ({item.address.zipCode})
              </p>
              
              {/* Amount - HIDDEN on mobile */}
              <p className="font-semibold ml-5 hidden sm:block">${item.totalAmount}</p>
              
              {/* Payment Method - KEPT on mobile */}
              <p className="capitalize">{item.paymentMethod}</p>

              {/* Status - KEPT on mobile */}
              <select
                value={item.status}
                onChange={(e) => updateOrderStatus(item._id, e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};
export default Orders;
