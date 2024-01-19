import React from "react";

const CartCard = ({
  image,
  name,
  genre,
  price,
  author,
  productQuantity,
  productTotal,
}) => {
  return (
    <div style={styles.container}>
      <img src={image} alt="product" width={140} height={170} />
      <div>
        <h1>{name}</h1>
        <p>{genre}</p>
      </div>
    </div>
  );
};

export default CartCard;

const styles = {
  container: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottom: "2px solid #000000",
    padding: "10px",
    gap: 30,
  },
};
