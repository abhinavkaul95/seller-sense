"use client";

import { useTheme } from "next-themes";
import { ShoppingCart, Star } from "lucide-react";

export default function SellerSenseLogo({ size = 40 }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Use same color theme as Seller Sense branding
  const logoColor = isDark ? "#6366F1" : "#4F46E5"; // Indigo shades consistent with Seller Sense

  return (
    <div className="flex items-center gap-2 select-none">
      {/* Shopping cart with star inside */}
      <div className="relative">
        <ShoppingCart size={size} stroke={logoColor} strokeWidth={2} />
        <Star
          size={size / 2}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          stroke={logoColor}
          strokeWidth={2}
        />
      </div>

      {/* Brand Name */}
      <span className="font-extrabold text-2xl" style={{ color: logoColor }}>
        Seller Sense
      </span>
    </div>
  );
}
