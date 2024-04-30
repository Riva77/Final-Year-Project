import React, { useEffect, useState } from "react";
import { getOrder } from "../../../apis/order/getOrder";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const [details, setDetails] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("");

  const fetchOrder = async () => {
    const orderData = await getOrder();
    setOrders(orderData);
  };

  useEffect(() => {
    
    fetchOrder();
  }, []);

  const handleViewDetails = (orderId) => {
    setDetails(!details);
    setSelectedOrder(orderId);
  };
  console.log(orders)
  return (
    
    <div className="w-full">
      <div className="w-full flex flex-col gap-4 ">
        <h1 className="flex text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2 items-center">
          Orders
        </h1>
      </div>
      <div className="w-full h-[62vh] overflow-y-auto cool-scroll">
        <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm ">
          <thead className="ltr:text-left rtl:text-right ">
            <tr className="text-[#4C2B21] font-bold">
              <th className="whitespace-nowrap px-4 py-2 ">S.N.</th>
              <th className="whitespace-nowrap px-4 py-2 ">Users</th>
              <th className="whitespace-nowrap px-4 py-2 ">Products</th>
              <th className="whitespace-nowrap px-4 py-2 ">Total Price</th>
              <th className="whitespace-nowrap px-4 py-2 ">Payment Status</th>
              <th className="whitespace-nowrap px-4 py-2 ">Payment Type</th>
              <th className="whitespace-nowrap px-4 py-2 ">Order Status</th>
              <th className="whitespace-nowrap px-4 py-2">View</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {orders?.map((order, index) => {
              return (
                <>
                  <tr key={order._id}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      {order.customer?.firstName +" "+ order.customer?.lastName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                    {order.products.map((product, index) => {
                        if (index === 0) {
                          // Display the name of the first product
                          return <span>{product.product.name}</span>;
                        } else {
                          // For subsequent products, don't display the name
                          return null;
                        }
                      })}
                      {order.products.length > 1 && (
                        <span>, and {order.products.length - 1} other</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      {order.totalPrice}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      {order.paymentStatus}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      {order.paymentType}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      {order.status}
                    </td>
                    <td className="whitespace-nowrap px-10 py-5 text-center flex gap-6 items-center ">
                      {details ? (
                        <IoIosArrowUp
                          color="#EF4343"
                          onClick={() => handleViewDetails(order._id)}
                        />
                      ) : (
                        <IoIosArrowDown
                          color="#EF4343"
                          onClick={() => handleViewDetails(order._id)}
                        />
                      )}
                    </td>
                  </tr>
                  <tr
                    className={`transition-max-height-fast transition-opacity-fast ${
                      details && selectedOrder === order._id
                        ? "max-h-20 opacity-100"
                        : "max-h-0 opacity-0 hidden"
                    } overflow-hidden`}
                  >
                    <td colSpan="4">
                      <div className="flex flex-col text-secondary bg-accent w-full rounded-b-lg px-6 py-4 relative mb-3 gap-3"></div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
