import React, { useRef } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import CustomButton from "../buttons/CustomButton";
import { BiBookAlt, BiLogOut } from "react-icons/bi";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { clearUserData } from "../../features/authSlice";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaRegBookmark } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import SearchResult from "../sliderAndDropdown/SearchResult";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const userToken = localStorage.getItem("userToken"); //local storage bata userToken leko

  const userData = useSelector((state) => state.user.data);
  const cartItems = useSelector((state) => state.cart.products);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logoutClickHandler = () => {
    localStorage.clear();
    dispatch(clearUserData());
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <Separator type="horizontal" />
      {userData?.role !== "admin" ? (
        <div style={styles.tabs}>
          <span onClick={() => navigate("/")} style={styles.pointer}>
            <img src={logo} style={styles.logo} />
          </span>
          <span onClick={() => navigate("/")} style={styles.pointer}>
            Home
          </span>
          <Separator />
          <span onClick={() => navigate("/shop/All")} style={styles.pointer}>
            Books
          </span>
          <Separator />
          <span onClick={() => navigate("/blog")} style={styles.pointer}>
            Blog
          </span>
          <Separator />
          <span style={styles.pointer}>
            <AiOutlineSearch
              size="25px"
              onClick={() => {
                setSearchVisible(!searchVisible);
                setSearchQuery("");
              }}
            />
          </span>
          {searchVisible && (
            <div style={styles.searchBar} className="relative">
              <input
                type="text"
                placeholder="Search..."
                style={styles.input}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {searchQuery != "" && <SearchResult searchQuery={searchQuery} />}
            </div>
          )}
        </div>
      ) : (
        <div className="w-96"></div>
      )}
      <div style={styles.button}>
        <Separator />
        {userToken && (
          <>
            {userData && (
              <>
                {userData.role === "admin" && (
                  <>
                    <span onClick={() => navigate("/admin")}>
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
                    <div onClick={toggleDropdown}>
                      <span className="cursor-pointer w-[25px] h-[25px] bg-white rounded-full flex justify-center items-center text-[#4C2B21] text-xs border-2 border-[#4C2B21]">
                        {userData?.firstName[0].toUpperCase() +
                          userData?.lastName[0].toUpperCase()}
                      </span>

                      {isOpen && (
                        <div className="absolute end-16 z-10 mt-3 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-[#FDFBF7] shadow-lg transition-transform duration-300 ease-in-out transform translate-y-2">
                          <div className="p-2">
                            <span
                              className="cursor-pointer flex items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-[#F1EEE3]  hover:text-gray-700"
                              onClick={() => {
                                navigate("/profile/orders");
                              }}
                            >
                              <HiOutlineSquares2X2 className={`h-4 w-4 mr-2`} />
                              My Orders
                            </span>
                            <span
                              className="cursor-pointer flex items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-[#F1EEE3]  hover:text-gray-700"
                              onClick={() => navigate("/profile/favourites")}
                            >
                              <FaRegBookmark className={`h-4 w-4 mr-2`} />
                              Favourites
                            </span>
                            <span
                              className=" cursor-pointer flex items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-[#F1EEE3]  hover:text-gray-700"
                              onClick={() =>
                                navigate("/profile/account-settings")
                              }
                            >
                              <IoSettingsOutline className={`h-4 w-4 mr-2`} />
                              Account Settings
                            </span>
                            <span
                              className=" cursor-pointer flex items-center rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-[#F1EEE3]  hover:text-gray-700"
                              onClick={() => navigate("/profile/blogs")}
                            >
                              <BiBookAlt className={`h-4 w-4 mr-2`} />
                              My Blogs
                            </span>
                            <span
                              className=" cursor-pointer flex items-center rounded-lg px-4 py-2 text-sm text-red-500 hover:bg-[#F1EEE3]  hover:text-red-700"
                              onClick={logoutClickHandler}
                            >
                              <BiLogOut className={`h-4 w-4 mr-2`} />
                              Logout
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* <span onClick={logoutClickHandler}>
                      <BiLogOut size={25} style={styles.pointer} />
                    </span> */}
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

// const SearchBar = () => {
//   // Implement search bar functionality here
//   return (
//     <div style={styles.searchBar}>
//       <input type="text" placeholder="Search..." style={styles.input} />
//       <button style={styles.searchButton}>Search</button>
//     </div>
//   );
// };

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

  searchBar: {
    display: "flex",
    alignItems: "center",
    marginLeft: "10px", // Adjust this value as needed
    height: "35px",
    width: "300px",
  },

  input: {
    marginRight: "10px",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    height: "90%",
    fontSize: "14px",
    width: "70%",
  },

  searchButton: {
    padding: "5px 10px",
    backgroundColor: "#4C2B21",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    height: "90%",
    fontSize: "14px",
  },
};
