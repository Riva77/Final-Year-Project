import React from "react";
import { deleteProduct } from "../../apis/product/deleteProduct";
import { toastSuccess, toastError } from "../../utils/toast";
import { useDispatch } from "react-redux";
import { setProductModal } from "../../features/modalSlice"; // Import action creators
import { setProduct } from "../../features/selectedProductSlice";
import { fetchProductData } from "../../features/productSlice";

const Table = ({ items }) => {
  const dispatch = useDispatch();
  const handleEditProduct = async (product) => {
    // dispatch(setProductModal());
    dispatch(setProduct(product));
  };

  const handleDeleteProduct = async (productId) => {
    const response = await deleteProduct(productId);
    if (response.success) {
      dispatch(fetchProductData());
      toastSuccess(response.data.message);
    } else {
      toastError(response.error);
    }
  };

  return (
    <div className="w-full">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              S.N.
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Price
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Quantity
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Author
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Genre
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {items?.map((item, index) => {
            return (
              <tr key={item._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  {item.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  {item.price}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  {item.quantity}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  {item.author.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  {item.genre}
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  <span
                    onClick={() => handleEditProduct(item)}
                    className="text-blue-500 hover:text-blue-700 mr-2 cursor-pointer"
                  >
                    Edit
                  </span>
                  <span
                    onClick={() => handleDeleteProduct(item._id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    Delete
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
