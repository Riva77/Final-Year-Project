import { useSelector } from "react-redux";
import Table from "../../../components/admin/Table";

const Product = () => {
  //fetching data from global state
  const productData = useSelector((state) => state.product.data);
  console.log(productData);
  return (
    <div className="w-full">
      <h1 className="font-bold text-xl mb-9">Product Details</h1>
      <Table items={productData} />
    </div>
  );
};

export default Product;
