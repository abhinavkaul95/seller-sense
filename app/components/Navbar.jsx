"use client";

import Link from "next/link";
import { Popover, Divider, Button } from "antd";
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
  LogIn,
  UserPlus,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

export default function Navbar({ user }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState();

  /* ---------------- NAV ITEMS ---------------- */

  const LOGGED_IN_NAV_ITEMS = [
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
  const GUEST_NAV_ITEMS = [];

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
      <div className="mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {(user ? LOGGED_IN_NAV_ITEMS : GUEST_NAV_ITEMS).map((item) => (
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

            {user ? (
              <>
                <NotificationPopover
                  notifications={notifications}
                  loading={loading}
                  isDark={isDark}
                />
                <ProfilePopover user={user} isDark={isDark} />
              </>
            ) : (
              <GuestMenu isDark={isDark} />
            )}
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
function NotificationPopover({ notifications, loading, isDark }) {
  return (
    <Popover
      placement="bottom"
      trigger="hover"
      content={
        <div
          className={`w-80 max-h-96 overflow-y-auto ${
            isDark ? "bg-[#0F1424] text-gray-200" : "bg-white text-gray-800"
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
                  <span className="text-xs text-gray-400">{notif.time}</span>
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
  );
}
function MenuItem({ icon: Icon, label, onClick, danger, isDark }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-4 py-2 text-sm rounded-md transition text-left cursor-pointer
        ${
          danger
            ? "text-red-400 hover:bg-red-500/10"
            : isDark
            ? "hover:bg-white/5"
            : "hover:bg-gray-100"
        }
      `}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function ProfileMenu({ user, isDark }) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear storage
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to homepage
    window.location.href = "/";

    // router.replace("/");
    // router.refresh();
  };

  return (
    <div
      className={`w-56 rounded-lg ${
        isDark ? "bg-[#0F1424] text-gray-200" : "bg-white text-gray-800"
      }`}
    >
      {/* User Info */}
      <div className="px-4 py-3">
        <div className="text-sm font-semibold">{user?.name || "Seller"}</div>
        <div className="text-xs text-gray-400">{user?.email}</div>
      </div>

      <Divider className="my-1" />

      {/* Navigation */}
      <MenuItem
        icon={User}
        label="My Profile"
        onClick={() => router.push("/profile")}
        isDark={isDark}
      />
      <MenuItem
        icon={Settings}
        label="Account Settings"
        onClick={() => router.push("/settings")}
        isDark={isDark}
      />
      <MenuItem
        icon={TrendingUp}
        label="Billing & Usage"
        onClick={() => router.push("/billing")}
        isDark={isDark}
      />

      <Divider className="my-1" />

      {/* Logout */}
      <MenuItem
        icon={LogOut}
        label="Logout"
        danger
        onClick={handleLogout}
        isDark={isDark}
      />
    </div>
  );
}

function GuestMenu({ isDark }) {
  return (
    <div className="space-y-2 gap-2 flex flex-row">
      <Link href="/signin" className="m-0">
        <Button
          block
          icon={<LogIn className="h-4 w-4" />}
          className="flex items-center justify-center"
        >
          Login
        </Button>
      </Link>

      <Link href="/signup" className="m-0">
        <Button block type="primary" icon={<UserPlus className="h-4 w-4" />}>
          Create Account
        </Button>
      </Link>
    </div>
  );
}
