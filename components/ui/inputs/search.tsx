import React from "react";
import { BiSearch } from "react-icons/bi";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Search = ({ value, onChange, placeholder, className }: Props) => {
  const styles =
    "border-2 pl-10 border-[#D5D7DA] focus:border-transparent h-11 px-[14px] py-[10px] rounded-lg w-full ring-2 ring-transparent focus:ring-[#5B72B5] outline-none transition-colors ease-linear duration-300";

  return (
    <div className="relative flex items-center">
      <BiSearch className="absolute left-3 text-[#D5D7DA]" size={24} />
      <input
        type="text"
        className={`${styles} ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
