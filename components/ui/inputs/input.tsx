import React from "react";
import PhoneInput from "./phone-input";
import NumberInput from "./number-input";
import PasswordInput from "./password-input";

interface Props {
  type: "tel" | "text" | "number" | "password";
  onChange: (value: string) => void;
  value: string;
}

const Input = ({ type, onChange, value }: Props) => {
    const className = "border-2 border-[#D5D7DA] focus:border-transparent h-11 px-[14px] py-[10px] rounded-lg w-full ring-2 ring-transparent focus:ring-[#5B72B5] outline-none transition-colors ease-linear duration-300";
  return (
    <>
      {type === "tel" ? (
        <PhoneInput id="phone" value={value} onChange={onChange} className={className} />
      ) : type === "number" ? (
        <NumberInput value={value} onChange={onChange} className={className} />
      ) : 
         type === "password" ? (
        <PasswordInput id="password" value={value} onChange={onChange} className={className} />
      ) : (
        <input type="text" />
      )}
    </>
  );
};

export default Input;
