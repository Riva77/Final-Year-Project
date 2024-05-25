import { IoClose } from "react-icons/io5";
import { setViewOrderModal } from "../../../features/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../components/spinner/spinner";
import { formatDate } from "../../../utils/helper";
import { clearProduct } from "../../../features/selectedProductSlice";
import { AiOutlineClose } from "react-icons/ai";
import CustomButton from "../../../components/buttons/CustomButton";
import axios from "axios";
import { toastError, toastSuccess } from "../../../utils/toast";

const ViewOrderModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setViewOrderModal());
    dispatch(clearProduct());
  };

  const orderDetails = useSelector((state) => state.selectedProduct.data);

  const handleUpdateStatus = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/updateOrderStatus/${id}`
      );
      if (response?.status === 200) {
        toastSuccess(response?.data.message);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating order:", error);
      toastError("Internal server error");
    }
  };

  if (!orderDetails) {
    return <Spinner />;
  }

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } absolute bg-gray-200 bg-opacity-80 z-40  flex items-center justify-center w-screen h-screen`}
    >
      <div className="bg-white border rounded-lg shadow-lg px-6 py-8 w-auto mx-auto mt-8 relative">
        <span
          className="absolute top-3 right-3 cursor-pointer"
          onClick={handleClick}
        >
          <AiOutlineClose size={20} color="gray" />
        </span>
        <h1
          className="font-bold text-2xl my-4 text-center"
          style={{ color: "#4C2B21" }}
        >
          Order Details
        </h1>
        <hr className="mb-2" />
        <div className="flex">
          <div className="mr-4">
            <div className="flex justify-between mb-6">
              <div className="text-gray-700">
                <div>Date: {formatDate(orderDetails?.orderDate)}</div>
                <div>Order Id: {orderDetails._id}</div>
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4">Customer:</h2>
              <div className="text-gray-700 mb-2">
                {orderDetails?.customer?.firstName +
                  " " +
                  orderDetails?.customer?.lastName}
              </div>

              <div className="text-gray-700 mb-2">{orderDetails?.district}</div>
              <div className="text-gray-700">
                {orderDetails?.customer?.email}
              </div>
            </div>

            <table className="w-full mb-8 mr-4 overflow-x-hidden">
              <thead>
                <tr>
                  <th className="text-left font-bold text-gray-700">Product</th>
                  <th className="text-left font-bold text-gray-700">
                    Quantity
                  </th>
                  <th className="text-right font-bold text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.products?.map((item, index) => (
                  <tr key={index}>
                    <td className="text-left text-gray-700">
                      {item.product.name}
                    </td>
                    <td className="text-gray-700 text-center">
                      {item.quantity}
                    </td>
                    <td className="text-right text-gray-700">
                      Rs.{item.product.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <hr className="mt-4 w-full" />
                <tr>
                  <td className="text-left font-bold text-gray-700">Total</td>
                  <td className="text-left font-bold text-gray-700"></td>
                  <td className="text-right font-bold text-gray-700">
                    Rs.{orderDetails.totalPrice}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex flex-col items-center justify-center  pl-4 border-l-2 border-solid-grey gap-5">
            <h3 className="text-lg font-bold">Order Status</h3>
            <span
              className={`${
                orderDetails.status === "Received"
                  ? "bg-yellow-300"
                  : orderDetails.status === "Processing"
                  ? "bg-orange-300"
                  : "bg-green-300"
              } px-4 py-1 rounded-full font-semibold`}
            >
              {orderDetails.status}
            </span>
            {orderDetails.status !== "Delivered" && (
              <CustomButton
                name={"Update Status"}
                onClick={() => handleUpdateStatus(orderDetails._id)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;
