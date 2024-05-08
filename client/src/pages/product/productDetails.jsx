import { useState } from "react";
import CustomButton from "../../components/buttons/CustomButton";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../apis/product/getSingleProduct";
import { useEffect } from "react";
import QuantityButton from "../../components/buttons/QuantityButton";
// import { addCartItem } from "../apis/cartApi/addCartItem";
import { toastSuccess, toastError } from "../../utils/toast";
import { useSelector, useDispatch } from "react-redux";
import { addProductToCart } from "../../features/cartSlice";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { addRemoveFavourites } from "../../apis/user/addRemoveFavourites";
import { fetchUserData } from "../../features/authSlice";
import { current } from "@reduxjs/toolkit";

const ProductDetails = () => {
  const { productId } = useParams();
  const userData = useSelector((state) => state.user.data);
  const [quantity, setQuantity] = useState(1);

  const [book, setBook] = useState();

  const [cartData, setCartData] = useState();

  const [isFavourite, setIsFavourite] = useState(false);
  // if (userData?.favoriteBooks.includes(productId)) {
  //   setIsFavourite(true);
  // }

  const dispatch = useDispatch();
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const addToFavourite = async () => {
    try {
      console.log("user", userData?._id);
      const response = await addRemoveFavourites({
        userId: userData?._id,
        productId: productId,
      });
      dispatch(fetchUserData(userData._id));
      if (response.data.type === "add") {
        toastSuccess(response.data.message);
      } else {
        toastError(response.data.message);
      }

      console.log(response);
      setIsFavourite(!isFavourite);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductData = async () => {
    const product = await getSingleProduct(productId);
    setBook(product);
    console.log(await product);
  };
  useEffect(() => {
    fetchProductData();
  }, []);

  // useEffect(() => {
  //   if (book !== null && userData?.favoriteBooks.indexOf(productId) !== -1) {
  //     setIsFavourite(true);
  //   }
  // }, [book]);

  const addToCartHandler = () => {
    const cartItem = { ...book, quantity };
    dispatch(addProductToCart(cartItem));
  };
  console.log("id", productId);

  return (
    <div>
      <section style={styles.outerSection}>
        <section style={styles.innerSection}>
          <div style={styles.upperPart}>
            <img src={book?.image} alt="book" style={styles.img} />
            <div style={styles.upperrightDiv}>
              <span style={styles.bookName}>{book?.name}</span>
              <span style={styles.price}>Rs. {book?.price}</span>
              <span style={styles.description}>{book?.description}</span>
              <div
                style={{ display: "flex", gap: 20, flexDirection: "column" }}
              >
                <div style={styles.buttonDiv}>
                  <QuantityButton
                    initialValue={quantity}
                    onQuantityChange={handleQuantityChange}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <CustomButton
                    name="Add to cart"
                    type="submit"
                    color="white"
                    onClick={addToCartHandler}
                  />
                  <span className="cursor-pointer" onClick={addToFavourite}>
                    {userData?.favoriteBooks.some((favBook)=>favBook._id===book?._id)?(
                       <IoMdHeart size={30} color="#4C2B21" />
                    ) : (
                     
                      <IoIosHeartEmpty size={30} color="#4C2B21" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 60,
            }}
          >
            <div style={styles.synopsisDiv}>
              <span style={styles.synopsisTitle}>Synopsis</span>
              <p style={styles.synopsis}>{book?.synopsis}</p>
            </div>
            <div style={styles.minidetailDiv}>
              <div style={styles.miniDetail}>
                Genre
                <span style={styles.minidetailAns}>{book?.genre}</span>
              </div>
              <div style={styles.miniDetail}>
                Author
                <span style={styles.minidetailAns}>{book?.author.name}</span>
              </div>
            </div>
            <div style={styles.minidetailDiv}>
              <div style={styles.miniDetail}>
                Quantity
                <span style={styles.minidetailAns}>{book?.quantity}</span>
              </div>
              <div style={styles.miniDetail}>
                Pages
                <span style={styles.minidetailAns}>{book?.pages}</span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default ProductDetails;

//CSS

const styles = {
  outerSection: {
    background: "#F1EEE3",
    // height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
  },

  innerSection: {
    background: "#FDFBF7",
    width: "1100px",
    padding: "100px ",
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },

  upperPart: {
    display: "flex",
    paddingTop: "1px",
    gap: 120,
    padding: "30px",
  },

  img: {
    height: "310px",
    width: "215px",
    boxShadow: "0 10px 14px rgba(0, 0, 0, 0.9)",
  },
  upperrightDiv: {
    display: "flex",
    gap: 22,
    flexDirection: "column",
  },
  bookName: {
    fontSize: "40px",
    fontFamily: "Playfair Display",
    fontWeight: "lighter",
  },

  price: {
    fontSize: "17px",
    fontFamily: "Tahoma",
    fontWeight: "bold",
  },

  description: {
    lineHeight: "27px",
    textAlign: "justify",
    fontFamily: "Tahoma",
    width: "510px",
  },

  buttonDiv: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
  },

  button: {
    background: "#F1EEE3",
    cursor: "pointer",
    height: "30px",
    width: "30px",
    fontSize: "20px",
    border: "none",
    boxShadow: "0 10px 14px rgba(0, 0, 0, 0.7)",
  },

  synopsisDiv: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
    padding: "30px",
    gap: 10,
    boxShadow: "0 10px 14px rgba(0, 0, 0, 0.7)",
  },
  synopsisTitle: {
    fontSize: "17px",
    fontFamily: "Tahoma",
    fontWeight: "bold",
  },

  synopsis: {
    lineHeight: "27px",
    textAlign: "justify",
    fontFamily: "Tahoma",
    width: "520px",
  },
  minidetailDiv: {
    display: "flex",
    // justifyContent: "baseline",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    padding: "30px",
    gap: 20,
  },
  miniDetail: {
    display: "flex",
    // flex: 1,
    fontSize: "17px",
    fontFamily: "Tahoma",
    fontWeight: "bold",
    flexDirection: "column",
  },

  minidetailAns: {
    fontFamily: "Tahoma",
    fontWeight: "normal",
  },
};
