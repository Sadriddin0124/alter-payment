"use client";
import React from "react";

type Props = {
  label: string;
  value: React.ReactNode;
  className?: string;
  loading?: boolean;
};

export default function StatCard({ label, value, className = "", loading }: Props) {
  return (
    <div
      className={[
        "bg-white rounded-xl border border-gray-200",
        "p-4 sm:p-6",
        "shadow-[0_1px_0_rgba(0,0,0,0.02)]",
        className,
      ].join(" ")}
    >
      <div className="text-sm font-medium text-gray-500">{label}</div>

      {loading ? (
        <div className="mt-2 h-9 w-20 rounded-md bg-gray-200 animate-pulse" />
      ) : (
        <div className="mt-1 text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight">
          {value}
        </div>
      )}
    </div>
  );
}
