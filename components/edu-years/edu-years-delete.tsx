"use client";
import Modal from "@/components/ui/modal";
import React, { useState } from "react";
import Button from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { deleteEduYears } from "@/lib/actions/edu-years.action";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../providers/react-query-provider";
import { toast } from "sonner";
import { IconButton } from "@mui/material";
import { TfiTrash } from "react-icons/tfi";

type Props = {
  id?: number;
  setPage: (page: number) => void;
};

const EduYearsDelete = ({ id, setPage }: Props) => {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: deleteEduYears,
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


  return (
    <>
      <IconButton color="error" onClick={() => setOpen(true)}>
        <TfiTrash />
      </IconButton>
      <Modal open={open} setOpen={setOpen} styles={{ width: "400px" }}>
        <div className="flex flex-col gap-2 items-start" >
          <Typography variant="h1">O‘quv yilini o‘chirish</Typography>
          <Typography variant="h5">O‘quv yili o‘chirilsinmi?</Typography>

          <div className="flex flex-col gap-2 w-full">
            <Button variant="destructive" onClick={() => mutate(id as number)} full loading={isPending}>
              O‘chirish
            </Button>
            <Button onClick={() => setOpen(false)} full variant="outlined">
              Bekor qilish
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EduYearsDelete;
