import { useCallback, useState } from "react";
import TextInput from "../../../components/inputField/TextInput";
import TextArea from "../../../components/inputField/TextArea";
import CustomButton from "../../../components/buttons/CustomButton";
import { toastSuccess, toastError } from "../../../utils/toast";
import { addProduct } from "../../../apis/product/addProduct";
import ItemsDropdown from "../../../components/sliderAndDropdown/ItemsDropdown";
import FileInput from "../../../components/inputField/FileInput";
// import { PostRequest } from "../../../services/httpRequest";

const AddProduct = () => {
  const ingredientTypes = [
    {
      id: "1",
      label: "Pizza Base",
      value: "pizzaBase",
    },
    {
      id: "2",
      label: "Cheese",
      value: "cheese",
    },
    {
      id: "3",
      label: "Sauce",
      value: "sauce",
    },
    {
      id: "4",
      label: "Veggies",
      value: "veggies",
    },
    {
      id: "5",
      label: "Meat",
      value: "meat",
    },
  ];

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

  const [file, setFile] = useState({
    preview: "",
    data: "",
  });

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
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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
        toastSuccess(response.message);
        setFormData(initialFormData);
        setFile({ data: "", preview: "" });
      } else {
        toastError(response.error);
      }
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
      console.log("response", response);
    } else {
      toastError("Cloudinary upload failed");
      console.log("error");
    }
  };

  return (
    <div className="flex flex-col w-full gap-10 items-center">
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
          {/* <ItemsDropdown
            // options={ingredientTypes}
            // // value={currentExtension}
            // onChange={(event) => {
            //   setCurrentExtension(event);
            //   setFormData({ ...formData, type: event.value });
            // }}
          />
          <ItemsDropdown
            // options={ingredientTypes}
            // // value={currentExtension}
            // onChange={(event) => {
            //   setCurrentExtension(event);
            //   setFormData({ ...formData, type: event.value });
            // }}
          /> */}
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
          <CustomButton title="Add Ingredient" name="Add" />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
