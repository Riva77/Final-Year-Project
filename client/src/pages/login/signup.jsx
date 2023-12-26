import { CustomButton, TextInput } from "../../components";
import background from "../../assets/background.jpg";
import "../../styles/signup.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signup } from "../../apis/signup";
import { toastError, toastSuccess } from "../../utils/toast";

const Signup = () => {
  const navigate = useNavigate();

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
      if (response.success) {
        toastSuccess("User registered successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
      }
      console.log("response", response);
    }
  };
  return (
    <div className="container">
      <section
        style={{ background: `url(${background})` }}
        className="bannerSection"
      >
        {/* <img src={login} alt="books" /> */}
        {/* <div>
          <img src="Logo" alt="hehe" />
        </div> */}
      </section>
      <section className="formSection">
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
          <span className="nav-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </div>
      </section>
    </div>
  );
};

export default Signup;
