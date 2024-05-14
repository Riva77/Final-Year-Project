import { IoClose } from "react-icons/io5";
import { setViewOrderModal } from "../../../features/modalSlice";
import { useDispatch } from "react-redux";

const ViewOrderModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setViewOrderModal());
  };

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } absolute bg-gray-200 bg-opacity-80 z-40  flex items-center justify-center w-screen h-screen`}
    >
      {/* <div className="relative shadow-md  rounded-lg min-w-fit h-auto bg-[#FDFBF7] px-8 py-8">
        <span className="absolute top-1 right-1">
          {" "}
          <IoClose size={25} onClick={handleClick} />
        </span>
        <div className="bg-white border rounded-lg shadow-lg px-6 py-8 w-auto mx-auto mt-8">
          <h1
            className="font-bold text-2xl my-4 text-center"
            style={{ color: "#4C2B21" }}
          >
            Books & R
          </h1>

          <hr className="mb-2" />
          <div className="flex justify-between mb-6">
            <h1 className="text-lg font-bold mr-10">Invoice</h1>
            <div className="text-gray-700">
              <div>Date: {formatDate(orderDetails?.orderDate)}</div>
              <div>Order Id: {orderId}</div>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Bill To:</h2>
            <div className="text-gray-700 mb-2">
              {orderDetails?.customer?.firstName +
                " " +
                orderDetails?.customer?.lastName}
            </div>
            <div className="text-gray-700 mb-2">
              {orderDetails?.address + " - " + orderDetails?.wardNumber}
            </div>
            <div className="text-gray-700 mb-2">{orderDetails?.district}</div>
            <div className="text-gray-700">{orderDetails?.customer?.email}</div>
          </div>
          <table className="w-full mb-8">
            <thead>
              <tr>
                <th className="text-left font-bold text-gray-700">Product</th>
                <th className="text-left font-bold text-gray-700">Quantity</th>
                <th className="text-right font-bold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.products?.map((item, index) => (
                <tr key={index}>
                  <td className="text-left text-gray-700">
                    {item.product.name}
                  </td>
                  <td className="text-gray-700 text-center">{item.quantity}</td>
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
          <div className="text-gray-700 mb-2">Thank you for your order!</div>
        </div>
      </div> */}
    </div>
  );
};

export default ViewOrderModal;
