"use client";
import Modal from "@/components/ui/modal";
import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import PaymentSplits from "./payment-splits";
import Button from "@/components/ui/button";
import { IconButton } from "@mui/material";
import { FiSettings } from "react-icons/fi";
import Input from "@/components/ui/inputs/input";
import Typography from "@/components/ui/typography";
import { IStudentPayments } from "@/lib/types/student.types";
import { useMutation } from "@tanstack/react-query";
import { updateStudentPayment } from "@/lib/actions/students.action";
import { queryClient } from "@/components/providers/react-query-provider";
import { toast } from "sonner";

interface Props {
  contract: number;
  data: IStudentPayments
}

const PaymentSettings = ({ contract, data }: Props) => {
  const [open, setOpen] = useState(false);
  const methods = useForm<IStudentPayments>();

  const { handleSubmit, control, watch, reset } = methods;

  const split_count = watch("split_count");

  useEffect(() => {
    if (contract) {
      reset({
        ...data,
        contract: contract.toString(),
        split_count: data.installment_payments.length.toString(),
      });
    }
  }, [contract, data, reset]);

  const {mutate} = useMutation({
    mutationFn: updateStudentPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      setOpen(false);
      toast.success("Boʻlib toʻlash muvaffaqiyatli o‘zgartirildi");
    },
    onError: () => {
      toast.error("Boʻlib toʻlashni o‘zgartirishda xatolik");
    }
  })

  const onSubmit = (data: IStudentPayments) => {
    console.log(data);
    mutate(data)
  };
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <FiSettings />
      </IconButton>
      <Modal open={open} setOpen={setOpen} styles={{ width: "600px" }}>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography variant="h1">Boʻlib toʻlash</Typography>

            <div className="flex flex-col gap-2">
              <label>Kontrakt narxi</label>
              <Controller
                name="contract"
                control={control}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label>Boʻlib toʻlash soni</label>
              <Controller
                name="split_count"
                control={control}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
            <PaymentSplits count={Number(split_count ?? 3)} />
            <div className="flex flex-col gap-2 w-full">
              <Button onClick={() => setOpen(false)} full>
                Saqlash
              </Button>
              <Button onClick={() => setOpen(false)} full variant="outlined">
                Bekor qilish
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default PaymentSettings;
