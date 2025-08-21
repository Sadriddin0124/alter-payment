"use client";
import Modal from "@/components/ui/modal";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import PaymentSplits from "./payment-splits";
import Button from "@/components/ui/button";
import { IconButton } from "@mui/material";
import { FiSettings } from "react-icons/fi";
import Input from "@/components/ui/inputs/input";
import Typography from "@/components/ui/typography";

interface Form {
  split_count: string;
  price: string
}

const PaymentSettings = () => {
  const [open, setOpen] = useState(false);
  const methods = useForm<Form>();

  const { handleSubmit, control, watch } = methods;

  const split_count = watch("split_count");

  const onSubmit = (data: Form) => {
    console.log(data);
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
                name="price"
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
