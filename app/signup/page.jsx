"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../components/AuthLayout";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      router.push("/");
    } catch {
      setError("Signup failed");
    }
    setLoading(false);
  };

  return (
    <AuthLayout
      title="Create your Seller Sense account"
      subtitle="Start turning marketplace data into AI-powered growth."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Full name"
          className="w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
          {loading ? "Creating account..." : "Get started"}
        </button>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </form>

      <p className="mt-6 text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/signin" className="font-semibold text-indigo-600">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
