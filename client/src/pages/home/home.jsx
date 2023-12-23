import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components";
import "../../App.css";
import homeFive from "../../assets/homeFive.jpg";

const home = () => {
  return (
    // <section className="home">
    //   <div className="absolute inset-0 bg-gradient-to-r from-white/70 to-transparent"></div>

    //   <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
    //   <div className="flex flex-col justify-start items-center max-w-xl text-center ltr:sm:text-left rtl:sm:text-right mx-auto lg:items-center lg:text-right lg:ml-auto">

    //       <h1 className="text-xl sm:text-5xl font-extrabold">
    //         Books & R
    //         <strong className="block font-extrabold text-accent mt-4">
    //           "Exploring world through words."
    //         </strong>
    //       </h1>

    //       <p className="mt-4 max-w-lg text-base sm:text-lg/relaxed mx-auto lg:mx-0">
    //         Explore the boundless realms of literature on our ecommerce book
    //         website. Immerse yourself in captivating stories, diverse cultures,
    //         and limitless knowledge.
    //       </p>

    //       <CustomButton
    //         className="mt-8"
    //         name={`Signup`}
    //         onClick={() => navigate("/signup")}
    //       />
    //     </div>
    //   </div>
    // </section>
    <div>
      <section className="home" style={styles.wallpaper}>
        {/* <img
          src={homeFive}
          alt="wallpaper"
          // style={{
          //   objectFit: "cover",
          //   width: "100%",
          //   height: "100%",
          // }}
        /> */}

        <div style={styles.leftDiv}>
          <div
            style={{
              fontSize: "90px",
              fontWeight: "bold",
              color: "#4C2B21",
            }}
          >
            BOOKS & R
          </div>

          <div>
            <h1 style={styles.quoteOne}>"Exploring world through words."</h1>
            <p style={styles.quoteTwo}>
              Explore the boundless realms of literature on our ecommerce book
              website. Immerse yourself in captivating stories, diverse
              cultures, and limitless knowledge.
            </p>
          </div>

          <div>
            <CustomButton name="Shop" onCLick={() => navigate("/shop")} />
          </div>
        </div>
        <div style={styles.rightDiv}></div>
      </section>
    </div>
  );
};

export default home;

//CSS

const styles = {
  wallpaper: {
    display: "flex",
    justifyContent: "right",
    alignItems: "center",
    height: "710px",

    // width:"1500px"
    // boxShadow: "0 10px 10px rgba(0, 0, 0, 0.3)",
  },

  leftDiv: {
    position: "absolute",
    top: "160px",
    padding: "0px 100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "right",
    gap: 25,
  },

  quoteOne: {
    color: "#FD7C33",
    fontSize: "20px",
    fontWeight: "bold",
    fontFamily: "Playfair Display",
  },

  quoteTwo: {
    color: "black",
    fontSize: "15px",
    fontWeight: "bold",
    width: "530px",
    lineHeight: "27px",
    fontFamily: "Playfair Display",
    textAlign: "justify",
  },

  rightDiv: {
    marginLeft: "auto",
  },
};
