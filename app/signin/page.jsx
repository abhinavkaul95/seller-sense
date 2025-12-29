"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../components/AuthLayout";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/auth/signin", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      router.push("/");
    } catch {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <AuthLayout
      title="Sign in to Seller Sense"
      subtitle="Welcome back. Let’s get you back to growth."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Email"
          className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700 transition"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>

      <p className="mt-6 text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link href="/signup" className="font-semibold text-indigo-600">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}
