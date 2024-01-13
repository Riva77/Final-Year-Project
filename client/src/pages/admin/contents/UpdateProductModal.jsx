import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import CustomButton from "../../../components/buttons/CustomButton";
import { useEffect, useState, useCallback } from "react";
import { toastError, toastSuccess } from "../../../utils/toast";
import TextInput from "../../../components/inputField/TextInput";
import TextArea from "../../../components/inputField/TextArea";
import { setProductModal } from "../../../features/modalSlice";
import Dropdown from "../../../components/sliderAndDropdown/Dropdown";
import FileInput from "../../../components/inputField/FileInput";
import { getAuthor } from "../../../apis/Author/getAuthor";
import { getGenre } from "../../../apis/Genre/getGenre";
import { addProduct } from "../../../apis/product/addProduct";
import axios from "axios";

const UpdateProductModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setProductModal());
  };

  // const productData = useSelector((state) => state.product.data);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    quantity: "",
    image: "",
    author: "",
    synopsis: "",
    genre: "",
    pages: "",
  });

  // useEffect(() => {
  //   setFormData({
  //     name: productData?.name,
  //     price: productData?.price,
  //     quantity: productData?.quantity,
  //     description: productData?.description,
  //   });
  // }, [productData]);

  const [file, setFile] = useState({
    preview: "",
    data: "",
  });

  const [author, setAuthor] = useState(null);
  const [genre, setGenre] = useState(null);

  const fetchAuthor = async () => {
    const authorData = await getAuthor();
    setAuthor(authorData?.data);
  };

  const fetchGenre = async () => {
    const genreData = await getGenre();
    setGenre(genreData?.data);
  };

  useEffect(() => {
    fetchAuthor();
    fetchGenre();
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    // const name = file.name;
    if (!file) {
      toastError("Please select a file");
    }

    setFile({
      preview: URL.createObjectURL(file),
      data: file,
    });
    console.log(file);
  }, []);

    //Image cloudinary ma upload garni
    const cloudinaryUpload = async (form) => {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/cloudinary",
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response;
        
      } catch (error) {
        if (
          error.response &&
          error.response?.status >= 400 &&
          error.response?.status <= 500
        ) {
          return {
            success: false,
            error: error.response.data.message || error.response.data,
          };
        }
      }
      
    };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("file", file.data);

    const cloudinaryResponse = await cloudinaryUpload(form); //vako img file lai cloudinary ma upload gareko
    console.log(cloudinaryResponse); //just check garya

    if (cloudinaryResponse.status === 200) {
      console.log(formData);

      // Cloudinary bata return aako response url lai form data ko img ma assign/save garya (string ma kina vani backend ma img string ma save hunxa)
      if (cloudinaryResponse.data.url) {
        formData.image = cloudinaryResponse.data.url;
      }
      const response = await addProduct(formData);
      if (response.success) {
        toastSuccess("Product Added Successfully");
        setFile({ data: "", preview: "" });
        setFormData({
          name: "",
          price: "",
          description: "",
          quantity: "",
          image: "",
          author: "",
          synopsis: "",
          genre: "",
          pages: "",
        });
      } else {
        toastError(response.error);
      }

      console.log("response", response);
    } else {
      toastError("Cloudinary upload failed");
      console.log("error");
    }
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
          <AiOutlineClose size={20} color="gray"  />
        </span>
        <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
        Add Books
      </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex gap-5">
          <TextInput
            type="text"
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
          />
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
        <div className="flex gap-5 items-center">
          <TextInput
            type="number"
            name="pages"
            label="Pages"
            value={formData.pages}
            min={1}
            onChange={handleChange}
          />
          <Dropdown
            items={author}
            label="Author"
            value={formData.author}
            name={"author"}
            onChange={handleChange}
          />
          <Dropdown
            items={genre}
            label="Genre"
            value={formData.genre}
            name={"genre"}
            onChange={handleChange}
          />
        </div>
        <FileInput
          type="file"
          label="Product Image"
          name="productImage"
          onChange={handleFileChange}
          style={{ width: "400px" }}
        />
        <TextArea
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <TextArea
          name="synopsis"
          label="Synopsis"
          value={formData.synopsis}
          onChange={handleChange}
        />
        <div className="flex justify-center mt-3">
          <CustomButton title="Add Product" name="Add" />
        </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
