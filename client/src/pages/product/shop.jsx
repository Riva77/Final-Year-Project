import CaterogiesBook from "../../assets/CaterogiesBook.png";
import { useState } from "react";
import { CustomButton, RangeSlider, Dropdown } from "../../components";
import { useSelector } from "react-redux";
import ProductCard from "../../components/card/ProductCard";
import Footer from "../../components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";

const Shop = () => {
  const { filter } = useParams();
  const [author, setAuthor] = useState(filter);
  const [genre, setGenre] = useState("All");
  const [minPrice, setMinPrice] = useState(0); //for rangeSlider
  const [maxPrice, setMaxPrice] = useState(500); //for rangeSlider

  const navigate = useNavigate();

  const handlePriceChange = (newPriceRange) => {
    //for rangeSlider
    setMinPrice(newPriceRange[0]); //for rangeSlider
    setMaxPrice(newPriceRange[1]); //for rangeSlider
  };

  const handleProductClick = (productId) => {
    navigate(`/shop/productDetails/${productId}`);
  };

  const productData = useSelector((state) => state.product.data);
  const topProductData = useSelector((state) => state.topProduct?.data);

  const books = productData
    ?.filter((book) => {
      if (genre === "All") {
        return book.price <= maxPrice && book.price >= minPrice;
      } else {
        return (
          book.price <= maxPrice &&
          book.price >= minPrice &&
          book.genre === genre
        );
      }
    })
    .filter((book) => {
      if (author === "All") {
        return book;
      } else {
        return book.author.name === author; //each book ko author check gareko ra matching return gareko
      }
    })
    .map((book) => {
      return (
        <ProductCard
          name={book.name}
          price={book.price}
          image={book.image}
          key={book._id}
          onClick={() => handleProductClick(book._id)}
        />
      );
    });

  const dropdownChangeHandler = (e, label) => {
    // #ProudOfMyself
    const selectedValue = e.target.value;
    if (label === "Genre") {
      setGenre(selectedValue);
    } else if (label === "Author") {
      setAuthor(selectedValue);
    }
  };

  const bookGenre = [
    "All",
    ...new Set(productData?.map((books) => books.genre)),
  ]; //book haru ko genre lai set vitra haleko. set ma unique data store hunxa.
  const bookAuthor = [
    "All",
    ...new Set(productData?.map((books) => books.author)),
  ]; //book haru ko genre lai set vitra haleko. set ma unique data store hunxa.

  console.log(bookGenre);

  return (
    <div style={styles.divMain}>
      <section
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <section style={styles.firstSection}>
          {/*for rangeSlider*/}
          <div style={styles.tab}>
            <span style={styles.tabHeading}>Filter by Price</span>
            <div style={styles.priceRange}>
              <span>
                Min: <span style={styles.price}>Rs. {minPrice}</span>
              </span>
              <span>
                Max: <span style={styles.price}>Rs. {maxPrice}</span>
              </span>
            </div>
            <RangeSlider min={0} max={500} onChange={handlePriceChange} />
          </div>
          <div style={styles.tab}>
            <span style={styles.tabHeading}>Filter by Genre</span>
            <Dropdown
              items={bookGenre}
              label="Genre"
              value={genre}
              name={"genre"}
              onChange={(e) => dropdownChangeHandler(e, "Genre")}
            />
          </div>
          <div style={styles.tab}>
            <span style={styles.tabHeading}>Filter by Author</span>
            <Dropdown
              items={bookAuthor}
              label="Author"
              value={author}
              name={"author"}
              onChange={(e) => dropdownChangeHandler(e, "Author")}
            />
          </div>
        </section>

        <section style={styles.secondSection}>
          <section
            style={{
              display: "flex",
              margin: "40px 10px",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid black",
              paddingBottom: "90px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: 20,
                fontFamily: "'Playfair Display'",
              }}
            >
              <div style={styles.bestSellerDiv}>Best Seller Among Users</div>
              <div style={styles.secretChamberDiv}>
                "{topProductData && topProductData[0]?.product.name}"
              </div>
              <div>
                <CustomButton
                  name="View Book"
                  type="submit"
                  color="white"
                  onClick={() =>
                    navigate(
                      `/shop/productDetails/${topProductData &&
                        topProductData[0]?.product._id}`
                    )
                  }
                />
               
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <img
                src={CaterogiesBook}
                alt="Book"
                style={styles.CategoriesBook}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                flex: 1,
                flexDirection: "column",
              }}
            >
              <span style={styles.cateBookDescri}>
                Deep within the ancient castle, hidden behind a tapestry adorned
                with intricate patterns, lies a secret chamber. For centuries,
                its existence remained concealed, known only to a select few who
                guarded its mysteries.
              </span>
              <span style={{ fontWeight: "bold" }}>
                -{" "}
                {topProductData?.length > 0 &&
                  topProductData[0].product?.author.name}
              </span>
            </div>
          </section>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Playfair Display",
                fontSize: "40px",
                fontWeight: "bold",
                color: "#4C2B21",
                display: "flex",
              }}
            >
              Discover Our Books
            </div>
            <div style={styles.booksPic}>{books}</div>
          </div>
        </section>
      </section>
      <Footer />
    </div>
  );
};

export default Shop;

//CSS

const styles = {
  divMain: {
    display: "flex",
    justifyContent: "center",
    background: "#F1EEE3",

    flexDirection: "column",
    //height: "100vh",
  },

  firstSection: {
    display: "flex",
    flexDirection: "column",
    gap: 50,
    background: "#F1EEE3",
    flex: 1,
    padding: "25px",
    height: "87vh",
  },

  searchDiv: {
    fontSize: "11px",
    fontWeight: "normal",
  },

  bestSellerDiv: {
    fontSize: "33px",
    fontWeight: "bold",
  },

  secretChamberDiv: {
    fontSize: "23px",
    fontWeight: "bold",
  },

  topic: {
    fontWeight: "bold",
    fontSize: "22px",
  },

  booksPic: {
    gap: 50,
    display: "flex",
    justifyContent: "space-between",
    // alignItems: "center",
    margin: "40px 100px",
    flexWrap: "wrap",
  },

  topicTwo: {
    fontWeight: "bold",
    fontSize: "22px",
  },

  secondSection: {
    display: "flex",
    background: "#FDFBF7",
    flex: 5,
    padding: "0 25px",
    justifyContent: "flex-start",
    flexDirection: "column",
  },

  CategoriesBook: {
    position: "absolute",
    height: "205px",
    width: "310px",
    boxShadow: "0 10px 14px rgba(0, 0, 0, 0.9)",
    zIndex: "1",
    marginTop: "25px",
  },

  cateBookDescri: {
    // width: "530px",
    lineHeight: "27px",
    textAlign: "justify",
    fontFamily: "Tahoma",
    marginBottom: "20px",
    right: 0,
  },
  tab: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },

  tabHeading: {
    fontSize: "17px",
    fontWeight: 700,
  },

  priceRange: {
    display: "flex",
    gap: 50,
    fontSize: "16px",
  },

  price: {
    fontWeight: 700,
    color: "#4C2B21",
  },
};
