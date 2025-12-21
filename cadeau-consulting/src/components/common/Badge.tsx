import React from "react";

type BadgeVariant = "neutral" | "brand" | "success" | "warning";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  icon?: React.ReactNode;
}

export default function Badge({
  children,
  variant = "neutral",
  className = "",
  icon,
}: BadgeProps) {

  // Define styles for each variant
  const variants = {
    neutral: "bg-white border border-slate-200 text-brand-navy",
    brand: "bg-blue-50 border border-blue-100 text-brand-blue",
    success: "bg-emerald-50 border border-emerald-100 text-emerald-700",
    warning: "bg-amber-50 border border-amber-100 text-amber-700",
  };

  return (
    <span 
      className={`
        inline-flex items-center gap-1.5 
        px-3 py-1 rounded-md 
        text-xs font-bold uppercase tracking-wide 
        shadow-sm transition-colors
        ${variants[variant]} 
        ${className}
      `}
    >
      {icon && <span className="w-3 h-3">{icon}</span>}
      {children}
    </span>
  );
}