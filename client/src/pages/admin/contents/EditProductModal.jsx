import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getAuthor } from "../../../apis/Author/getAuthor";
import { getGenre } from "../../../apis/Genre/getGenre";
import { updateProduct } from "../../../apis/product/updateProduct";
import CustomButton from "../../../components/buttons/CustomButton";
import TextInput from "../../../components/inputField/TextInput";
import { fetchProductData } from "../../../features/productSlice";
import { clearProduct } from "../../../features/selectedProductSlice";
import { toastError, toastSuccess } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";

const EditProductModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(clearProduct());
  };

  const navigate=useNavigate();

  const selectedProduct = useSelector((state) => state.selectedProduct.data);

  const [formData, setFormData] = useState({
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        ...formData,
        price: selectedProduct.price,
        quantity: selectedProduct.quantity,
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateProduct(selectedProduct._id, formData);
    if (response.success) {
      toastSuccess("Product Updated Successfully");
      dispatch(fetchProductData()); 
      dispatch(clearProduct())
      // navigate("/admin/products")
      setFormData({
        price: "",
        quantity: "",
      });
    } else {
      toastError(response.error);
    }

    console.log("response", response);
  };

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } absolute bg-gray-200 bg-opacity-80 z-40  flex items-center justify-center w-screen h-screen`}
    >
      <div className="relative shadow-md  rounded-lg min-w-fit h-auto bg-[#FDFBF7] px-8 py-8">
        <span
          className="absolute top-3 right-3 cursor-pointer"
          onClick={handleClick}
        >
          <AiOutlineClose size={20} color="gray" />
        </span>
        <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
          Update Books
        </h1>
     
        <span>{JSON.stringify(formData)}</span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex gap-5">
            <TextInput
              type="number"
              name="price"
              label="Price"
              value={formData.price}
              min={1}
              onChange={handleChange}
            />
            <TextInput
              type="number"
              name="quantity"
              label="Quantity"
              value={formData.quantity}
              min={1}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center mt-3">
            <CustomButton title="Add Product" name="Update" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
