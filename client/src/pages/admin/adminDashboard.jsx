import { useEffect, useState } from "react";

// import { useSelector } from "react-redux";
import CustomButton from "../../components/buttons/CustomButton";
import Tab from "../../components/admin/Tab";
import AddProduct from "../../pages/admin/contents/AddProduct";
import AddAuthor from "./contents/AddAuthor";
import AddGenre from "./contents/AddGenre";
import Product from "./contents/Product";

const AdminDashboard = () => {
  const tab = localStorage.getItem("adminActiveTab");
  const [activeTab, setActiveTab] = useState(tab ? tab : "Add Product");
  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
    localStorage.setItem("adminActiveTab", tabTitle);
  };
  const handleLogout = () => {};

  return (
    <>
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
              title={"Add Product"}
              onClick={handleTabClick}
              isActive={activeTab === "Add Product"}
            />
            <Tab
              title={"Add Author"}
              onClick={handleTabClick}
              isActive={activeTab === "Add Author"}
            />
            <Tab
              title={"Add Genre"}
              onClick={handleTabClick}
              isActive={activeTab === "Add Genre"}
            />
             <Tab
              title={"Product"}
              onClick={handleTabClick}
              isActive={activeTab === "Product"}
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
          {activeTab === "Add Product" && <AddProduct />}
          {activeTab === "Add Author" && <AddAuthor />}
          {activeTab === "Add Genre" && <AddGenre />}
          {activeTab === "Product" && <Product />}
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;
