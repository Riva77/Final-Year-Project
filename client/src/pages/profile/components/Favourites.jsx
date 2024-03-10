import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../../components/card/ProductCard";

const Favourites = () => {
  const favourites = useSelector((state) => state.user?.data?.favoriteBooks);
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/shop/productDetails/${productId}`);
  };

  return (
    <div
      style={{
        gap: 50,
        display: "flex",
        justifyContent:
          favourites?.length >= 4 ? "space-between" : "flex-start",
        flexWrap: "wrap",
        margin: "20px",
      }}
    >
      {favourites?.map((book) => {
        return (
          <ProductCard
            name={book.name}
            price={book.price}
            image={book.image}
            key={book._id}
            onClick={() => handleProductClick(book._id)}
          />
        );
      })}
    </div>
  );
};

export default Favourites;
