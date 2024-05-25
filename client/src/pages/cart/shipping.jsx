import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../apis/order/createOrder";
import CustomButton from "../../components/buttons/CustomButton";
import Dropdown from "../../components/sliderAndDropdown/Dropdown";
import { toastError, toastLoading, toastSuccess } from "../../utils/toast";
import { fetchCartItems } from "../../features/cartSlice";

const Shipping = () => {
  const order = JSON.parse(localStorage.getItem("orderData"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ...order,
    phoneNumber: "",
    district: "",
    address: "",
    wardNumber: "",
    paymentType: "Cash On Delivery",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkoutHandler = async () => {
    const requiredFields = ["phoneNumber", "district", "address", "wardNumber"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      // Handle missing fields
      toastError("Please fill in all the required fields.");
      return;
    }

    // Check if phone number and ward number contain only numbers
    const phoneNumberRegex = /^[0-9]+$/;
    if (!phoneNumberRegex.test(formData.phoneNumber)) {
      // Handle invalid phone number
      toastError("Phone number should contain only numbers.");
      return;
    }

    // Form data validation
    if (!formData.phoneNumber.match(/^\d{10}$/)) {
      // Check if phone number has exactly 10 digits
      toastError("Phone number should contain exactly 10 digits");
      return; // Exit the function if validation fails
    }

    if (!phoneNumberRegex.test(formData.wardNumber)) {
      // Handle invalid ward number
      toastError("Ward number should contain only numbers.");
      return;
    }



    for (const key in formData) {
      if (key==='wardNumber' || key === "customer" || key==="products" || key=== "totalPrice")  continue ;
     
      if (formData[key].trim() === "") {
        toastError("Please fill all the fields");
        return;
      }
    }

    const response = await createOrder(formData);
    console.log("cartFormData: ", formData);
    console.log("khaltiResponse ", response);
    if (response.success && response.data.type === "khalti") {
      localStorage.setItem("orderId", response.data.order_id);
      toastLoading(response.data.message);
      localStorage.removeItem("orderData");
      window.location.href = response.data.data.payment_url;
      dispatch(fetchCartItems());
    } else if (response.success && response.data.type === "cash") {
      localStorage.removeItem("orderData");
      dispatch(fetchCartItems());
      navigate("/cart");
      toastSuccess("Order placed successfully");
    } else {
      console.log(response);
    }
  };

  return (
    <div>
      <section style={styles.outerSection}>

        <section style={styles.innerSection}>
        {/* <span>{JSON.stringify(formData)}</span> */}
          <div className="w-full my-2 flex flex-col gap-4 ">
            <h1 className="flex text-xl font-medium border-b-2 border-b-gray-200 mb-5 pb-2 items-center">
              Shipping Details
            </h1>
          </div>
          <div className="flex justify-center">
            <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md ">
              <div className="rounded shadow p-6">
                <div className="pb-6">
                  <label className="font-semibold text-gray-700 block pb-1">
                    Phone Number
                  </label>
                  <div className="flex">
                    <input
                      id="phonenumber"
                      className="border-1 rounded-r px-4 py-2 w-full"
                      name="phoneNumber"
                      type="text"
                      value={formData.phoneNumber}
                      onChange={changeHandler}
                    />
                  </div>
                </div>
                <div className="pb-6">
                  <label className="font-semibold text-gray-700 block pb-1">
                    District
                  </label>
                  <div className="flex">
                    <input
                      id="district"
                      className="border-1 rounded-r px-4 py-2 w-full"
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={changeHandler}
                    />
                  </div>
                </div>
                <div className="pb-6">
                  <label className="font-semibold text-gray-700 block pb-1">
                    Address
                  </label>
                  <div className="flex">
                    <input
                      id="address"
                      className="border-1 rounded-r px-4 py-2 w-full"
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={changeHandler}
                    />
                  </div>
                </div>
                <div className="pb-4">
                  <label className="font-semibold text-gray-700 block pb-1">
                    Ward Number
                  </label>
                  <input
                    id="wardnumber"
                    className="border-1 rounded-r px-4 py-2 w-full"
                    type="text"
                    name="wardNumber"
                    value={formData.wardNumber}
                    onChange={changeHandler}
                  />
                </div>

                <Dropdown
                  items={["Cash On Delivery", "Khalti"]}
                  name={"paymentType"}
                  onChange={changeHandler}
                  value={formData.paymentType}
                />
              </div>
              <div className="flex justify-center pt-7">
                <CustomButton name={"Checkout"} onClick={checkoutHandler} />
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Shipping;

const styles = {
  outerSection: {
    background: "#F1EEE3",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
  },

  innerSection: {
    background: "#FDFBF7",
    width: "1100px",
    height: "100vh",
    padding: "60px ",
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
};
