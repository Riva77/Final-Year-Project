import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import CustomButton from "../../../components/buttons/CustomButton";
import { useCallback, useState } from "react";
import { toastError, toastSuccess } from "../../../utils/toast";
import TextInput from "../../../components/inputField/TextInput";
import { setAuthorModal } from "../../../features/modalSlice";
import { addAuthor } from "../../../apis/Author/addAuthor";
import FileInput from "../../../components/inputField/FileInput";
import axios from "axios";

const UpdateAuthorModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setAuthorModal());
  };

  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const [file, setFile] = useState({
    preview: "",
    data: "",
  });

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
      const response = await addAuthor(formData);
      if (response.success) {
        toastSuccess("Author Added Successfully");
        setFile({ data: "", preview: "" });
        setFormData({
          name: "",
          image: "",
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
          <AiOutlineClose size={20} color="gray" />
        </span>
        <h1 className="text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2">
          Add Author
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
            <FileInput
              type="file"
              label="Author Image"
              name="authorImage"
              onChange={handleFileChange}
              style={{ width: "400px" }}
            />
          </div>
          <div className="flex justify-center mt-3">
            <CustomButton title="Add Ingredient" name="Add" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAuthorModal;
