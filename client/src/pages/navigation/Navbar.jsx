import React from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  const navigate = useNavigate();
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
          Shop
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
        {/* {userToken && (
          <>
            {userData && (
              <>
                {userData.role === "admin" && (
                  <>
                    <span onClick={() => navigate("/dashboard")}>
                      <LuLayoutDashboard size={25} style={styles.pointer} />
                    </span>
                    <span onClick={logoutClickHandler}>
                      <BiLogOut size={25} style={styles.pointer} />
                    </span>
                  </>
                )}
                {userData.role === "user" && (
                  <>
                    <span>
                      <AiOutlineShoppingCart size={25} style={styles.pointer} />
                    </span>
                    <span>
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
        {!userToken && <NavigationButton name="Login" to={"/login"} />} */}
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
