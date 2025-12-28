"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Sparkles,
  ShieldCheck,
  BarChart3,
  MessageSquareText,
} from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
import { useTheme } from "next-themes";
const { Title, Text } = Typography;

function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ width: "100%" }}>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_40%)]" />
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.25),transparent_40%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-36 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 items-center text-white">
        {" "}
        {/* LEFT: COPY */}
        <div className="text-center lg:text-left">
          <h1 className="text-5xl  font-extrabold leading-tight mb-6">
            Turn marketplace chaos
            <br />
            into AI-driven growth
          </h1>

          <p className="text-xl opacity-90 ">
            Seller Sense connects Amazon, eBay & more into one AI intelligence
            layer. Insights, reviews, automation, and actions that grow revenue.
          </p>

          <div className="mt-10 flex gap-4 justify-center lg:justify-start">
            <a
              href="/signup"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 hover:bg-gray-100 transition"
            >
              Get started free
            </a>
            <a
              href="#features"
              className="rounded-xl border border-white/40 px-6 py-3 font-semibold hover:bg-white/10 transition"
            >
              See how it works
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-10 flex items-center gap-6 text-sm opacity-80 justify-center lg:justify-start">
            <span>Trusted by modern sellers</span>
            <span>•</span>
            <span>No credit card required</span>
          </div>
        </div>
        {/* RIGHT: FAKE DASHBOARD PREVIEW */}
        <div className="relative">
          <div className="absolute -inset-6 rounded-3xl bg-white/20 blur-2xl" />

          <div className="relative rounded-3xl bg-white shadow-2xl overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b bg-gray-50">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">
                  AI Insights Overview
                </h3>
                <span className="text-xs text-green-600 font-semibold">
                  ● Live
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-xl bg-indigo-50 p-4">
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="text-lg font-bold text-gray-800">$128,430</p>
                </div>
                <div className="rounded-xl bg-purple-50 p-4">
                  <p className="text-xs text-gray-500">Reviews</p>
                  <p className="text-lg font-bold text-gray-800">4.6 ★</p>
                </div>
                <div className="rounded-xl bg-pink-50 p-4">
                  <p className="text-xs text-gray-500">AI Actions</p>
                  <p className="text-lg font-bold text-gray-800">23</p>
                </div>
              </div>

              <div className="rounded-xl border p-4">
                <p className="text-sm text-gray-700">
                  🔍 AI detected repeated complaints about packaging quality on
                  ASIN B08XYZ. Recommended supplier review.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      icon: BarChart3,
      title: "Unified Marketplace Data",
      desc: "Pull orders, listings, inventory, reviews, and performance metrics into a single source of truth.",
    },
    {
      icon: Sparkles,
      title: "AI-Driven Insights",
      desc: "Detect trends, predict demand, surface risks, and turn raw data into business-ready insights.",
    },
    {
      icon: MessageSquareText,
      title: "Smart Review Automation",
      desc: "Monitor reviews and comments in real time and generate compliant, brand-safe AI responses.",
    },
    {
      icon: ShieldCheck,
      title: "Trust & Control",
      desc: "Human-in-the-loop automation with marketplace-safe actions and full seller control.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-900">
        Built for serious e-commerce growth
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((f, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white shadow-lg p-6 hover:shadow-xl transition"
          >
            <f.icon className="h-10 w-10 text-indigo-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-gray-900">
              {f.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AuthForms({ onSignin, showSignup, setShowSignup }) {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      if (showSignup) {
        const res = await axios.post("/api/auth/signup", form);
        setSuccess("Signup successful!");
        localStorage.setItem("token", res.data.token);
        onSignin(res.data.user);
      } else {
        const res = await axios.post("/api/auth/signin", form);
        setSuccess("Signin successful!");
        localStorage.setItem("token", res.data.token);
        onSignin(res.data.user);
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          (showSignup ? "Signup failed" : "Signin failed")
      );
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
        {showSignup ? "Sign Up" : "Sign In"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {showSignup && (
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
          disabled={loading}
        >
          {loading
            ? showSignup
              ? "Signing up..."
              : "Signing in..."
            : showSignup
            ? "Sign Up"
            : "Sign In"}
        </button>
        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
        {success && (
          <div className="text-green-600 mt-4 text-center">{success}</div>
        )}
      </form>
      <div className="mt-6 text-center">
        <button
          type="button"
          className="text-blue-700 hover:underline font-semibold"
          onClick={() => setShowSignup((v) => !v)}
        >
          {showSignup
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}

function Welcome({ user }) {
  const { resolvedTheme } = useTheme();

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
  return (
    <>
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

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  return process.env.NEXT_PUBLIC_DEFAULT_THEME === "dark" ? "dark" : "light";
}

export default function Home() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleSignout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleProfile = () => {
    alert("Profile page coming soon!");
  };

  const handleSignin = (user) => {
    setUser(user);
    setShowAuth(false);
  };

  const handleShowSignin = () => {
    setShowAuth(true);
    setShowSignup(false);
  };

  const handleShowSignup = () => {
    setShowAuth(true);
    setShowSignup(true);
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-[#0B0F1A]"
          : "bg-gradient-to-br from-blue-50 to-purple-100"
      }`}
    >
      <Navbar
        user={user}
        onSignin={handleShowSignin}
        onSignup={handleShowSignup}
        onSignout={handleSignout}
        onProfile={handleProfile}
        theme={theme}
        setTheme={setTheme}
      />
      {!user ? (
        <div className="flex flex-col items-center justify-center px-2">
          <Hero onSigninClick={handleShowSignin} />
          <Features />
          {showAuth && (
            <AuthForms
              onSignin={handleSignin}
              showSignup={showSignup}
              setShowSignup={setShowSignup}
            />
          )}
        </div>
      ) : (
        <Welcome user={user} />
      )}
      <Footer />
    </div>
  );
}
