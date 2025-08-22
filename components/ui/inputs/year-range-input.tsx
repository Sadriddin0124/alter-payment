import React, { useRef } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  /** if true, enforces 2025-2026 style (second = first + 1) */
  requireConsecutive?: boolean;
  id?: string;
  placeholder?: string;
  className?: string;
};

export default function YearRangeInput({
  value,
  onChange,
  requireConsecutive = true,
  id = "year-range",
  placeholder = "2025-2026",
  className,
}: Props) {
  const ref = useRef<HTMLInputElement | null>(null);

  const format = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 8); // YYYYYYYY
    if (digits.length <= 4) return digits;
    return `${digits.slice(0, 4)}-${digits.slice(4)}`; // YYYY-YYYY
  };

  const validate = (val: string) => {
    const el = ref.current;
    if (!el) return;
    el.setCustomValidity(""); // reset

    // must match pattern
    if (!/^\d{4}-\d{4}$/.test(val)) return;

    if (requireConsecutive) {
      const y1 = Number(val.slice(0, 4));
      const y2 = Number(val.slice(5, 9));
      if (y2 !== y1 + 1) {
        el.setCustomValidity(
          "Second year must be the next year (e.g. 2025-2026)."
        );
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = format(e.target.value);
    onChange(next);
    validate(next);
  };

  const handleBlur = () => validate(value);

  return (
    <input
      ref={ref}
      id={id}
      inputMode="numeric"
      pattern="\d{4}-\d{4}"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      maxLength={9} // "YYYY-YYYY"
      // light styling optional:
      className={` ${className}`}
      aria-describedby={`${id}-hint`}
    />
  );
}
