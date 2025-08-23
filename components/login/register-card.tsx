"use client";

import { useForm, Controller } from "react-hook-form";
import Button from "../ui/button";
import Input from "../ui/inputs/input";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/actions/auth.action";
import { useRouter } from "next/router";
import { IRegister } from "@/lib/types/auth.types";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export default function RegisterCard({ setIsLogin }: Props) {
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm<IRegister>({
    defaultValues: {
      phone_number: "",
      password: "",
      jshshir: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      router.push("/edu-years");
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const onSubmit = (data: IRegister) => {
    mutate({...data, phone_number: data?.phone_number?.replace(/\D/g, '')});
  };

  return (
    <div className="w-full max-w-[488px] rounded-3xl bg-white p-16 relative z-[101]">
      <h2 className="text-2xl font-semibold text-center mb-2">
        Ro‘yxatdan o‘tish
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Ro‘yxatdan o‘tish uchun kerakli ma’lumotlarni kiriting
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Telefon raqam */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefon raqam
          </label>
          <Controller
            name="phone_number"
            control={control}
            rules={{ required: "Telefon raqamni kiriting" }}
            render={({ field }) => <Input {...field} type="tel" />}
          />
          {
            errors.phone_number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone_number.message}
              </p>
            )
          }
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            JSHSHIR raqam
          </label>
          <Controller
            name="jshshir"
            control={control}
            rules={{ required: "JSHSHIR raqamni kiriting" }}
            render={({ field }) => <Input {...field} type="jshshir" />}
          />
          {
            errors.jshshir && (
              <p className="text-red-500 text-sm mt-1">
                {errors.jshshir.message}
              </p>
            )
          }
        </div>

        {/* Parol */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parolni kiriting
          </label>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Parolni kiriting" }}
            render={({ field }) => <Input {...field} type="password" placeholder="Parol" />}
          />
          {
            errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )
          }
        </div>

        {/* Parolni tasdiqlash */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parolni tasdiqlang
          </label>
          <Controller
            name="confirm_password"
            control={control}
            rules={{ required: "Parolni kiriting" }}
            render={({ field }) => <Input {...field} type="password" placeholder="Parol" />}
          />
          {
            errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm_password.message}
              </p>
            )
          }
        </div>

        {/* Submit button */}
        <Button full variant="contained" type="submit" loading={isPending}>
          Kirish
        </Button>

         {/* Inline register prompt */}
        <div className="mt-6 text-center flex justify-center items-center gap-2 text-sm text-gray-600">
            Akkauntingiz bormi?{" "}
          <p
            onClick={() => setIsLogin(true)}
            className="font-medium text-primary hover:underline focus:underline cursor-pointer"
          >
            Kirish
          </p>
        </div>
      </form>
    </div>
  );
}
