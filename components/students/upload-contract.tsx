"use client";

import React, { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { $api } from "@/lib/api/api";
import { toast } from "sonner";
import Button from "../ui/button";
import { LuCreditCard } from "react-icons/lu";

type Props = {
  endpoint?: string;   // upload endpoint
  accept?: string;     // input accept filter
  label?: string;      // button text
  disabled?: boolean;
};

export default function UploadContract({
  accept = ".xlsx",
  label = "To‘lovni yuklash",
  disabled,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0); // 0..100

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      setProgress(0); // reset per upload
      const formData = new FormData();
      formData.append("excel_file", file);

      const res = await $api.post(`/import/payments/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          // Some servers don't send total — guard it.
          const total = e.total ?? 0;
          if (total > 0) {
            const pct = Math.round((e.loaded * 100) / total);
            setProgress(pct);
          } else {
            // keep it indeterminate (leave progress at 0)
          }
        },
      });

      return res.data; // pass server payload up if you need it
    },
    onSuccess: () => {
      setProgress(100);
      toast.success("Fayl muvaffaqiyatli yuklandi");
    },
    onError: () => {
      toast.error("Faylni yuklashda xatolik");
    },
    onSettled: () => {
      // let the user see 100% for a beat, then reset
      setTimeout(() => setProgress(0), 400);
    },
  });

  const openPicker = () => inputRef.current?.click();

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] || null;
    e.target.value = ""; // allow selecting the same file again
    if (!file || mutation.isPending) return;
    mutation.mutate(file);
  };

  const isLoading = mutation.isPending;
  const hasDeterminate = isLoading && progress > 0;

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={onChange}
        hidden
      />
      <Button
        variant="outlined"
        onClick={openPicker}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <>
            <CircularProgress
              size={18}
              sx={{ mr: 1 }}
              variant={hasDeterminate ? "determinate" : "indeterminate"}
              value={hasDeterminate ? progress : undefined}
            />
            {hasDeterminate ? `Yuklanmoqda… ${progress}%` : "Yuklanmoqda…"}
          </>
        ) : (
          <>
            <LuCreditCard className="mr-2" size={20} />
            {label}
          </>
        )}
      </Button>
    </>
  );
}
