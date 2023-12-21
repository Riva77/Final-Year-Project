import { useState } from "react";
import background from "../../assets/background.jpg";
import { CustomButton, TextInput } from "../../components";
import "../../styles/login.css";

const Login = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch(); //reducer use garera store ma data set garna help garxa

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForgotPassword = async () => {
    const email = formData.email;
    if (email === "") {
      toastError("Email field is empty!");
    } else {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      dispatch(setOTP(OTP));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // const response = await login(formData);

    // if (response.success) {
    //   const userToken = response.data.token;
    //   // console.log(jwtDecode(userToken));
    //   localStorage.setItem("userToken", userToken); //Key= "userToken", userToken= value. Aba get garni bela key matra chainxa
    //   toastSuccess("Logged in successfully!");
    //   navigate("/");
    // } else {
    //   toastError(response.error);
    // }
    // console.log("response", response);
  };
  return (
    <div className="container">
      <section
        // style={{ background: `url(${background})` }}
        className="bannerSection"
      ></section>
      <section className="formSection">
        <h1
          style={{
            color: "#4C2B21",
            // fontFamily: "Playfair display",
            fontSize: "30px",
          }}
        >
          Login
        </h1>
        <form className="login-form" onSubmit={submitHandler}>
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

          <CustomButton type="submit" name="Login" />
        </form>
        <div>
          <span className="nav-link" onClick={handleForgotPassword}>
            Forget Password?
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          Don't have an account?
          <span className="nav-link" onClick={() => navigate("/signup")}>
            Signup
          </span>
        </div>
      </section>
    </div>
  );
};

export default Login;
