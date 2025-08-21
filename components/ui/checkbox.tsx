"use client";

import { Checkbox } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BiCheck } from "react-icons/bi";

interface Props {
  value?: boolean;
  onChange?: (checked: boolean) => void;
}

const CustomCheckbox = styled(Checkbox)(() => ({
  color: "#5B72B5", // border color
  "&.Mui-checked": {
    color: "#5B72B5", // check mark color
  },
  "& .MuiSvgIcon-root": {
    fontSize: 28, // size of default checkbox
  },
  "&.MuiCheckbox-root": {
    borderRadius: 8, // rounded square border
  },
}));

export default function MyCheckbox({ value, onChange }: Props) {
  return (
    <CustomCheckbox
      checked={value}
      onChange={(e) => onChange?.(e.target.checked)}
      icon={
        <span
          style={{
            border: "2px solid #5B72B5",
            borderRadius: "8px",
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      }
      checkedIcon={
        <span
          style={{
            border: "2px solid #4C5CA8",
            backgroundColor: "#EEF2FF",
            borderRadius: "8px",
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BiCheck style={{ fontSize: 20, color: "#5B72B5" }} />
        </span>
      }
    />
  );
}
