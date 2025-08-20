import { IconButton } from "@mui/material";
import { useState } from "react";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";

// Password Input with toggle
const PasswordInput = ({
  onChange,
  value,
  id,
  placeholder,
  className,
}: {
  onChange: (value: string) => void;
  value: string;
  id: string;
  placeholder?: string;
  className?: string;
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
        className={className}
      />
      <div className="absolute inset-y-0 right-3 flex items-center text-gray-500">
        <IconButton type="button" onClick={() => setShow((v) => !v)}>
          {show ? <PiEyeLight /> : <PiEyeSlash />}
        </IconButton>
      </div>
    </div>
  );
};

export default PasswordInput;