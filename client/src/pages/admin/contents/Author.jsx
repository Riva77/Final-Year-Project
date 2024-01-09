import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import AuthorTable from "../../../components/admin/AuthorTable";
import CustomButton from "../../../components/buttons/CustomButton";

const  Author = () => {
  const productData = useSelector((state) => state.product.data);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on the search query
  const filteredProducts = useMemo(() => {
    return productData?.filter((product) =>
      product.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [productData, searchQuery]);

  return (
    <div className="w-full my-2 flex flex-col gap-4">
      <h1 className="font-bold text-xl mb-9"> Author Details</h1>

      <CustomButton type="Add" name="Add  Author" />
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search author"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-72 p-2 border border-gray-300 rounded"
      />

      
      
      {/* Pass filtered products to the Table component */}
      < AuthorTable items={filteredProducts} />
    </div>
  );
};

export default  Author;