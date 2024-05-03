import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import CustomButton from "../../components/buttons/CustomButton";
import Tab from "../../components/admin/Tab";
import Product from "./contents/Product";
import Genre from "./contents/Genre";
import Author from "./contents/Author";
import Orders from "./contents/AdminOrders";
import UpdateProductModal from "./contents/UpdateProductModal";
import UpdateAuthorModal from "./contents/UpdateAuthorModal";
import UpdateGenreModal from "./contents/UpdateGenreModal";
import ViewOrderModal from "./contents/ViewOrderModal";
import EditProductModal from "./contents/EditProductModal";

const AdminDashboard = () => {
  const tab = localStorage.getItem("adminActiveTab");
  const [activeTab, setActiveTab] = useState(tab ? tab : "Add Product");
  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
    localStorage.setItem("adminActiveTab", tabTitle);
  };
  const handleLogout = () => {};

  const isProductModalOpen = useSelector(
    (state) => state.modal.isAddProductModalOpen
  );
  const isAuthorModalOpen = useSelector(
    (state) => state.modal.isAddAuthorModalOpen
  );
  const isGenreModalOpen = useSelector(
    (state) => state.modal.isAddGenreModalOpen
  );
  const isViewOrderModalOpen = useSelector(
    (state) => state.modal.isViewOrderModalOpen
  );
  const isSelectedProductModalOpen = useSelector(
    (state) => state.selectedProduct.isSelected
  );

  return (
    <>
      <UpdateProductModal isOpen={isProductModalOpen} />
      <EditProductModal isOpen={isSelectedProductModalOpen} />
      <UpdateAuthorModal isOpen={isAuthorModalOpen} />
      <UpdateGenreModal isOpen={isGenreModalOpen} />
      <ViewOrderModal isOpen={isViewOrderModalOpen} />
      <div
        style={{
          padding: "20px 64px",
          display: "flex",
          minHeight: "50vh",
          backgroundColor: "#F1EEE3",
          gap: "20px",
        }}
      >
        <aside
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: 8,
            flex: "0 1 auto",
            width: "300px",
            padding: "16px",
            borderRadius: "6px",
            backgroundColor: "#FDFBF7",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Tab
              title={"Product"}
              onClick={handleTabClick}
              isActive={activeTab === "Product"}
            />
            <Tab
              title={"Author"}
              onClick={handleTabClick}
              isActive={activeTab === "Author"}
            />
            <Tab
              title={"Genre"}
              onClick={handleTabClick}
              isActive={activeTab === "Genre"}
            />
            <Tab
              title={"Orders"}
              onClick={handleTabClick}
              isActive={activeTab === "Orders"}
            />
          </div>
          <CustomButton name="Logout" onClick={handleLogout} />
        </aside>
        <section
          style={{
            padding: "50px 32px",
            flex: 1,
            display: "flex",
            borderRadius: "6px",
            backgroundColor: "#FDFBF7",
            width: "100%",
            height: "635px",
            overflowY: "auto",
          }}
        >
          {activeTab === "Product" && <Product />}
          {activeTab === "Author" && <Author />}
          {activeTab === "Genre" && <Genre />}
          {activeTab === "Orders" && <Orders />}
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;
