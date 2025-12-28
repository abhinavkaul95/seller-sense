"use client";
import { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Statistic } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  ArrowDownOutlined,
  StarOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  MessageOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import Navbar from "../components/Navbar";
import { useTheme } from "next-themes";
const { Title, Text } = Typography;

const kpis = [
  {
    title: "Total Revenue",
    value: "$124,540",
    prefix: <DollarOutlined />,
    change: "+12%",
    positive: true,
  },
  {
    title: "Orders",
    value: "3,248",
    prefix: <ShoppingCartOutlined />,
    change: "+8%",
    positive: true,
  },
  {
    title: "Avg Rating",
    value: "4.6",
    prefix: <StarOutlined />,
    change: "+0.2",
    positive: true,
  },
  {
    title: "New Reviews",
    value: "412",
    prefix: <MessageOutlined />,
    change: "+21%",
    positive: true,
  },
  {
    title: "Refund Rate",
    value: "2.1%",
    prefix: <ArrowDownOutlined />,
    change: "-0.4%",
    positive: true,
  },
  {
    title: "AI Actions",
    value: "186",
    prefix: <ThunderboltOutlined />,
    change: "+34%",
    positive: true,
  },
];

const revenueData = [
  { day: "Mon", revenue: 12000 },
  { day: "Tue", revenue: 14500 },
  { day: "Wed", revenue: 13800 },
  { day: "Thu", revenue: 16000 },
  { day: "Fri", revenue: 18200 },
  { day: "Sat", revenue: 21000 },
  { day: "Sun", revenue: 19000 },
];

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  // Load user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  if (loading) return null; // or a skeleton loader
  if (!user) return <p>Please sign in</p>; // optional

  return (
    <>
      <Navbar user={user} />
      <div
        className={`min-h-screen ${
          resolvedTheme === "dark"
            ? "bg-[#0B0F1A] text-white"
            : "bg-gradient-to-br from-blue-50 to-purple-100 text-gray-900"
        } px-8 py-10`}
      >
        {/* Header */}
        <div className="mb-10">
          <Title
            level={2}
            style={{
              color: resolvedTheme === "dark" ? "white" : "#1e293b",
              marginBottom: 4,
            }}
          >
            Welcome back, {user?.name}
          </Title>
          <Text
            style={{ color: resolvedTheme === "dark" ? "#9CA3AF" : "#64748b" }}
          >
            Here’s what’s happening across your marketplaces today.
          </Text>
        </div>
        {/* KPI Cards */}
        <Row gutter={[24, 24]} className="mb-12">
          {kpis.map((kpi) => (
            <Col xs={24} sm={12} lg={8} xl={4} key={kpi.title}>
              <Card
                variant="borderless"
                className={
                  resolvedTheme === "dark"
                    ? "bg-[#12172A] rounded-xl"
                    : "bg-white rounded-xl shadow-md"
                }
              >
                <Statistic
                  title={
                    <span
                      className={
                        resolvedTheme === "dark"
                          ? "text-gray-400"
                          : "text-gray-500"
                      }
                    >
                      {kpi.title}
                    </span>
                  }
                  value={kpi.value}
                  prefix={kpi.prefix}
                  styles={{
                    content: {
                      color: resolvedTheme === "dark" ? "white" : "#1e293b",
                    },
                  }}
                />
                <Text
                  className={
                    kpi.positive
                      ? resolvedTheme === "dark"
                        ? "text-green-400"
                        : "text-green-600"
                      : resolvedTheme === "dark"
                      ? "text-red-400"
                      : "text-red-600"
                  }
                >
                  {kpi.change} this week
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
        {/* AI Insights */}
        <div className="mb-12">
          <Title
            level={4}
            style={{ color: resolvedTheme === "dark" ? "white" : "#1e293b" }}
          >
            AI Insights
          </Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card
                variant="borderless"
                className={
                  resolvedTheme === "dark"
                    ? "bg-[#12172A] rounded-xl"
                    : "bg-white rounded-xl shadow-md"
                }
              >
                <Text
                  className={
                    resolvedTheme === "dark"
                      ? "text-indigo-400"
                      : "text-indigo-600" + " font-semibold"
                  }
                >
                  Opportunity
                </Text>
                <Title
                  level={5}
                  style={{
                    color: resolvedTheme === "dark" ? "white" : "#1e293b",
                  }}
                >
                  Increase weekend pricing by 5–7%
                </Title>
                <Text
                  className={
                    resolvedTheme === "dark" ? "text-gray-400" : "text-gray-500"
                  }
                >
                  Demand spikes on Saturdays with minimal refund impact. AI
                  estimates an additional $4.2k/month.
                </Text>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card
                variant="borderless"
                className={
                  resolvedTheme === "dark"
                    ? "bg-[#12172A] rounded-xl"
                    : "bg-white rounded-xl shadow-md"
                }
              >
                <Text
                  className={
                    resolvedTheme === "dark"
                      ? "text-pink-400"
                      : "text-pink-600" + " font-semibold"
                  }
                >
                  Risk
                </Text>
                <Title
                  level={5}
                  style={{
                    color: resolvedTheme === "dark" ? "white" : "#1e293b",
                  }}
                >
                  Negative reviews rising for SKU-204
                </Title>
                <Text
                  className={
                    resolvedTheme === "dark" ? "text-gray-400" : "text-gray-500"
                  }
                >
                  AI suggests automated responses and listing copy optimization
                  to protect rating.
                </Text>
              </Card>
            </Col>
          </Row>
        </div>
        {/* Charts */}
        <div>
          <Title
            level={4}
            style={{ color: resolvedTheme === "dark" ? "white" : "#1e293b" }}
          >
            Revenue Trend
          </Title>
          <Card
            variant="borderless"
            className={
              resolvedTheme === "dark"
                ? "bg-[#12172A] rounded-xl"
                : "bg-white rounded-xl shadow-md"
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <XAxis
                  dataKey="day"
                  stroke={resolvedTheme === "dark" ? "#9CA3AF" : "#64748b"}
                />
                <YAxis
                  stroke={resolvedTheme === "dark" ? "#9CA3AF" : "#64748b"}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366F1"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </>
  );
}
