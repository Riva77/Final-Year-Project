import CaterogiesBook from "../../assets/CaterogiesBook.png";
import {
  CustomButton,
  TextInput,
  RangeSlider,
  Dropdown,
} from "../../components";

const Shop = () => {
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
              {/* <span>
                Min: <span style={styles.price}>$ {minPrice}</span>
              </span>
              <span>
                Max: <span style={styles.price}>$ {maxPrice}</span>
              </span> */}
            </div>
            {/* <RangeSlider min={0} max={50} onChange={handlePriceChange} /> */}
            <RangeSlider />
          </div>
          <div style={styles.tab}>
            <span style={styles.tabHeading}>Filter by Genre</span>
            <Dropdown
            // items={bookGenre}
            // label="Genre"
            // value={genre}
            // key={genre}
            // onChange={(e) => dropdownChangeHandler(e, "Genre")}
            />
          </div>
          <div style={styles.tab}>
            <span style={styles.tabHeading}>Filter by Author</span>
            <Dropdown />
            {/* <Dropdown
              items={bookAuthor}
              label="Author"
              value={author}
              key={author}
              onChange={(e) => dropdownChangeHandler(e, "Author")}
            /> */}
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
              <div style={styles.bestSellerDiv}>Best Seller of the month</div>
              <div style={styles.secretChamberDiv}>"The Secret Garden"</div>
              <div>
                <CustomButton name="Add to cart" type="submit" color="white" />
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
              <span style={{ fontWeight: "bold" }}>-Jenny Lawrence</span>
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
            {/* <div style={styles.booksPic}>{books}</div> */}
          </div>
        </section>
      </section>
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