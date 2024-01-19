import CartCard from "../../components/card/CartCard";

// import Footer from "../components/Footer";
const Cart = () => {
  return (
    <div style={styles.divMain}>
      <section
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <section style={styles.firstSection}>
          <section
            style={{
              display: "flex",
              margin: "41px 46px 20px 46px",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid black",
              paddingBottom: "45px",
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
              <div style={styles.bestSellerDiv}>Shopping Cart</div>
            </div>
          </section>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              margin: "0 46px",
            }}
          >
            <span
              style={{ display: "flex", justifyContent: "flex-start", flex: 3 }}
            >
              Product
            </span>
            <span
              style={{ display: "flex", justifyContent: "center", flex: 1.7 }}
            >
              Quantity
            </span>
            <span
              style={{ display: "flex", justifyContent: "center", flex: 1 }}
            >
              Price
            </span>
            <span
              style={{ display: "flex", justifyContent: "flex-end", flex: 1 }}
            >
              Total
            </span>
          </div>
          <div>
            <CartCard />
          </div>
        </section>
        <section style={styles.secondSection}></section>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default Cart;

//CSS

const styles = {
  divMain: {
    display: "flex",
    justifyContent: "center",
    background: "#F1EEE3",
    flexDirection: "column",
    //height: "100vh",
  },

  secondSection: {
    display: "flex",
    flexDirection: "column",
    gap: 50,
    background: "#F1EEE3",
    flex: 1,
    padding: "75px",
    height: "87vh",
  },

  firstSection: {
    display: "flex",
    background: "#FDFBF7",
    flex: 5,
    padding: "0 25px",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  bestSellerDiv: {
    fontSize: "33px",
    fontWeight: "bold",
  },
};
