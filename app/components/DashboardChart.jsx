"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Card } from "antd";

export default function DashboardChart({
  title,
  data,
  dataKeyX = "name",
  dataKeyY = "value",
  type = "line", // 'line', 'bar', 'area'
  isDark = false,
}) {
  const commonProps = {
    data,
    margin: { top: 10, right: 20, left: 0, bottom: 0 },
  };

  let chart;
  switch (type) {
    case "bar":
      chart = (
        <BarChart {...commonProps}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#2c2c2c" : "#eaeaea"}
          />
          <XAxis dataKey={dataKeyX} stroke={isDark ? "#fff" : "#000"} />
          <YAxis stroke={isDark ? "#fff" : "#000"} />
          <Tooltip />
          <Bar dataKey={dataKeyY} fill="#6366F1" />
        </BarChart>
      );
      break;
    case "area":
      chart = (
        <AreaChart {...commonProps}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#2c2c2c" : "#eaeaea"}
          />
          <XAxis dataKey={dataKeyX} stroke={isDark ? "#fff" : "#000"} />
          <YAxis stroke={isDark ? "#fff" : "#000"} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey={dataKeyY}
            stroke="#6366F1"
            fill="#6366F1"
          />
        </AreaChart>
      );
      break;
    default:
      chart = (
        <LineChart {...commonProps}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? "#2c2c2c" : "#eaeaea"}
          />
          <XAxis dataKey={dataKeyX} stroke={isDark ? "#fff" : "#000"} />
          <YAxis stroke={isDark ? "#fff" : "#000"} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataKeyY} stroke="#6366F1" />
        </LineChart>
      );
      break;
  }

  return (
    <Card
      title={title}
      className={isDark ? "bg-[#12172A] text-white" : "bg-white text-gray-900"}
      variant="borderless"
    >
      <ResponsiveContainer width="100%" height={300}>
        {chart}
      </ResponsiveContainer>
    </Card>
  );
}
