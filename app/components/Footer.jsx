"use client";

import Link from "next/link";
import { useTheme } from "next-themes";

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <footer
      className={`border-t ${
        isDark
          ? "bg-[#0B0F1A] border-white/10 text-gray-400"
          : "bg-gray-50 border-gray-200 text-gray-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3
              className={`text-xl font-extrabold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Seller Sense
            </h3>
            <p
              className={`text-sm max-w-xs leading-relaxed ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              AI-powered intelligence for modern e-commerce sellers across
              Amazon, eBay, and beyond.
            </p>
          </div>

          {/* Product */}
          <FooterColumn
            title="Product"
            isDark={isDark}
            links={[
              { label: "Features", href: "#features" },
              { label: "Pricing", href: "/pricing" },
              { label: "Integrations", href: "/integrations" },
              { label: "Roadmap", href: "/roadmap" },
            ]}
          />

          {/* Company */}
          <FooterColumn
            title="Company"
            isDark={isDark}
            links={[
              { label: "About", href: "/about" },
              { label: "Blog", href: "/blog" },
              { label: "Careers", href: "/careers" },
              { label: "Contact", href: "/contact" },
            ]}
          />

          {/* Legal */}
          <FooterColumn
            title="Legal"
            isDark={isDark}
            links={[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Security", href: "/security" },
            ]}
          />
        </div>

        {/* Bottom bar */}
        <div
          className={`mt-12 pt-6 border-t flex flex-col md:flex-row items-center justify-between text-sm ${
            isDark ? "border-white/10" : "border-gray-200"
          }`}
        >
          <span>
            © {new Date().getFullYear()} Seller Sense. All rights reserved.
          </span>
          <span
            className={`mt-4 md:mt-0 ${
              isDark ? "text-gray-500" : "text-gray-500"
            }`}
          >
            Built with ❤️ for e-commerce sellers
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- FOOTER COLUMN ---------------- */

function FooterColumn({ title, links, isDark }) {
  return (
    <div>
      <h4
        className={`text-sm font-semibold mb-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h4>
      <ul className="space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`transition ${
                isDark ? "hover:text-white" : "hover:text-gray-900"
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
