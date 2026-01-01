"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import DashboardChart from "../components/DashboardChart";
import Navbar from "../components/Navbar";

import { Spin } from "antd";
export default function TrendsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Fetch tickets from public folder
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  // Example datasets
  const salesData = [
    { month: "Jan", value: 4000 },
    { month: "Feb", value: 3000 },
    { month: "Mar", value: 5000 },
    { month: "Apr", value: 4500 },
  ];

  const revenueData = [
    { month: "Jan", value: 2000 },
    { month: "Feb", value: 2500 },
    { month: "Mar", value: 3000 },
    { month: "Apr", value: 2800 },
  ];

  const refundsData = [
    { month: "Jan", value: 50 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 70 },
    { month: "Apr", value: 30 },
  ];

  const inventoryData = [
    { product: "Wireless Charger", value: 35 },
    { product: "Smart Watch Band", value: 18 },
    { product: "Earbuds Pro", value: 45 },
  ];

  const velocityData = [
    { product: "Wireless Charger", value: 18.7 },
    { product: "Smart Watch Band", value: 15.2 },
    { product: "Earbuds Pro", value: 12.5 },
  ];

  // Array of chart configs
  const charts = [
    {
      title: "Sales Over Time",
      type: "line",
      data: salesData,
      dataKeyX: "month",
      dataKeyY: "value",
    },
    {
      title: "Revenue Over Time",
      type: "bar",
      data: revenueData,
      dataKeyX: "month",
      dataKeyY: "value",
    },
    {
      title: "Refunds Over Time",
      type: "line",
      data: refundsData,
      dataKeyX: "month",
      dataKeyY: "value",
    },
    {
      title: "Inventory Levels",
      type: "bar",
      data: inventoryData,
      dataKeyX: "product",
      dataKeyY: "value",
    },
    {
      title: "Stock Velocity",
      type: "area",
      data: velocityData,
      dataKeyX: "product",
      dataKeyY: "value",
    },
    {
      title: "Top Selling Product",
      type: "bar",
      data: salesData,
      dataKeyX: "month",
      dataKeyY: "value",
    },
    {
      title: "Revenue vs Refunds",
      type: "line",
      data: revenueData,
      dataKeyX: "month",
      dataKeyY: "value",
    },
    {
      title: "Customer Returns",
      type: "line",
      data: refundsData,
      dataKeyX: "month",
      dataKeyY: "value",
    },
    {
      title: "Inventory Turnover",
      type: "area",
      data: velocityData,
      dataKeyX: "product",
      dataKeyY: "value",
    },
    {
      title: "Monthly Profit",
      type: "bar",
      data: revenueData,
      dataKeyX: "month",
      dataKeyY: "value",
    },
    {
      title: "High Risk Refunds",
      type: "line",
      data: refundsData,
      dataKeyX: "month",
      dataKeyY: "value",
    },
    {
      title: "AI Insights Trends",
      type: "area",
      data: salesData,
      dataKeyX: "month",
      dataKeyY: "value",
    },
    {
      title: "Orders vs Returns",
      type: "line",
      data: salesData,
      dataKeyX: "month",
      dataKeyY: "value",
    },
    {
      title: "Warehouse Stock Levels",
      type: "bar",
      data: inventoryData,
      dataKeyX: "product",
      dataKeyY: "value",
    },
    {
      title: "Customer Satisfaction Trends",
      type: "line",
      data: revenueData,
      dataKeyX: "month",
      dataKeyY: "value",
    },
    {
      title: "Promotion Impact",
      type: "area",
      data: velocityData,
      dataKeyX: "product",
      dataKeyY: "value",
    },
    {
      title: "Backorders",
      type: "bar",
      data: inventoryData,
      dataKeyX: "product",
      dataKeyY: "value",
    },
    {
      title: "Daily Orders",
      type: "line",
      data: salesData,
      dataKeyX: "month",
      dataKeyY: "value",
    },
    {
      title: "Revenue by Region",
      type: "bar",
      data: revenueData,
      dataKeyX: "month",
      dataKeyY: "value",
    },
    {
      title: "AI Forecast vs Actual",
      type: "area",
      data: velocityData,
      dataKeyX: "product",
      dataKeyY: "value",
    },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f"];

  if (loading)
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          isDark ? "bg-[#0B0F1A]" : "bg-gray-100"
        }`}
      >
        <Spin size="large" />
      </div>
    );
  return (
    <>
      <Navbar user={user} />
      <div
        className={`min-h-screen px-8 py-10 ${
          isDark ? "bg-[#0B0F1A]" : "bg-gray-50"
        }`}
      >
        <h1
          className={
            isDark
              ? "text-3xl font-bold text-white"
              : "text-3xl font-bold text-gray-900"
          }
        >
          Trends & Insights
        </h1>
        <p className={isDark ? "text-gray-400 mt-1" : "text-gray-600 mt-1"}>
          Visualize key metrics and seller trends over time
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {charts.map((chart, index) => (
            <DashboardChart
              key={index}
              title={chart.title}
              type={chart.type}
              data={chart.data}
              dataKeyX={chart.dataKeyX}
              dataKeyY={chart.dataKeyY}
              isDark={isDark}
            />
          ))}
        </div>
      </div>
    </>
  );
}
