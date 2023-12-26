import React from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components";
import "../../App.css";
import homeFive from "../../assets/homeFive.jpg";

const home = () => {
  return (
    <div>
      <section className="home" style={styles.wallpaper}>
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
