import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { formatDate } from "../../../utils/helper";
import Spinner from "../../../components/spinner/spinner";
import axios from "axios";

const Invoice = () => {
  const orderId = new URLSearchParams(window.location.search).get("orderId");
  const [orderDetails, setOrderDetails] = useState();

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getOrderById/${orderId}`
      );
      setOrderDetails(response.data);
      console.log("orderDetails", await orderDetails);
    } catch (error) {
      console.error("Error fetching order details: ", error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  // State to control PDF download
  const [showPDF, setShowPDF] = useState(false);

  if (!orderDetails || orderDetails.length === 0) {
    return <Spinner message={"Loading invoice details..."} />;
  }

  return (
    <div className="bg-white border rounded-lg shadow-lg px-6 py-8 w-auto mx-auto mt-8">
      <h1
        className="font-bold text-2xl my-4 text-center"
        style={{ color: "#4C2B21" }}
      >
        Books & R
      </h1>

      {/* <span>{JSON.stringify(orderDetails)}</span> */}
      <hr className="mb-2" />
      <div className="flex justify-between mb-6">
        <h1 className="text-lg font-bold mr-10">Invoice</h1>
        <div className="text-gray-700">
          <div>Date: {formatDate(orderDetails?.orderDate)}</div>
          <div>Order Id: {orderId}</div>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4">Bill To:</h2>
        <div className="text-gray-700 mb-2">
          {orderDetails?.customer?.firstName +
            " " +
            orderDetails?.customer?.lastName}
        </div>
        <div className="text-gray-700 mb-2">
          {orderDetails?.address + " - " + orderDetails?.wardNumber}
        </div>
        <div className="text-gray-700 mb-2">{orderDetails?.district}</div>
        <div className="text-gray-700">{orderDetails?.customer?.email}</div>
      </div>
      <table className="w-full mb-8">
        <thead>
          <tr>
            <th className="text-left font-bold text-gray-700">Product</th>
            <th className="text-left font-bold text-gray-700">Quantity</th>
            <th className="text-right font-bold text-gray-700">Amount</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.products?.map((item, index) => (
            <tr key={index}>
              <td className="text-left text-gray-700">{item.product.name}</td>
              <td className="text-gray-700 text-center">{item.quantity}</td>
              <td className="text-right text-gray-700">
                Rs.{item.product.price * item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <hr className="mt-4 w-full" />
          <tr>
            <td className="text-left font-bold text-gray-700">Total</td>
            <td className="text-left font-bold text-gray-700"></td>
            <td className="text-right font-bold text-gray-700">
              Rs.{orderDetails.totalPrice}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="text-gray-700 mb-2">Thank you for your order!</div>

      {/* PDF document for download */}

      <PDFDownloadLink
        document={<InvoicePDF orderDetails={orderDetails} />}
        fileName="invoice.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            "Loading document..."
          ) : (
            <div className="text-center">
              <button
                onClick={() => setShowPDF(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Download PDF
              </button>
            </div>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

// PDF representation of the Invoice component
const InvoicePDF = ({ orderDetails }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Books & R Invoice</Text>
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.text}>
          Date: {formatDate(orderDetails?.orderDate)}
        </Text>
        <Text style={styles.text}>Order Id: {orderDetails?._id}</Text>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={styles.text}>Bill To:</Text>
        <Text style={styles.text}>
          {orderDetails?.customer?.firstName +
            " " +
            orderDetails?.customer?.lastName}
        </Text>
        <Text style={styles.text}>
          {orderDetails?.address + " - " + orderDetails?.wardNumber}
        </Text>
        <Text style={styles.text}>{orderDetails?.district}</Text>
        <Text style={styles.text}>{orderDetails?.customer?.email}</Text>
      </View>
      <View style={{ display: "flex", justifyContent: "space-between" }}>
        <Text style={styles.text}>Product</Text>
        <Text style={styles.text}>Amount</Text>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.text}>Product 1</Text>
        <Text style={styles.text}>$100.00</Text>
      </View>

      <View>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.text}></Text>
        <Text style={styles.text}>$225.00</Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.text}>Thank you for your order!</Text>
      </View>
    </Page>
  </Document>
);

export default Invoice;

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#4C2B21",
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
  table: {
    width: "100%",
    border: "1px solid #000",
    borderCollapse: "collapse",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
    border: "1px solid #000",
    padding: 8,
  },
  tableRow: {
    border: "1px solid #000",
    padding: 8,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    textAlign: "left",
  },
  tableCell: {
    textAlign: "right",
  },
});
