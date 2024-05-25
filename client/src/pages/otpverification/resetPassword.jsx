import { CustomButton, TextInput } from "../../components";
import { useState } from "react";
import { toastError, toastSuccess } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const ResetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const email = new URLSearchParams(window.location.search).get(
    "email"
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkPasswordMatch = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toastError("Password did not match!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...formDataRequest } = formData;
    if (checkPasswordMatch()) {
        console.log(email)
      try {
        const response = await axios.put(
          `http://localhost:8000/api/resetpassword/${email}`,
          formDataRequest
        );
        if (response.status === 200) {
          toastSuccess("Password changed successfully.");
          navigate("/login");
        }
        console.log("response", response);
      } catch (error) {
        toastError(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <section className="bg-gray-50 w-screen ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl flex flex-col items-center justify-center gap-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Change Password
            </h2>
            <form
              className="mt-2 flex flex-col justify-center items-center gap-7 mb-3"
              onSubmit={handleSubmit}
            >
              <TextInput
                type="password"
                name="newPassword"
                label="New Password"
                value={formData.newPassword}
                onChange={handleChange}
              />
              <TextInput
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <CustomButton name="Submit" />
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
