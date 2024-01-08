import { useRef } from "react";

const ProductCard = ({ image, name, price, imgStyle, onClick }) => {
  const cardRef = useRef();

  const mouseEnterHandler = () => {
    cardRef.current.style.boxShadow = `0 10px 14px rgba(0, 0, 0, 0.4)`;
  };

  const mouseLeaveHandler = () => {
    cardRef.current.style.boxShadow = `none`;
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
        width: "180px",
        cursor: "pointer",
        padding: "10px",
      }}
      onClick={onClick}
      ref={cardRef}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <img src={image} alt={name} style={{ ...styles.img, ...imgStyle }} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily: "Playfair Display",
            fontWeight: "bold",
            color: "black",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: "Playfair Display",

            fontWeight: "bold",
            color: "brown",
          }}
        >
          $ {price}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;

const styles = {
  img: {
    width: "133px",
    height: "185px",
    boxShadow: "0 10px 14px rgba(0, 0, 0, 0.7)",
  },
};
