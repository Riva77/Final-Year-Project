import React, { useEffect, useState } from "react";
import StatsCard from "../../../components/admin/StatsCard";
import axios from "axios";
import Spinner from "../../../components/Spinner/Spinner";

const Dashboard = () => {
  const [blogStats, setBlogStats] = useState([]);
  const [orderStats, setOrderStats] = useState([]);

  const fetchData = async () => {
    try {
      const fetchBlog = await axios.get(
        "http://localhost:8000/api/getBlogStats"
      );
      setBlogStats(fetchBlog.data);

      const fetchOrder = await axios.get(
        "http://localhost:8000/api/getOrderStats"
      );
      setOrderStats(fetchOrder.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return blogStats.length > 0 || orderStats.length > 0 ? (
    <div className="w-full flex flex-col gap-10">
      <section className="flex flex-col w-full gap-5">
        <h1 className="text-xl font-semibold">Blogs Stats</h1>
        <div className="flex justify-start gap-5 w-full">
          {blogStats?.map((stat, index) => (
            <StatsCard key={index} title={stat.title} stat={stat.blog} />
          ))}
        </div>
      </section>
      <section className="flex flex-col w-full gap-5">
        <h1 className="text-xl font-semibold">Order Stats</h1>
        <div className="flex justify-start gap-5 w-full">
          {orderStats?.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              stat={(stat.title === "Total Orders" ? "" : "Rs. ") + stat.order}
            />
          ))}
        </div>
      </section>
    </div>
  ) : (
    <Spinner />
  );
};

export default Dashboard;
