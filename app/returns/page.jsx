"use client";

import { useEffect, useState } from "react";
import { Card, Tag, Spin } from "antd";
import Navbar from "../components/Navbar";
import { useTheme } from "next-themes";

export default function RefundsPage() {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  // Fetch refunds data
  useEffect(() => {
    fetch("/dummy/returns.json")
      .then((res) => res.json())
      .then((data) => {
        setRefunds(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

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

  const riskColorMap = {
    "LOW RISK": "green",
    "MEDIUM RISK": "orange",
    "HIGH RISK": "red",
  };

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
            Returns & Refunds
          </h1>
          <p className={isDark ? "text-gray-400 mt-1" : "text-gray-600 mt-1"}>
            Monitor refund patterns, detect risks, and get AI-driven insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {refunds.map((refund) => (
            <Card
              key={refund.refundId}
              className={`rounded-xl p-6 shadow-md transition ${
                isDark
                  ? "bg-[#12172A] border border-white/10"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className={
                    isDark
                      ? "text-gray-300 font-semibold"
                      : "text-gray-800 font-semibold"
                  }
                >
                  {refund.refundId}
                </span>
                <Tag color={riskColorMap[refund.risk]}>{refund.risk}</Tag>
              </div>
              <div className="mb-2">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Reason:{" "}
                </span>
                <span
                  className={
                    isDark
                      ? "text-white font-medium"
                      : "text-gray-800 font-medium"
                  }
                >
                  {refund.reason}
                </span>
              </div>
              <div className="mb-2">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Customer:{" "}
                </span>
                <span
                  className={
                    isDark
                      ? "text-white font-medium"
                      : "text-gray-800 font-medium"
                  }
                >
                  {refund.customer}
                </span>
              </div>
              <div className="mb-2">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Email:{" "}
                </span>
                <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                  {refund.email}
                </span>
              </div>
              <div className="mb-2">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Amount:{" "}
                </span>
                <span
                  className={
                    isDark
                      ? "text-white font-semibold"
                      : "text-gray-800 font-semibold"
                  }
                >
                  ${refund.amount}
                </span>
              </div>
              <div className="mb-4">
                <span className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Date:{" "}
                </span>
                <span className={isDark ? "text-gray-300" : "text-gray-700"}>
                  {refund.date}
                </span>
              </div>
              <div className={isDark ? "text-gray-300" : "text-gray-700"}>
                {refund.aiInsight}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
