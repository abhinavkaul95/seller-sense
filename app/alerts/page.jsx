"use client";

import { useState, useEffect } from "react";
import { Card, Tag, Spin, Timeline } from "antd";
import Navbar from "../components/Navbar";
import { useTheme } from "next-themes";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    fetch("/dummy/alerts.json")
      .then((res) => res.json())
      .then((data) => {
        setAlerts(data);
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
          Alert History
        </h1>
        <p className={isDark ? "text-gray-400 mt-1" : "text-gray-600 mt-1"}>
          Timeline of all system alerts and notifications
        </p>

        <Timeline
          mode="start"
          className="mt-6"
          items={alerts.map((alert, idx) => ({
            content: (
              <Card
                className={`mb-4 rounded-xl ${
                  isDark ? "bg-[#12172A] text-white" : "bg-white text-gray-900"
                }`}
                variant="borderless"
              >
                <div className="flex justify-between items-start mb-2">
                  <Tag color="red" className="font-semibold">
                    {alert.severity}
                  </Tag>
                  <div
                    className={
                      isDark ? "text-gray-400 text-sm" : "text-gray-500 text-sm"
                    }
                  >
                    {alert.timestamp}
                  </div>
                </div>
                <div className="mb-1 font-medium">{alert.title}</div>
                <div
                  className={
                    isDark ? "text-gray-300 mb-2" : "text-gray-700 mb-2"
                  }
                >
                  {alert.summary}
                </div>
                <div
                  className={
                    isDark ? "text-gray-400 text-sm" : "text-gray-600 text-sm"
                  }
                >
                  {alert.details}
                </div>
              </Card>
            ),
            icon: <div className="w-3 h-3 rounded-full bg-red-500 mt-1"></div>,
          }))}
        />
      </div>
    </>
  );
}
