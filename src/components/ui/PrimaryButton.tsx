"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface PrimaryButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "subtle" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function PrimaryButton({
  children,
  variant = "primary",
  size = "md",
  icon,
  fullWidth = false,
  className = "",
  disabled = false,
  ...props
}: PrimaryButtonProps) {
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3.5 text-base font-semibold",
    lg: "px-8 py-4 text-lg font-bold shadow-lg",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white shadow-rose-300/50 hover:shadow-rose-400/60 hover:from-rose-600 hover:to-pink-600 focus-visible:ring-rose-400",
    secondary:
      "bg-white/90 text-rose-700 border-2 border-rose-200/80 hover:bg-rose-50/80 hover:border-rose-300 shadow-sm focus-visible:ring-rose-300",
    subtle:
      "bg-rose-100/60 text-rose-800 hover:bg-rose-200/70 border border-rose-200/40 shadow-none focus-visible:ring-rose-300",
    danger:
      "bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-amber-300/50 hover:from-amber-600 hover:to-rose-600 focus-visible:ring-amber-400",
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center gap-2 rounded-full cursor-pointer
        transition-all duration-200 shadow-md focus:outline-none focus-visible:ring-4
        disabled:opacity-50 disabled:cursor-not-allowed select-none
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
}
