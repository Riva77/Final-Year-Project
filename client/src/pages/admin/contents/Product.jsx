

import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../../components/admin/Table";
import CustomButton from "../../../components/buttons/CustomButton";
import { setProductModal } from "../../../features/modalSlice"; // Import action creators
import { deleteProduct } from "../../../apis/product/deleteProduct"; // Import your deleteProduct API function or action creator

const Product = () => {
  const productData = useSelector((state) => state.product.data);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on the search query
  const filteredProducts = useMemo(() => {
    return productData?.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [productData, searchQuery]);

  const dispatch = useDispatch();
  const handleAddProduct = () => {
    dispatch(setProductModal());
    
  };

  // const handleEditProduct = (item) => {
  //   // Dispatch action to set selected product data for editing
  //   dispatch(setSelectedProduct(item));
  //   // Open modal for editing product
  //   dispatch(setProductModal());
  // };

  return (
    <div className="w-full my-2 flex flex-col gap-4">
      <h1 className="flex text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2 items-center">
        Product Details
      </h1>

      <CustomButton type="Add" name="Add Products" onClick={handleAddProduct} />

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
