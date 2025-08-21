import React, { useEffect, useState } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // Main styles
import "react-date-range/dist/theme/default.css"; // Theme styles
import { format, isValid, parse } from "date-fns";
import { IconButton } from "@mui/material";
import Modal from "./modal";
import { uz } from "date-fns/locale";
import { BiCalendar } from "react-icons/bi";

interface Props {
  disabled?: boolean;
  onChange: (value: string | Date | null) => void;
  value: string | Date | null;
  minDate?: boolean;
  maxDate?: number;
}

const formatInputValue = (value: string) => {
  let cleanValue = value.replace(/\D/g, ""); // Remove non-numeric characters
  if (cleanValue.length > 8) cleanValue = cleanValue.slice(0, 8); // Ensure max length

  if (cleanValue.length > 2)
    cleanValue = cleanValue.slice(0, 2) + "." + cleanValue.slice(2);
  if (cleanValue.length > 5)
    cleanValue = cleanValue.slice(0, 5) + "." + cleanValue.slice(5);

  return cleanValue;
};

const SelectDate: React.FC<Props> = ({
  disabled,
  onChange,
  value,
  minDate,
  maxDate,
}) => {
  const [open, setOpen] = useState(false);

  const [inputValue, setInputValue] = useState(""); // Input field value
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (value) {
      const parsedValue =
        typeof value === "string"
          ? parse(value, "yyyy-MM-dd", new Date())
          : value;
      if (isValid(parsedValue)) {
        setSelectedDate(parsedValue);
        setInputValue(format(parsedValue, "dd.MM.yyyy"));
      }
    } else {
      setSelectedDate(null);
      setInputValue("");
    }
  }, [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const formattedValue = formatInputValue(rawValue);
    setInputValue(formattedValue);

    if (formattedValue.length === 10) {
      // Ensure full date format before parsing
      const parsedDate = parse(formattedValue, "dd.MM.yyyy", new Date());
      if (isValid(parsedDate)) {
        setSelectedDate(parsedDate);
        const formattedDate = format(parsedDate, "yyyy-MM-dd");
        onChange(formattedDate);
      }
    }
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && typeof activeElement.blur === "function") {
          activeElement.blur();
        }
      }, 50);
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectDate = (date: Date) => {
    if (!date) return;
    setSelectedDate(date);
    setInputValue(format(date, "dd.MM.yyyy"));
    const formattedDate = format(date, "yyyy-MM-dd");
    onChange(formattedDate);
    setOpen(false);
  };

  return (
    <>
      <div className="w-full flex justify-between h-12 bg-[#F6F6F6] rounded p-3 px-3 items-center">
        <input
          type="text"
          placeholder="DD.MM.YYYY"
          value={inputValue}
          className="h-full w-full text-sm cursor-pointer outline-none bg-transparent"
          onChange={handleInputChange}
          disabled={disabled}
        />
        <IconButton onClick={() => !disabled && setOpen(true)}>
          <BiCalendar className="h-5 max-w-5 object-contain cursor-pointer" />
        </IconButton>
      </div>
      <Modal open={open} setOpen={handleClose} styles={{maxWidth: 400}}>
        <div className="flex justify-center w-full">
          <Calendar
            onChange={handleSelectDate}
            locale={uz}
            date={selectedDate as Date}
            minDate={
              maxDate
                ? new Date(new Date().setDate(new Date().getDate() + maxDate))
                : minDate
                ? new Date()
                : undefined
            }
            // maxDate={
            //   maxDate ? new Date(new Date().setDate(new Date().getDate() + maxDate)) : undefined
            // }
          />
        </div>
      </Modal>
    </>
  );
};

export default SelectDate;
