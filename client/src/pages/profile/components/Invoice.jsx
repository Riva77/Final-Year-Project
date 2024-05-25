import {
  Document,
  Image,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import Spinner from "../../../components/spinner/Spinner";
import { formatDate, formatDateWithoutTime } from "../../../utils/helper";

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
        {/* <div className="text-gray-700 mb-2">
          {orderDetails?.address + " - " + orderDetails?.wardNumber}
        </div>
        <div className="text-gray-700 mb-2">{orderDetails?.district}</div> */}
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
      <Image style={styles.logo} src={logo} />

      <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>Order Invoice</Text>
      </View>

      <Fragment>
        <View style={styles.invoiceNoContainer}>
          <Text style={styles.label}>Invoice No:</Text>
          <Text style={styles.invoiceDate}>{orderDetails._id}</Text>
        </View>
        <View style={styles.invoiceDateContainer}>
          <Text style={styles.label}>Date: </Text>
          <Text>{formatDateWithoutTime(orderDetails?.orderDate)}</Text>
        </View>
      </Fragment>

      <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Bill To:</Text>
        <Text>
          {orderDetails?.customer?.firstName +
            " " +
            orderDetails?.customer?.lastName}
        </Text>

        <Text>{orderDetails?.phoneNumber}</Text>
        <Text>{orderDetails?.customer.email}</Text>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.container}>
          <Text style={styles.description}>Item Description</Text>
          <Text style={styles.qty}>Quantity</Text>
          <Text style={styles.rate}>Unit Price</Text>
          <Text style={styles.amount}>Amount</Text>
        </View>

        <Fragment>
          {orderDetails?.products.map((item, index) => (
            <View style={rowStyles.row} key={index}>
              <Text style={rowStyles.description}>{item.product.name}</Text>
              <Text style={rowStyles.qty}>{item.quantity}</Text>
              <Text style={rowStyles.rate}>{item.product.price}</Text>
              <Text style={rowStyles.amount}>
                Rs.{(item.quantity * item.product.price).toFixed(2)}
              </Text>
            </View>
          ))}
        </Fragment>

        {/* <InvoiceTableBlankSpace
          rowsCount={tableRowsCount - invoice.items.length}
        /> */}

        <View style={footerStyles.row}>
          <Text style={footerStyles.description}>TOTAL</Text>
          <Text style={footerStyles.total}>
            Rs.{orderDetails?.totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={thankStyles.titleContainer}>
        <Text style={thankStyles.reportTitle}>Thank you for your order.</Text>
      </View>
    </Page>
  </Document>
);

export default Invoice;

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: "auto",
    marginRight: "auto",
  },

  titleContainer: {
    flexDirection: "row",
    marginTop: 24,
  },
  reportTitle: {
    color: "#4C2B21",
    letterSpacing: 4,
    fontSize: 25,
    textAlign: "center",
    textTransform: "uppercase",
  },
  invoiceNoContainer: {
    flexDirection: "row",
    marginTop: 36,
    justifyContent: "flex-end",
  },
  invoiceDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  invoiceDate: {
    fontSize: 12,
    fontStyle: "bold",
  },
  label: {
    width: 60,
  },
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Helvetica-Oblique",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#4C2B21",
  },

  container: {
    flexDirection: "row",
    borderBottomColor: "#4C2B21",
    backgroundColor: "#4C2B21",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    color: "white",
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  description: {
    width: "60%",
    borderRightColor: "#4C2B21",
    color: "white",
    borderRightWidth: 1,
  },
  qty: {
    width: "10%",
    borderRightColor: "#4C2B21",
    color: "white",
    borderRightWidth: 1,
  },
  rate: {
    width: "15%",
    borderRightColor: "#4C2B21",
    color: "white",
    borderRightWidth: 1,
  },
  amount: {
    width: "15%",
    color: "white",
  },
});

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#4C2B21",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  description: {
    width: "60%",
    textAlign: "left",
    borderRightColor: "#4C2B21",
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: "10%",
    borderRightColor: "#4C2B21",
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  rate: {
    width: "15%",
    borderRightColor: "#4C2B21",
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  amount: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const footerStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#4C2B21",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    fontStyle: "bold",
  },
  description: {
    width: "85%",
    textAlign: "right",
    borderRightColor: "#4C2B21",
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const thankStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  reportTitle: {
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
