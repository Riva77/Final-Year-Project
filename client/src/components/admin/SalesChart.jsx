import Spinner from "../spinner/Spinner";
import { useEffect, useState } from "react";
import axios from "axios";

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);

  const getSalesData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/getSalesByMonth"
      );
      console.log(response);
      setSalesData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSalesData();
  }, []);

  const xAxisData = salesData?.map((entry) => entry.month);
  const yAxisData = salesData?.map((entry) => entry.totalSales);

  return salesData.length == 0 ? (
    <Spinner message={"Loading Sales Chart..."} />
  ) : (
    <span>{JSON.stringify(yAxisData)}</span>
  );
};

export default SalesChart;
