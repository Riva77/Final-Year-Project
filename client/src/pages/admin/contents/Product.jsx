// import { useSelector } from "react-redux";
// import Table from "../../../components/admin/Table";
// import CustomButton from "../../../components/buttons/CustomButton";

// const Product = () => {
//   //fetching data from global state
//   const productData = useSelector((state) => state.product.data);
//   console.log(productData);
//   return (
//     <div className="w-full my-2 flex flex-col gap-4">
//       <h1 className="font-bold text-xl mb-9">Product Details</h1>
//       <CustomButton type="Add" name="Add Products" />
//       <Table items={productData} />
//     </div>
//   );
// };

// export default Product;

import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import Table from "../../../components/admin/Table";
import CustomButton from "../../../components/buttons/CustomButton";

const Product = () => {
  const productData = useSelector((state) => state.product.data);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on the search query
  const filteredProducts = useMemo(() => {
    return productData?.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [productData, searchQuery]);

  return (
    <div className="w-full my-2 flex flex-col gap-4">
      <h1 className="font-bold text-xl mb-9">Product Details</h1>

      <CustomButton type="Add" name="Add Products" />
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, author, or genre"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />

      
      
      {/* Pass filtered products to the Table component */}
      <Table items={filteredProducts} />
    </div>
  );
};

export default Product;


