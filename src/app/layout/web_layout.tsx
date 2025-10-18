import React from "react";

interface WebLayoutProps {
  children: React.ReactNode;
  className?: string;
}
export default function WebLayout({
  children,
  className = "",
}: WebLayoutProps) {
  return (
    <div className={`${className}`}>
      <main className="max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
