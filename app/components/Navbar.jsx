"use client";

import Link from "next/link";
import { Popover, Divider } from "antd";
import {
  LayoutGrid,
  Boxes,
  RotateCcw,
  Star,
  Bell,
  TrendingUp,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar({ user }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState();

  /* ---------------- NAV ITEMS ---------------- */

  const NAV_ITEMS = [
    {
      label: "Trends",
      href: "/trends",
      icon: TrendingUp,
    },
    {
      label: "Inventory",
      href: "/inventory",
      icon: Boxes,
    },
    {
      label: "Returns & Refunds",
      href: "/returns",
      icon: RotateCcw,
    },
    {
      label: "Support",
      href: "/support",
      icon: Star,
    },
    {
      label: "Alerts",
      href: "/alerts",
      icon: Bell,
    },
  ];

  // Fetch notifications
  useEffect(() => {
    fetch("/dummy/notifications.json")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b ${
        isDark ? "bg-[#0B0F1A] border-white/10" : "bg-white border-gray-200"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              SS
            </div>
            <span
              className={`text-lg font-extrabold tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Seller Sense
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isDark
                    ? "text-gray-300 hover:bg-white/5 hover:text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`px-2 py-1 rounded border ${
                isDark
                  ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? "🌙" : "☀️"}
            </button>
            <Popover
              placement="bottom"
              trigger="hover"
              content={
                <div
                  className={`w-80 max-h-96 overflow-y-auto ${
                    isDark
                      ? "bg-[#0F1424] text-gray-200"
                      : "bg-white text-gray-800"
                  } rounded-xl p-2 shadow-lg`}
                >
                  {loading ? (
                    <div className="flex justify-center py-4">
                      <Spin />
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="text-center py-4 text-gray-400">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((notif, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded hover:bg-indigo-600/10 transition cursor-pointer"
                      >
                        <div className="flex justify-between items-center text-sm font-medium">
                          <span className="capitalize">{notif.type}</span>
                          <span className="text-xs text-gray-400">
                            {notif.time}
                          </span>
                        </div>
                        <div className="mt-1 text-sm">{notif.message}</div>
                      </div>
                    ))
                  )}
                </div>
              }
              styles={{
                container: {
                  padding: 0,
                  backgroundColor: isDark ? "#0F1424" : "#FFFFFF",
                  borderRadius: 12,
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.08)"
                    : "1px solid #E5E7EB",
                },
              }}
            >
              <Bell
                className={`h-5 w-5 cursor-pointer ${
                  isDark ? "text-gray-400 hover:text-white" : "text-gray-500"
                }`}
              />
            </Popover>

            <ProfilePopover user={user} isDark={isDark} />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------------- PROFILE POPOVER ---------------- */

function ProfilePopover({ user, isDark }) {
  return (
    <Popover
      placement="bottomRight"
      trigger="hover"
      content={<ProfileMenu user={user} isDark={isDark} />}
      styles={{
        container: {
          padding: 0,
          backgroundColor: isDark ? "#0F1424" : "#FFFFFF",
          borderRadius: 12,
          border: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid #E5E7EB",
        },
      }}
    >
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold text-white">
          {user?.name?.[0] || "U"}
        </div>
        <span
          className={`hidden md:block text-sm font-medium ${
            isDark ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {user?.name || "Seller"}
        </span>
      </div>
    </Popover>
  );
}

function ProfileMenu({ user, isDark }) {
  return (
    <div
      className={`w-56 rounded-lg ${
        isDark ? "bg-[#0F1424] text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      <div className="px-4 py-3">
        <div className="text-sm font-semibold">{user?.name || "Seller"}</div>
        <div className="text-xs text-gray-400">{user?.email}</div>
      </div>

      <Divider className="my-1" />

      <MenuItem icon={User} label="My Profile" />
      <MenuItem icon={Settings} label="Account Settings" />
      <MenuItem icon={TrendingUp} label="Billing & Usage" />

      <Divider className="my-1" />

      <MenuItem icon={LogOut} label="Logout" danger />
    </div>
  );
}

function MenuItem({ icon: Icon, label, danger }) {
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 text-sm cursor-pointer rounded-md transition ${
        danger ? "text-red-400 hover:bg-red-500/10" : "hover:bg-white/5"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </div>
  );
}
