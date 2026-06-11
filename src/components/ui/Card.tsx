import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "md" | "lg";
}

export function Card({
  hover = false,
  padding = "lg",
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`bg-surface border border-border rounded-2xl ${
        padding === "lg" ? "p-6" : "p-4"
      } ${hover ? "hover:border-primary hover:shadow-md transition-all" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
