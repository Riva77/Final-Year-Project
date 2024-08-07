import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components";
import "../../App.css";
import ProductCard from "../../components/card/ProductCard";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/spinner";

const home = () => {
  const productData = useSelector((state) => state.topProduct.data);

  const[topAuthor, setTopAuthor ]= useState();

  const fetchTopAuthor = async (e) => {
    try {
      const topAuthors = await axios.get(
        `http://localhost:8000/api/getTopAuthors`
      );
      console.log("author", topAuthors)
      setTopAuthor(topAuthors.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTopAuthor();
  }, []);

  // if (!topAuthor) {
  //   return <Spinner message={"Loading Blogs..."} />;
  // }

  console.log("top; ", productData);

  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/shop/productDetails/${productId}`);
  };

  const books = productData?.map((book) => {
    return (
      <ProductCard
        name={book.product?.name}
        price={book.product?.price}
        image={book.product?.image}
        key={book._id}
        onClick={() => handleProductClick(book.product._id)}
      />
    );
  });

  console.log("books", books);

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
            <CustomButton name="Shop" onClick={() => navigate("/shop/All")} />
          </div>
        </div>
        <div style={styles.rightDiv}></div>
      </section>
      <section style={styles.specialSection}>
        <div style={styles.specialDiv}>
          <span style={styles.special}>What's so special about us?</span>
        </div>
        <div style={styles.aboutusDiv}>
          <p style={styles.aboutUs}>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.""Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </section>
      <section style={styles.toppickSection}>
        <div style={styles.topPick}>Top Picks for you</div>
        <div style={styles.booksPic}>{books}</div>
        {/* <div style={styles.booksPic}>{books}</div> */}
      </section>

      <section style={styles.authorSection}>
        <div style={styles.authorTittle}>Choose By Author</div>
        <div style={styles.authorDiv}>
          {topAuthor?.map((data, index) => (
            <div
              style={styles.eachauthorDiv}
              onClick={() => navigate(`/shop/${data?.authorDetails?.name}`)}
              key={index}
              className="cursor-pointer"
            >
              <img
                src={data?.authorDetails?.image}
                alt={data?.authorDetails?.name}
                style={styles.authorImg}
                width={100}
              />
              <span style={styles.authorName}>{data?.authorDetails?.name}</span>
            </div>
          ))}
        </div>
      </section>
      <Footer />
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
  specialSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // height: "700px",
    color: "#FAF0E6",
    marginTop: "60px",
  },
  specialDiv: {
    fontFamily: "Playfair Display",
    display: "flex",
    justifyContent: "center",
    fontSize: "40px",
    fontWeight: "bold",
    padding: "30px 70px",
    color: "#4C2B21",
    gap: 100,
    // marginBottom: "600px",
  },
  special: {
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
  },

  aboutusDiv: {
    background: "#FDFBF7",
    boxShadow: "0 10px 14px rgba(0, 0, 0, 0.4)",
    height: "400px",
    width: "900px",
  },

  aboutUs: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Playfair Display",
    fontSize: "20px",
    fontWeight: "bold",
    color: "black",
    padding: "50px",
    textAlign: "justify",
  },

  booksPic: {
    gap: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "40px",
  },

  toppickSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "60px",
    gap: 50,
  },
  topPick: {
    fontFamily: "Playfair Display",
    fontSize: "40px",
    fontWeight: "bold",
    color: "#4C2B21",
  },

  authorSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "60px",
    gap: 50,
  },

  authorTittle: {
    fontFamily: "Playfair Display",
    fontSize: "40px",
    fontWeight: "bold",
    color: "#4C2B21",
    display: "flex",
  },

  authorDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 100,
  },

  eachauthorDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  authorImg: { height: "160,", width: "113px", borderRadius: "75px" },
  authorName: {
    fontFamily: "Playfair display",
    fontWeight: "bold",
  },
};
