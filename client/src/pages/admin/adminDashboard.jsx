import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import CustomButton from "../../components/buttons/CustomButton";
import Tab from "../../components/admin/Tab";
import Product from "./contents/Product";
import Genre from "./contents/Genre";
import Author from "./contents/Author";
import UpdateProductModal from "./contents/UpdateProductModal";
import UpdateAuthorModal from "./contents/UpdateAuthorModal";
import UpdateGenreModal from "./contents/UpdateGenreModal";

const AdminDashboard = () => {
  const tab = localStorage.getItem("adminActiveTab");
  const [activeTab, setActiveTab] = useState(tab ? tab : "Add Product");
  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
    localStorage.setItem("adminActiveTab", tabTitle);
  };
  const handleLogout = () => {};

  const isProductModalOpen = useSelector((state) => state.modal.isAddProductModalOpen);
  const isAuthorModalOpen = useSelector((state) => state.modal.isAddAuthorModalOpen);
  const isGenreModalOpen = useSelector((state) => state.modal.isAddGenreModalOpen);

  return (
    <>
      <UpdateProductModal isOpen={isProductModalOpen} />
      <UpdateAuthorModal isOpen={isAuthorModalOpen} />
      <UpdateGenreModal isOpen={isGenreModalOpen} />
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
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;
