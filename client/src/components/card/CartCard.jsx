import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import QuantityButton from "../../components/buttons/QuantityButton";
import {
  fetchCartItems,
  updateProductQuantity,
} from "../../features/cartSlice";
import { toastError, toastSuccess } from "../../utils/toast";

const CartCard = ({
  productId,
  image,
  name,
  genre,
  productPrice,
  author,
  productQuantity,
  isSelected,
  setSelectedCartItems,
  cartItemId,
}) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(productQuantity);
  const [productTotPrice, setProductTotPrice] = useState(
    productQuantity * productPrice
  );

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setProductTotPrice(Number(newQuantity) * productPrice);
  };

  const updateQuantity = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/updateCartItem/${cartItemId}`,
        {
          quantity,
        }
      );
      if (response.status === 200) {
        dispatch(fetchCartItems());
        console.log("Item updated successfully");
      }
    } catch (error) {
      toastError(error.response.data.message);
    }
  };
  useEffect(() => {
    updateQuantity();
  }, [quantity]);

  const handleDeleteCartItem = async () => {
    // dispatch(removeProductFromCart(productId));
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/deleteCartItem/${cartItemId}`
      );
      if (response.status === 200) {
        dispatch(fetchCartItems());
        toastSuccess("Item deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toastError(error.response.data.message);
    }
  };
  // useEffect(() => {
  //   dispatch(updateProductQuantity({ productId, quantity }));
  // }, [quantity]);

  return (
    <div style={styles.container}>
      <section style={styles.details}>
        <div style={styles.prodDetails}>
          <img src={image} alt="" width={95} height={112} />
          <div style={styles.detailContainer}>
            <span style={{ fontSize: "20px", fontWeight: 600 }}>{name}</span>
            <span className="flex flex-col">
              <span style={{ fontSize: "15px", color: "#555555" }}>
                Genre: {genre}
              </span>
              <span style={{ fontSize: "15px", color: "#555555" }}>
                Author: {author}
              </span>
            </span>
          </div>
        </div>
        <div style={styles.otherDetails}>
          <QuantityButton
            initialValue={quantity}
            onQuantityChange={handleQuantityChange}
          />
          {/* <span>{quantity}</span>
          <span>{String(isUpdated)}</span> */}
        </div>
        <div style={{ ...styles.otherDetails, color: "#4C2B21" }}>
          Rs. {productPrice}
        </div>
        <div style={{ ...styles.otherDetails, color: "#4C2B21" }}>
          Rs. {productTotPrice}
        </div>
      </section>
      <section style={styles.buttonSection}>
        {/* <span
          style={{
            ...styles.button,
            visibility: isUpdated ? "visible" : "hidden",
          }}
          onClick={handleProductQuantityChange}
        >
          <MdFileUpload color="white" /> Update
        </span> */}
        <ToggleButton
          value="check"
          selected={isSelected}
          onChange={() => setSelectedCartItems(productId)}
          size="small"
          sx={{
            width: 40,
            height: 40,
          }}
          color={isSelected ? `success` : `error`}
        >
          {isSelected && <CheckIcon />}
        </ToggleButton>
        {/* <span>{JSON.stringify(isSelected)}</span> */}
        <span
          style={{ ...styles.button, background: "#c94949" }}
          onClick={handleDeleteCartItem}
        >
          <MdDelete color="white" /> Delete
        </span>
      </section>
    </div>
  );
};

export default CartCard;

const styles = {
  container: {
    display: "flex",
    gap: 10,
    flexDirection: "column",
    paddingBottom: "10px",
    borderBottom: "1px solid gray",
  },

  details: {
    display: "flex",
  },

  detailContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },

  prodDetails: {
    display: "flex",
    flex: 3,
    justifyContent: "flex-start",
    gap: 30,
  },

  otherDetails: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonSection: {
    display: "flex",
    gap: 20,
    justifyContent: "flex-end",
  },

  button: {
    display: "flex",
    gap: 10,
    width: "90px",
    justifyContent: "center",
    alignItems: "center",
    background: "#024E82",
    padding: "7px",
    color: "#ffffff",
    fontSize: "15px",
    cursor: "pointer",
  },
};
