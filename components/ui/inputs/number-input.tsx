import React, { useEffect, useState } from "react";

// Function to format the number manually with commas
const formatNumber = (value: string | number = "", minus?: boolean): string => {
  const stringValue = String(value); // Convert to string directly

  if (stringValue === "0") return "0"; // Allow explicit "0"
  if (stringValue === "") return ""; // Allow empty input

  // Remove invalid characters except numbers, minus, and dot
  let sanitizedValue = stringValue.replace(/[^0-9.,-]/g, "");

  // Ensure only one leading minus (-) sign
  if (sanitizedValue.startsWith("-")) {
    sanitizedValue = minus
      ? "-" + sanitizedValue.slice(1).replace(/-/g, "")
      : sanitizedValue.slice(1).replace(/-/g, "");
  } else {
    sanitizedValue = sanitizedValue.replace(/-/g, "");
  }

  // Prevent multiple decimal points
  const dotCount = (sanitizedValue.match(/\./g) || []).length;
  if (dotCount > 1) {
    sanitizedValue = sanitizedValue.slice(0, sanitizedValue.lastIndexOf("."));
  }

  // Remove commas for correct formatting
  const numberWithoutCommas = sanitizedValue.replace(/,/g, "");

  // Allow empty string or "-"
  if (numberWithoutCommas === "" || numberWithoutCommas === "-") {
    return sanitizedValue;
  }

  // Split integer and decimal parts for formatting
  const [integer, decimal] = numberWithoutCommas.split(".");

  // Add commas every 3 digits
  const integerWithCommas = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimal ? `${integerWithCommas}.${decimal}` : integerWithCommas;
};

// Function to remove commas from a formatted number
const removeCommas = (value: string | number = ""): string => {
  return String(value).replace(/,/g, "");
};

const NumberInput = ({
  value,
  onChange,
  placeholder,
  disabled,
  readOnly,
  className
}: {
  value: string;
  onChange: (value: string ) => void; // Allow `null` when clearing input
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string
}) => {
  const [inputValue, setInputValue] = useState(
    value ? formatNumber(value) : ""
  );

  useEffect(() => {
    if (value === null || value === undefined) {
      setInputValue("");
    } else {
      const formattedValue = formatNumber(value);
      if (formattedValue !== inputValue) {
        setInputValue(formattedValue);
      }
    }
  }, [value, inputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value; // Get raw input value
    const formattedValue = formatNumber(rawValue); // Format it properly
    const numericValue = removeCommas(formattedValue); // Remove commas

    // Allow clearing input
    if (rawValue === "" || rawValue === "-") {
      setInputValue(rawValue);
      onChange(""); // Pass `null` when input is cleared
    } else {
      setInputValue(formattedValue);
      onChange(numericValue);
    }
  };

  return (
      <input
        disabled={disabled}
        readOnly={readOnly}
        value={inputValue}
        className={`${readOnly ? "opacity-70" : ""} ${className}`}
        onChange={handleChange}
        placeholder={placeholder}
      />
  );
};

export default NumberInput;