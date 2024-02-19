import React from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import CustomButton from "../buttons/CustomButton";
import {
  BiUserCircle,
  BiLogOut,
  BiSolidShoppingBagAlt,
  BiMenuAltRight,
} from "react-icons/bi";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { clearUserData } from "../../features/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userToken = localStorage.getItem("userToken"); //local storage bata userToken leko

  const userData = useSelector((state) => state.user.data);
  const cartItems = useSelector((state) => state.cart.products);

  const logoutClickHandler = () => {
    localStorage.removeItem("userToken");
    dispatch(clearUserData());
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <Separator type="horizontal" />
      <div style={styles.tabs}>
        <span onClick={() => navigate("/")} style={styles.pointer}>
          <img src={logo} style={styles.logo} />
        </span>
        <span onClick={() => navigate("/")} style={styles.pointer}>
          Home
        </span>
        <Separator />
        <span onClick={() => navigate("/shop")} style={styles.pointer}>
          Books
        </span>
        <Separator />
        <span onClick={() => navigate("/blog")} style={styles.pointer}>
          Blog
        </span>
        <Separator />
        <span style={styles.pointer}>
          <AiOutlineSearch size="25px" />
        </span>
      </div>
      <div style={styles.button}>
        <Separator />
        {userToken && (
          <>
            {userData && (
              <>
                {userData.role === "admin" && (
                  <>
                    <span onClick={() => navigate("/admindashboard")}>
                      <LuLayoutDashboard size={25} style={styles.pointer} />
                    </span>
                    <span onClick={logoutClickHandler}>
                      <BiLogOut size={25} style={styles.pointer} />
                    </span>
                  </>
                )}
                {userData.role === "user" && (
                  <>
                    <span
                      onClick={() => navigate("/cart")}
                      className="relative"
                    >
                      <span className="absolute top-0 right-0 bg-[#4C2B21] h-4 w-4 text-center text-white rounded-full text-xs ">
                        {cartItems.length}
                      </span>
                      <AiOutlineShoppingCart size={25} style={styles.pointer} />
                    </span>
                    <span onClick={() => navigate("/profile")}>
                      <BiUserCircle size={25} style={styles.pointer} />
                    </span>
                    <span onClick={logoutClickHandler}>
                      <BiLogOut size={25} style={styles.pointer} />
                    </span>
                  </>
                )}
              </>
            )}
          </>
        )}
        {!userToken && (
          <CustomButton name="Login" onClick={() => navigate("/login")} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;

const Separator = ({ type }) => {
  return type === "horizontal" ? (
    <span
      style={{
        position: "absolute",
        left: "50%",
        bottom: 0,
        transform: "translateX(-50%)",
        borderBottom: "2px solid black",
        width: "95%",
      }}
    />
  ) : (
    <div
      style={{
        width: "1.5px",
        height: "33px",
        backgroundColor: "black",
        margin: "0 15px",
      }}
    />
  );
};

const styles = {
  nav: {
    background: "#FDFBF7",
    height: "65px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: "0%",
    zIndex: 2,
    padding: "0 70px",
  },

  tabs: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    fontSize: "20px",
  },

  pointer: {
    cursor: "pointer",
  },

  logo: {
    height: "45px",
    width: "45px",
    borderRadius: "35px",
    // margin: "0 10px",
    boxShadow: " 0 2px 4px rgba(0, 0, 0, 0.7)",
  },

  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
};
