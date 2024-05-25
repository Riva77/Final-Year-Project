// import { CustomButton } from "../../../components";

// const AccountSettings = () => {

//   return (
//     <div>

//       <div className="w-full my-2 flex flex-col gap-4 pt-10">
//         <h1 className="flex text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2 items-center">
//           Change Password
//         </h1>
//       </div>

//       <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
//         <div className="rounded shadow p-6">
//           <div className="pb-6">
//             <label className="font-semibold text-gray-700 block pb-1">
//               Current Password
//             </label>
//             <div className="flex">
//               <input
//                 disabled
//                 id="firstname"
//                 className="border-1 rounded-r px-4 py-2 w-full"
//                 type="text"
//                 value=""
//               />
//             </div>
//           </div>
//           <div className="pb-6">
//             <label className="font-semibold text-gray-700 block pb-1">
//               New Password
//             </label>
//             <div className="flex">
//               <input
//                 disabled
//                 id="lastname"
//                 className="border-1 rounded-r px-4 py-2 w-full"
//                 type="text"
//                 value=""
//               />
//             </div>
//           </div>
//           <div className="pb-4">
//             <label className="font-semibold text-gray-700 block pb-1">
//               Confirm Password
//             </label>
//             <input
//               disabled
//               id="email"
//               className="border-1 rounded-r px-4 py-2 w-full"
//               type="email"
//               value=""
//             />
//             <div className="flex items-center gap-48 cursor-pointer ">
//             <CustomButton name="Submit" />

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountSettings;

import { useState } from "react";
import { CustomButton } from "../../../components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toastError, toastSuccess } from "../../../utils/toast";
import { fetchUserData } from "../../../features/authSlice";

const AccountSettings = () => {
  const user = useSelector((state) => state.user.data);

  const dispatch = useDispatch();

  const initialFormData = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const initialProfileFormData = {
    firstName: "",
    lastName: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [profileFormData, setProfileFormData] = useState(
    initialProfileFormData
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // check if the new  passowrd has capital letter, small letter, number and special character
      for (const key in formData) {
        if (formData[key].trim() === "") {
          toastError("Password cannot only contain empty spaces!");
          return;
        }
      }
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (!regex.test(formData.newPassword)) {
        toastError(
          "Password must contain at least one capital letter, one small letter, one number and one special character"
        );
        return;
      }
      const response = await axios.patch(
        `http://localhost:8000/api/changePassword/${user?._id}`,
        formData
      );
      if (response.data) {
        toastSuccess("Password changed successfully!");
        setFormData(initialFormData);
      }
      console.log(response.data);
      // Handle success, maybe redirect user or show a success message
    } catch (error) {
      toastError(error.response?.data.message);
      console.error(error);
      // Handle error, maybe show an error message to the user
    }
  };

  const editHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/editProfile/${user?._id}`,
        profileFormData
      );
      if (response.data) {
        toastSuccess("Profile edited successfully!");
        setProfileFormData(initialProfileFormData);
        dispatch(fetchUserData(user?._id));
      }
      console.log(response.data);
      // Handle success, maybe redirect user or show a success message
    } catch (error) {
      toastError(error.response?.data.message);
      console.error(error);
      // Handle error, maybe show an error message to the user
    }
  };
  const editHandleChange = (e) => {
    setProfileFormData({ ...profileFormData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="w-full my-2 flex flex-col gap-4 pt-10">
        <h1 className="flex text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2 items-center">
          Edit Profile
        </h1>
      </div>

      <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
        <form onSubmit={editHandleSubmit}>
          <div className="rounded shadow p-6">
            <div className="pb-6">
              <label className="font-semibold text-gray-700 block pb-1">
                First Name
              </label>
              <div className="flex">
                <input
                  name="firstName"
                  className="border-1 rounded-r px-4 py-2 w-full"
                  type="text"
                  value={profileFormData.firstName}
                  onChange={editHandleChange}
                />
              </div>
            </div>
            <div className="pb-6">
              <label className="font-semibold text-gray-700 block pb-1">
                Last Name
              </label>
              <div className="flex">
                <input
                  name="lastName"
                  className="border-1 rounded-r px-4 py-2 w-full"
                  type="text"
                  value={profileFormData.lastName}
                  onChange={editHandleChange}
                />
              </div>
            </div>
            <div className="flex items-center gap-48 cursor-pointer">
              <CustomButton type="submit" name="Submit" />
            </div>
          </div>
        </form>
      </div>

      <div className="w-full my-2 flex flex-col gap-4 pt-10">
        <h1 className="flex text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2 items-center">
          Change Password
        </h1>
      </div>

      <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="rounded shadow p-6">
            <div className="pb-6">
              <label className="font-semibold text-gray-700 block pb-1">
                Current Password
              </label>
              <div className="flex">
                <input
                  name="currentPassword"
                  className="border-1 rounded-r px-4 py-2 w-full"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="pb-6">
              <label className="font-semibold text-gray-700 block pb-1">
                New Password
              </label>
              <div className="flex">
                <input
                  name="newPassword"
                  className="border-1 rounded-r px-4 py-2 w-full"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="pb-4">
              <label className="font-semibold text-gray-700 block pb-1">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                className="border-1 rounded-r px-4 py-2 w-full"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center gap-48 cursor-pointer">
              <CustomButton type="submit" name="Submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
