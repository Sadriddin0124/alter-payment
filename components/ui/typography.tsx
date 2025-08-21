import React from "react";

type Props = {
  children: React.ReactNode;
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7";
  color?: "black" | "gray";
  className?: string;
};

const Typography = ({ children, variant, color, className }: Props) => {
  const variants = {
    h1: "text-[30px] font-semi-bold",
    h2: "text-3xl",
    h3: "text-2xl",
    h4: "text-xl",
    h5: "text-lg",
    h6: "text-base",
    h7: "text-sm",
  };

  const colors = {
    black: "text-[#181D27]",
    gray: "text-[#717680]",
  };
  return (
    <h2
      className={`${variants[variant]} ${
        colors[color || "black"]
      } ${className}`}
    >
      {children}
    </h2>
  );
};

export default Typography;
