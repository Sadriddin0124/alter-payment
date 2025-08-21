"use client";

import MessageField from "@/components/students/message-field";
import StudentsTable from "@/components/students/students-table";
import Button from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BsSend } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { LuCreditCard } from "react-icons/lu";

interface IStudentForm {
  selectedStudents: { id: number }[];
}

const fadeSlide = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: 15, transition: { duration: 0.2 } },
};

const Students = () => {
  const router = useRouter();
  const methods = useForm<IStudentForm>({
    defaultValues: { selectedStudents: [] },
  });

  const { watch, handleSubmit } = methods;
  const selected = watch("selectedStudents");

  const onSubmit = (data: IStudentForm) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-8 mt-8">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <Button variant="outlined" onClick={() => router.back()}>
          <FaArrowLeft className="mr-2" />
          Ortga
        </Button>

        {/* Animated title */}
        <AnimatePresence mode="wait">
          {selected.length > 0 && (
            <motion.div key="title" {...fadeSlide}>
              <Typography variant="h1">SMS yuborish</Typography>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right buttons */}
        <div className="flex gap-4 items-center">
          <AnimatePresence mode="wait">
            {selected.length === 0 ? (
              <motion.div
                key="uploadBtns"
                className="flex gap-4"
                {...fadeSlide}
              >
                <Button variant="outlined">
                  <FiUpload className="mr-2" size={20} />
                  Talabalarni yuklash
                </Button>
                <Button variant="outlined">
                  <LuCreditCard className="mr-2" size={20} />
                  Toʻlovlarni yuklash
                </Button>
              </motion.div>
            ) : (
              <motion.div key="sendBtn" {...fadeSlide}>
                <Button form="studentForm">
                  <BsSend className="mr-2" size={20} />
                  Xabar yuborish
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Form with table + message field */}
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-start gap-6 w-full"
          id="studentForm"
        >
          <AnimatePresence mode="wait">
            {selected.length > 0 && (
              <motion.div key="messageField" {...fadeSlide}>
                <MessageField />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            key="studentsTable"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <StudentsTable />
          </motion.div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Students;
