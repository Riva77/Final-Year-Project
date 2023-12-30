import { useState } from "react";
import TextInput from "../../../components/inputField/TextInput";
import CustomButton from "../../../components/buttons/CustomButton";
import { toastSuccess, toastError } from "../../../utils/toast";
import { addAuthor } from "../../../apis/Author/addAuthor";

// import { PostRequest } from "../../../services/httpRequest";

const AddAuthor = () => {
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
    <div className="flex flex-col w-full gap-10 items-center">
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
  );
};

export default AddAuthor;
