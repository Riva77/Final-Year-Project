import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import UpdateProductModal from "./contents/UpdateProductModal";
import UpdateAuthorModal from "./contents/UpdateAuthorModal";
import UpdateGenreModal from "./contents/UpdateGenreModal";
import ViewOrderModal from "./contents/ViewOrderModal";
import EditProductModal from "./contents/EditProductModal";
import { adminRoutes } from "../../routes/adminDashboardRoutes";
import { Outlet, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const path = window.location.pathname
    .replace("/admin/", "")
    .replace("-", " ");

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

  const selectedProduct = useSelector((state) => state.selectedProduct);
  const isSelectedProductModalOpen =
    selectedProduct.isSelected && selectedProduct.productType === "product";

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
          height: "91.5vh",
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
            {/* <span> {JSON.stringify(path)}</span> */}
            {adminRoutes.map((route, k) => {
              return (
                <div
                  onClick={() => navigate(route.path)}
                  key={k}
                  className={`${
                    route.name.toLowerCase() == path
                      ? "bg-[#4C2B21] text-white"
                      : "text-black"
                  } px-4 flex  font-medium , text-md cursor-pointer rounded-md w-full items-center mb-2 py-5 hover:bg-[#4C2B21] hover:text-white `}
                >
                  {route.icon}
                  {route.name}
                </div>
              );
            })}
          </div>
          {/* <CustomButton name="Logout" onClick={handleLogout} /> */}
        </aside>
        <section
          className="cool-scroll"
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
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default AdminDashboard;
