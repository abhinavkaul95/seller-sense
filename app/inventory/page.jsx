"use client";

import { useEffect, useState } from "react";
import { Table, Tag, Spin } from "antd";
import Navbar from "../components/Navbar";
import { useTheme } from "next-themes";

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { resolvedTheme } = useTheme();

  // Fetch inventory
  useEffect(() => {
    fetch("/dummy/inventory.json")
      .then((res) => res.json())
      .then((data) => {
        setInventory(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  if (loading)
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          resolvedTheme === "dark" ? "bg-[#0B0F1A]" : "bg-gray-100"
        }`}
      >
        <Spin size="large" />
      </div>
    );

  const isDark = resolvedTheme === "dark";

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (text) => (
        <span
          className={
            isDark ? "font-medium text-white" : "font-medium text-gray-800"
          }
        >
          {text}
        </span>
      ),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
      render: (text) => (
        <span className={isDark ? "text-gray-400" : "text-gray-600"}>
          {text}
        </span>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (value) => (
        <span
          className={
            isDark ? "font-semibold text-white" : "font-semibold text-gray-800"
          }
        >
          {value}
        </span>
      ),
    },
    {
      title: "Velocity / day",
      dataIndex: "velocity",
      key: "velocity",
      render: (value) => <span className="text-indigo-400">{value}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colorMap = {
          Healthy: "green",
          "Low Stock": "orange",
          "Out of Stock": "red",
          Overstocked: "blue",
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: "AI Insight",
      dataIndex: "aiInsight",
      key: "aiInsight",
      render: (text) => (
        <span className={isDark ? "text-gray-300" : "text-gray-700"}>
          {text}
        </span>
      ),
    },
  ];

  return (
    <>
      <Navbar user={user} />
      <div
        className={`${
          isDark ? "bg-[#0B0F1A]" : "bg-gray-50"
        } min-h-screen px-8 py-10`}
      >
        <div className="mb-8">
          <h1
            className={
              isDark
                ? "text-3xl font-bold text-white"
                : "text-3xl font-bold text-gray-900"
            }
          >
            Inventory
          </h1>
          <p className={isDark ? "text-gray-400 mt-1" : "text-gray-600 mt-1"}>
            Monitor stock levels, velocity, and AI-driven recommendations.
          </p>
        </div>

        <div
          className={`rounded-xl overflow-hidden border ${
            isDark ? "border-white/10 bg-[#12172A]" : "border-gray-200 bg-white"
          }`}
        >
          <Table
            columns={columns}
            dataSource={inventory}
            rowKey="sku"
            pagination={false}
            className={`inventory-table ${
              isDark ? "bg-[#12172A]" : "bg-white"
            }`}
          />
        </div>
      </div>
    </>
  );
}
