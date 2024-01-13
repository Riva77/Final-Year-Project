import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import CustomButton from "../../../components/buttons/CustomButton";
import {useState} from "react";
import { toastError, toastSuccess } from "../../../utils/toast";
import TextInput from "../../../components/inputField/TextInput";
import { setAuthorModal } from "../../../features/modalSlice";
import { addAuthor } from "../../../apis/Author/addAuthor";


const UpdateAuthorModal = ({ isOpen }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setAuthorModal());
  };

  const [formData, setFormData] = useState({
    name: "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await addAuthor(formData);
      console.log(response);

      if (response.success) {
        toastSuccess("Author added successfully!");

        // Reset the form data
        setFormData({
          name: "",
        });
      } else {
        toastError(response.error);
      }

      console.log("response", response);
    } catch (error) {
      console.error("An error occurred:", error);
      toastError("An error occurred while adding the author.");
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
