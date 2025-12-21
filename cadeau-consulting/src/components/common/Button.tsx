import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  href?: string; // If href is provided, it acts as a Link
  icon?: React.ReactNode;
}

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  isLoading = false,
  href,
  icon,
  ...props
}: ButtonProps) {
  
  // 1. Define Styles based on Variant
  const variants = {
    primary: "bg-brand-navy text-white hover:bg-slate-800 shadow-lg shadow-blue-900/10",
    secondary: "bg-white text-brand-navy border border-slate-200 hover:bg-slate-50 hover:shadow-md",
    outline: "bg-transparent border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white",
    ghost: "bg-transparent text-brand-blue hover:bg-blue-50",
  };

  // 2. Define Styles based on Size
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  // 3. Combine Base Styles
  const baseStyles = `
    inline-flex items-center justify-center gap-2 
    font-semibold rounded-xl transition-all duration-200 
    active:scale-95 disabled:opacity-50 disabled:pointer-events-none
    ${variants[variant]} 
    ${sizes[size]} 
    ${className}
  `;

  // 4. Render Loading State
  const content = (
    <>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && icon && <span>{icon}</span>}
      {children}
    </>
  );

  // 5. Render as Link (if href exists) or Button
  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseStyles} disabled={isLoading} {...props}>
      {content}
    </button>
  );
}