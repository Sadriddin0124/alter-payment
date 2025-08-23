"use client";
import React, { useRef } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  id?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

function normalize(value: string): string {
  return value.replace(/\D/g, "").slice(0, 14);
}

function isValidJshshir(v: string): boolean {
  return /^\d{14}$/.test(v);
}

export default function JshshirInput({
  value,
  onChange,
  id = "jshshir",
  placeholder = "12345678901234",
  required = false,
  className = "input",
}: Props) {
  const ref = useRef<HTMLInputElement | null>(null);

  const setValidity = (val: string) => {
    if (!ref.current) return;
    ref.current.setCustomValidity("");
    if (required && val.length === 0) return;
    if (val.length > 0 && !isValidJshshir(val)) {
      ref.current.setCustomValidity("JSHSHIR 14 ta raqamdan iborat bo‘lishi kerak.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = normalize(e.target.value);
    onChange(next);
    setValidity(next);
  };

  const handleBlur = () => setValidity(value);

  const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    const next = normalize(text);
    onChange(next);
    setValidity(next);
  };

  return (
    <input
      ref={ref}
      id={id}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onPaste={handlePaste}
      maxLength={14}
      inputMode="numeric"
      pattern="\d{14}"
      autoComplete="off"
      placeholder={placeholder}
      required={required}
      className={className}
      aria-describedby={`${id}-hint`}
    />
  );
}
