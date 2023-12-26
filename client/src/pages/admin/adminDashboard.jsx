import { useEffect, useState } from "react";

// import { useSelector } from "react-redux";
import CustomButton from "../../components/buttons/CustomButton";
import Tab from "../../components/admin/Tab";
// import AddProduct from "./contents/addProduct";

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
              title={"Inventory"}
              onClick={handleTabClick}
              isActive={activeTab === "Inventory"}
            />
            <Tab
              title={"Add Ingredients"}
              onClick={handleTabClick}
              isActive={activeTab === "Add Ingredients"}
            />
          </div>
          <CustomButton name="Logout" onClick={handleLogout} />
        </aside>
        <section
          style={{
            padding: "128px 32px",
            flex: 1,
            display: "flex",
            borderRadius: "6px",
            backgroundColor: "#FDFBF7",
            width: "100%",
            height: "635px",
            overflowY: "auto",
          }}
        >
          {/* {activeTab === "Add Product" && <AddProduct />} */}
          {/* {activeTab === "Inventory" && <Inventory />}
          {activeTab === "Add Ingredients" && <AddIngredients />} */}
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;
