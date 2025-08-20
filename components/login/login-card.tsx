"use client";

import { useForm, Controller } from "react-hook-form";
import Button from "../ui/button";
import Input from "../ui/inputs/input";

type LoginFormInputs = {
  phone: string;
  password: string;
};

export default function LoginCard() {
  const { control, handleSubmit } = useForm<LoginFormInputs>({
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login data:", data);
  };

  return (
    <div className="w-full max-w-[488px] rounded-3xl bg-white p-16 relative z-[101]">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Tizimga kirish
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Login va parolingiz orqali tizimga kiring
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Telefon raqam */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefon raqam
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="tel"
              />
            )}
          />
        </div>

        {/* Parol */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parol
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input {...field} type="password" />
            )}
          />
        </div>

        {/* Submit button */}
        <Button full variant="contained" type="submit">
          Kirish
        </Button>
      </form>
    </div>
  );
}
