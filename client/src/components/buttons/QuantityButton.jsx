import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const Quantity = ({ initialValue, onQuantityChange }) => {
  const [count, setCount] = useState(initialValue);

  const quantityHandler = (action) => {
    if (count > 1 && action === "-") {
      setCount(count - 1);
      onQuantityChange(count - 1); // Notify the parent component of the updated quantity
    } else if (action === "+") {
      setCount(count + 1);
      onQuantityChange(count + 1); // Notify the parent component of the updated quantity
    }
  };

  return (
    <div style={styles.container}>
      <span onClick={() => quantityHandler("-")}>
        <AiOutlineMinus color="gray" size={12} />
      </span>
      <span style={{ color: "gray" }}>{count}</span>
      <span onClick={() => quantityHandler("+")}>
        <AiOutlinePlus color="gray" size={12} />
      </span>
    </div>
  );
};

export default Quantity;

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    border: "1px solid gray",
    width: "75px",
    height: "25px",
    padding: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
