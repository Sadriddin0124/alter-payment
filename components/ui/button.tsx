import { Button as Cell } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "outlined" | "contained";
  className?: string;
  full?: boolean;
}

const Button = ({
  children,
  type = "submit",
  loading,
  onClick,
  disabled,
  variant = "contained",
  className,
  full = false,
}: Props) => {
  const variants = {
    contained: {
      background: "#5B72B5",
      color: "#fff",
      borderColor: "#5B72B5",
    },
    outlined: {
      background: "#fff",
      color: "#414651",
      borderColor: "#D5D7DA",
    },
  };
  return (
    <Cell
      type={type}
      sx={{
        height: 44,
        width: full ? "100%" : "auto",
        borderRadius: "8px",
        borderColor: variants[variant]?.borderColor,
        borderWidth: 1,
        borderStyle: "solid",
        background: variants[variant].background,
        color: variants[variant].color,
        textTransform: "none",
        fontWeight: 600,
        fontSize: 16,
      }}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      className={className}
      loading={loading}
    >
      {children}
    </Cell>
  );
};

export default Button;
