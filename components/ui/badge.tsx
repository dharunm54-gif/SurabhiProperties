import React from "react";
import { cn } from "@/lib/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "green" | "gold" | "blue" | "red" | "gray" | "outline";
}

export function Badge({ className, variant = "green", children, ...props }: BadgeProps) {
  const variants = {
    green: "bg-[#173F35]/10 text-[#173F35] border border-[#173F35]/20",
    gold: "bg-[#C7A45D]/15 text-[#916E1D] border border-[#C7A45D]/30",
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
    red: "bg-red-50 text-red-700 border border-red-200",
    gray: "bg-gray-100 text-gray-700 border border-gray-200",
    outline: "border border-gray-300 text-gray-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
