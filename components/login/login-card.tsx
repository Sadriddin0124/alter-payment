"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import Button from "../ui/button";
import Input from "../ui/inputs/input";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
import { ILogin } from "@/lib/types/auth.types";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { IError } from "@/lib/types/general.types";

interface Props {
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export default function LoginCard({ setIsLogin }: Props) {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
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
      toast.success("Muvaffaqiyatli tizimga kirdingiz");
    },
    onError: (error: IError) => {
       const err = error?.response?.data?.errors?.non_field_errors?.[0]
       toast.error(err || "Telefon raqam yoki parol xato");
     },
  });

  const onSubmit = (data: ILogin) => {
    mutate({ ...data, phone_number: data.phone_number.replace(/\D/g, "") });
  };

  return (
    <div className="w-full max-w-[488px] rounded-3xl bg-white p-16 relative z-[101]">
      <h2 className="text-2xl font-semibold text-center mb-2">Tizimga kirish</h2>
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
            name="phone_number"
            control={control}
            rules={{ required: "Telefon raqamni kiriting" }}
            render={({ field }) => <Input {...field} type="tel" />}
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone_number.message}
            </p>
          )}
        </div>

        {/* JSHSHIR */}
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
          {errors.jshshir && (
            <p className="text-red-500 text-sm mt-1">
              {errors.jshshir.message}
            </p>
          )}
        </div>

        {/* Parol */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parol
          </label>
          <Controller
            name="password"
            control={control}
            rules={{ required: "Parolni kiriting" }}
            render={({ field }) => <Input {...field} type="password" />}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button full variant="contained" type="submit" loading={isPending}>
          Kirish
        </Button>

        {/* Inline register prompt */}
        <div className="mt-6 text-center flex justify-center items-center gap-2 text-sm text-gray-600">
            Akkauntingiz yo‘qmi?{" "}
          <p
            onClick={() => setIsLogin(false)}
            className="font-medium text-primary hover:underline focus:underline cursor-pointer"
          >
            Ro‘yxatdan o‘tish
          </p>
        </div>
      </form>
    </div>
  );
}
