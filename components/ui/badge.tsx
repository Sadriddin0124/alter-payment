import React from "react";

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-2 py-1 text-[#5B72B5] bg-[#F3F7FB] rounded-2xl">
      {children}
    </div>
  );
};

export default Badge;
