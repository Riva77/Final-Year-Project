import { useSelector } from "react-redux";
import CartCard from "../../components/card/CartCard";
import { Padding } from "@mui/icons-material";
import CustomButton from "../../components/buttons/CustomButton";

// import Footer from "../components/Footer";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.products);
  const cart = cartItems?.map((item) => {
    return (
      <CartCard
        productId={item?._id}
        image={item?.image}
        name={item?.name}
        productPrice={item?.price}
        productQuantity={item?.quantity}
        genre={item?.genre}
        author={item?.author}
        key={item?._id}
      />
    );
  });
  return (
    <div style={styles.cartItemContainer}>
      <section style={styles.detailSection}>
        <div style={styles.heading}>
          <span className="font-semibold">Shopping Cart</span>
          <span>{cartItems?.length} Items</span>
        </div>
        <div style={styles.columnTabs}>
          <span
            style={{
              ...styles.tabHeading,
              flex: 3,
              justifyContent: "flex-start",
            }}
            className="font-semibold"
          >
            Product
          </span>
          <span
            className="font-semibold"
            style={{ ...styles.tabHeading, flex: 1 }}
          >
            Quantity
          </span>
          <span
            className="font-semibold"
            style={{ ...styles.tabHeading, flex: 1 }}
          >
            Price
          </span>
          <span
            className="font-semibold"
            style={{ ...styles.tabHeading, flex: 1 }}
          >
            Total
          </span>
        </div>
        <div style={styles.cartItems}>{cart}</div>
      </section>
      <section style={styles.summarySection} className="flex flex-col ">
        <div>
          <div className="font-semibold" style={styles.heading}>
            Summary
          </div>
          <div>
            <table className="w-full mb-5">
              <thead>
                <tr>
                  <th className="text-left">Product</th>
                  <th className="text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((item) => (
                  <tr>
                    <td className="text-left">{item?.name}</td>
                    <td className="text-left">
                      ${item?.quantity * item?.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="">
          <div className="flex justify-between font-bold text-xl border-t border-[#4C2B21] py-5">
            <span>Grand Total</span>
            <span>
              $
              {cartItems?.reduce((accumulator, product) => {
                return accumulator + product.quantity * product.price;
              }, 0)}
            </span>
          </div>
          <div className="flex justify-center">
            <CustomButton name={"Checkout"} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;

//CSS

const styles = {
  cartItemContainer: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
    background: "#FDFBF7",
  },

  heading: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "30px",
    paddingTop: "30px",
    paddingBottom: "30px",
    borderBottom: "2px solid gray",
    marginBottom: "30px",
  },

  detailSection: {
    flex: 3,
    padding: "30px 75px",
   
  },
  summarySection: {
    flex: 1,
    minHeight: "100vh",
    background: "#F1EEE3",
    padding: "30px",
  },

  columnTabs: {
    display: "flex",
    alignItems: "flex-start",
    height: "50px",
  },

  tabHeading: {
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
  },
  cartItems: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
};