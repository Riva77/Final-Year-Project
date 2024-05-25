import { CustomButton, TextInput } from "../../components";
import background from "../../assets/background.jpg";
import "../../styles/signup.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signup } from "../../apis/authentication/signup";
import { toastError, toastSuccess } from "../../utils/toast";
import { setOTP } from "../../features/otpSlice";
import { useDispatch } from "react-redux";
import { HiHome } from "react-icons/hi2";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkPasswordMatch = () => {
    if (formData.password !== formData.confirmPassword) {
      toastError("Password did not match!");
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (checkPasswordMatch()) {
      const response = await signup(formData);
      console.log(response);
      if (response.success) {
        dispatch(setOTP(response.data.OTP));
        navigate(`/otpVerification?email=${formData.email}`);
      } else {
        toastError(response.error);
      }
      console.log("response", response);
    }
  };
  return (
    <div className="container">
      <section
        style={{ background: `url(${background})` }}
        className="bannerSection"
      ></section>
      <section className="formSection">
        <span
          className="absolute top-5 right-5 flex gap-2 cursor-pointer hover:text-[#4C2B21]"
          onClick={() => navigate("/")}
        >
          <HiHome size={20} /> Home
        </span>
        <h1
          style={{
            color: "#4C2B21",
            // fontFamily: "Playfair display",
            fontSize: "30px",
          }}
        >
          Signup
        </h1>
        <form className="login-form" onSubmit={submitHandler}>
          <TextInput
            type="text"
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={changeHandler}
          />
          <TextInput
            type="text"
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={changeHandler}
          />
          <TextInput
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={changeHandler}
          />
          <TextInput
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={changeHandler}
          />
          <TextInput
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={changeHandler}
          />
          <CustomButton type="submit" name="Signup" />
        </form>
        <div style={{ display: "flex", gap: 8 }}>
          Already have an account?
          <span
            className="nav-link cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </section>
    </div>
  );
};

export default Signup;
