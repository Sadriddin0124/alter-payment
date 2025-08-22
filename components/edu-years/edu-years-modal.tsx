"use client";
import Modal from "@/components/ui/modal";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Button from "@/components/ui/button";
import Input from "@/components/ui/inputs/input";
import Typography from "@/components/ui/typography";
import { IEduYears } from "@/lib/types/edu-year.types";
import { BiPlus } from "react-icons/bi";
import { createEduYears, updateEduYears } from "@/lib/actions/edu-years.action";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../providers/react-query-provider";
import { toast } from "sonner";
import { IconButton } from "@mui/material";
import { FiEdit2 } from "react-icons/fi";

type Props = {
  item?: IEduYears;
  setPage: (page: number) => void;
};

const EduYearsModal = ({ item, setPage }: Props) => {
  const [open, setOpen] = useState(false);
  const methods = useForm<IEduYears>();

  const { handleSubmit, control, reset } = methods;

  const { mutate, isPending: isPendingCreate } = useMutation({
    mutationFn: createEduYears,
    onSuccess: () => {
      toast.success("O'quv yili qo'shildi");
      queryClient.invalidateQueries({ queryKey: ["edu-years"] });
      setOpen(false);
      setPage(1);
    },
    onError: (error) => {
      console.error("Login error:", error);
      toast.error("O'quv yili qo'shishda xatolik");
    },
  });

  const { mutate: update, isPending } = useMutation({
    mutationFn: updateEduYears,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["edu-years"] });
      toast.success("O'quv yili o'zgartirildi");
      setOpen(false);
      setPage(1);
    },
    onError: (error) => {
      console.error("Login error:", error);
      toast.error("O'quv yili o'zgartirishda xatolik");
    },
  });

  const onSubmit = (data: IEduYears) => {
    if (item) {
      update(data);
    } else {
      mutate(data);
    }
  };
  const handleClose = () => {
    setOpen(false);
    reset();
  }
  return (
    <>
      <div className="flex justify-center items-center">
        {item ? (
          <IconButton>
            <FiEdit2 />
          </IconButton>
        ) : (
          <Button onClick={() => setOpen(true)}>
            <BiPlus className="mr-2" size={24} />
            O‘quv yili qo‘shish
          </Button>
        )}
      </div>
      <Modal open={open} setOpen={handleClose} styles={{ width: "400px" }}>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h1">O‘quv yili qo‘shish</Typography>

            <div className="flex flex-col gap-2">
              <label>O‘quv yili</label>
              <Controller
                name="edu_year"
                control={control}
                render={({ field }) => <Input type="year-range" {...field} />}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <Button full type="submit" loading={isPending || isPendingCreate}>
                Saqlash
              </Button>
              <Button onClick={handleClose} full variant="outlined">
                Bekor qilish
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default EduYearsModal;
