import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "../lib/axios";
import Loading from "./Loading";
import { Users, Package, ShoppingCart, IndianRupee } from "lucide-react";
import SkeletonCard from "./SkeletonCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [dailySalesData, setDailySalesData] = useState([]);
  useEffect(() => {
    const fetchMyAnalytics = async () => {
      try {
        const response = await axios.get("/analytics");
        setAnalyticsData(response.data.analyticsData);
        setDailySalesData(response.data.dailySalesData);
      } catch (error) {
        console.log("Error fetching analytics", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyAnalytics();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <AnalyticsCard
              title="Total Users"
              value={analyticsData.users.toLocaleString()}
              icon={Users}
              color="from-indigo-400 to-purple-600"
            />
            <AnalyticsCard
              title="Total Products"
              value={analyticsData.products.toLocaleString()}
              icon={Package}
              color="from-blue-400 to-cyan-500"
            />
            <AnalyticsCard
              title="Total Sales"
              value={analyticsData.totalSales.toLocaleString()}
              icon={ShoppingCart}
              color="from-green-400 to-teal-600"
            />
            <AnalyticsCard
              title="Total Revenue"
              value={`₹${analyticsData.totalRevenue.toLocaleString()}`}
              icon={IndianRupee}
              color="from-amber-500 to-orange-600"
            />
          </>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="bg-gray-800/60 rounded-lg p-6 shadow-lg"
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#D1D5DB" />
            <YAxis yAxisId="left" stroke="#D1D5DB" />
            <XAxis yAxisId="right" orientation="right" stroke="#D1D5DB" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#10B981"
              activeDot={{ r: 8 }}
              name="Sales"
            />{" "}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#10B981"
              activeDot={{ r: 8 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-800 shadow-xl rounded-lg overflow-hidden relative p-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-300 text-sm mb-1 font-semibold">{title}</p>
          <h3 className="text-white text-3xl font-bold">{value}</h3>
        </div>
        <Icon className="h-12 w-12 text-gray-300" />
      </div>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-30`}
      />
    </motion.div>
  );
};
