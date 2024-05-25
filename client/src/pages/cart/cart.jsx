import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/buttons/CustomButton";
import CartCard from "../../components/card/CartCard";
import { clearCart, fetchCartItems } from "../../features/cartSlice";
import { toastError, toastSuccess } from "../../utils/toast";

// import Footer from "../components/Footer";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = new URLSearchParams(window.location.search).get("status");
  const transactionId = new URLSearchParams(window.location.search).get(
    "transaction_id"
  );

  const updateOrder = () => {
    const response = axios.patch(
      `http://localhost:8000/api/updateOrder/${localStorage.getItem(
        "orderId"
      )}`,
      { paymentStatus: status, transactionId: transactionId }
    );
    if (response.success) {
      dispatch(clearCart());
      toastSuccess("Payment Successful");
    }
  };

  const deleteOrder = () => {
    axios.delete(
      `http://localhost:8000/api/${localStorage.getItem("orderId")}`
    );
    toastError("Payment Failed");
  };

  useEffect(() => {
    if (status && transactionId) {
      if (status === "Completed") {
        updateOrder();
        dispatch(fetchCartItems());
        toastSuccess("Order placed successfully");
        navigate("/cart", { replace: true });
      } else {
        deleteOrder();
        toastError("Payment Failed");
      }
    }
  }, [status && transactionId]);

  const cartItems = useSelector((state) => state.cart.products);

  const userId = useSelector((state) => state.user.data?._id);

  const [paymentType, setPaymentType] = useState("Cash On Delivery");

  const [selectedCartItems, setSelectedCartItems] = useState([]);

  useEffect(() => {
    setSelectedCartItems(cartItems);
  }, [cartItems]);

  const addorRemoveItem = (productId) => {
    const index = selectedCartItems.findIndex((item) => item._id === productId);
    if (index > -1) {
      const newCartItems = [...selectedCartItems];
      newCartItems.splice(index, 1);
      setSelectedCartItems(newCartItems);
    } else {
      const newCartItems = [...selectedCartItems];
      const item = cartItems.find((item) => item._id === productId);
      newCartItems.push(item);
      setSelectedCartItems(newCartItems);
    }
    console.log(selectedCartItems);
  };

  const cart =
    cartItems.length > 0 &&
    cartItems?.map((item) => {
      console.log(item);
      return (
        <CartCard
          productId={item?._id}
          image={item?.image}
          name={item?.name}
          productPrice={item?.price}
          productQuantity={item?.quantity}
          genre={item?.genre}
          author={item?.author?.name}
          key={item?._id}
          cartItemId={item?.cartItemId}
          isSelected={
            selectedCartItems.findIndex(
              (cartItem) => cartItem._id === item._id
            ) > -1
          }
          setSelectedCartItems={addorRemoveItem}
        />
      );
    });

  const shippingNavigation = () => {
    let productsData = [];
    // Iterate over cart items
    selectedCartItems.forEach((item) => {
      const productData = {
        product: item?._id,
        quantity: item?.quantity,
      };
      productsData.push(productData);
    });

    // Calculate total price
    const totalPrice = selectedCartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Prepare order data
    const orderData = {
      customer: userId, // Assuming customerId is available
      products: productsData,
      totalPrice: totalPrice,
    };

    localStorage.setItem("orderData", JSON.stringify(orderData));
    if (orderData.products.length !== 0) {
      navigate("/shippingDetails");
    } else {
      toastError("Cart is empty");
    }
  };

  return (
    <div style={styles.cartItemContainer}>
      <section style={styles.detailSection}>
        <div style={styles.heading}>
          <span className="font-semibold">Shopping Cart</span>
          {/* <span>{JSON.stringify(status)}</span> */}
          <span>{cartItems?.length} Items</span>
        </div>
        {/* <span>{JSON.stringify(selectedCartItems)}</span> */}

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
                {selectedCartItems?.map((item) => (
                  <tr>
                    <td className="text-left">{item?.name}</td>
                    <td className="text-left">
                      Rs. {item?.quantity * item?.price}
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
              Rs.
              {selectedCartItems?.reduce((accumulator, product) => {
                return accumulator + product.quantity * product.price;
              }, 0)}
            </span>
          </div>
          <div className="mt-5 flex  justify-center items-center gap-5">
            <CustomButton name={"Proceed "} onClick={shippingNavigation} />
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
