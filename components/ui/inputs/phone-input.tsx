import { useState } from "react";
import { useEffect } from "react";

export const formatUzbekistanPhoneNumber = (input: string): string => {
  const digits = input.replace(/\D/g, "").replace(/^998/, "").slice(0, 9); // ✅ one-time slice

  const parts: string[] = [];

  if (digits.length >= 2) {
    parts.push(digits.slice(0, 2));
  } else {
    parts.push(digits);
    return parts.join(" ");
  }

  if (digits.length >= 5) {
    parts.push(digits.slice(2, 5));
  } else if (digits.length > 2) {
    parts.push(digits.slice(2));
    return parts.join(" ");
  }

  if (digits.length >= 7) {
    parts.push(digits.slice(5, 7));
  } else if (digits.length > 5) {
    parts.push(digits.slice(5));
    return parts.join(" ");
  }

  if (digits.length > 7) {
    parts.push(digits.slice(7));
  }

  return parts.join(" ");
};

const PhoneInput = ({
  value, // Default to empty string to avoid undefined issues
  onChange,
  placeholder,
  disabled,
  styles,
  readOnly,
  id,
  className,
}: {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  styles?: { paddingLeft: string };
  readOnly?: boolean;
  className?: string;
  id: string;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);

  // Sync external value → formatted internal input
  useEffect(() => {
    const rawDigits = value?.replace(/\D/g, "").replace(/^998/, "").slice(0, 9);
    const formatted = formatUzbekistanPhoneNumber(rawDigits || "");

    if (formatted !== inputValue) {
      setInputValue(formatted);
    }
  }, [value, inputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    const digits = rawInput.replace(/\D/g, ""); // ⛔ no slice here
    const formatted = formatUzbekistanPhoneNumber(digits);
    setInputValue(formatted);

    const normalized = digits.replace(/^998/, "").slice(0, 9); // ✅ limit here for sending
    onChange(`+998${normalized}`);
  };

  return (
    <div
      className={`${className} ${
        focused ? `!ring-2 !ring-[#5B72B5]` : ""
      } flex items-center justify-start !py-0 !pr-0 overflow-hidden`}
    >
      <span className="select-none">+998</span>
      <input
        id={id}
        type="tel"
        disabled={disabled}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-full outline-none"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        // aria-describedby="phone-hint"
        style={{
          ...styles,
          paddingLeft: "0.5rem",
          pointerEvents: readOnly ? "none" : "auto",
        }}
        required
      />
    </div>
  );
};

export default PhoneInput;