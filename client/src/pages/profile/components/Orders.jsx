import React, { useEffect, useState } from "react";
import { getUserOrder } from "../../../apis/order/getUserOrder";
import { useSelector } from "react-redux";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userData = useSelector((state) => state.user.data);
  const navigate= useNavigate();

  const fetchUserOrder = async () => {
    if (userData !== null) {
      const orderData = await getUserOrder(userData?._id);
      setOrders(orderData);
    }
  };

  useEffect(() => {
    fetchUserOrder();
  }, []);

  return (
    <div className="w-full">
      <div className="w-full my-2 flex flex-col gap-4 pt-10">
        <h1 className="flex text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2 items-center">
          My Orders
        </h1>
      </div>
      <div className="w-full h-[62vh] overflow-y-auto cool-scroll">
        <table className="w-full divide-y-2 divide-gray-200 bg-white text-sm ">
          <thead className="ltr:text-left rtl:text-right ">
            <tr className="text-[#4C2B21] font-bold">
              <th className="whitespace-nowrap px-4 py-2 ">S.N.</th>

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
                    <td className="whitespace-nowrap pl-10  py-5 text-center flex gap-6 items-center ">
                      <span className="cursor-pointer">
                        <FaArrowUpRightFromSquare
                          color="#4C2B21"
                          onClick={() => {navigate(`/profile/orders/details?orderId=${order._id}`)}}
                       />
                      </span>
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

export default Orders;
