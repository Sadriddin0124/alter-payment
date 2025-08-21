import PaymentSettings from "@/components/students/student-info/payment-settings";
import StudentDetails from "@/components/students/student-info/student-details";
import StudentPayments from "@/components/students/student-info/student-payments";
import Button from "@/components/ui/button";
import { useRouter } from "next/router";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

const StudentInfo = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-8 pt-8 w-full">
      <div className="flex items-center gap-4 justify-between">
        <Button
          variant="outlined"
          className="self-start"
          onClick={() => router.back()}
        >
          <FaArrowLeft className="mr-2" />
          Ortga
        </Button>
        <PaymentSettings />
      </div>
      <div className="flex gap-6 items-start w-full">
        <StudentDetails />
        <StudentPayments />
      </div>
    </div>
  );
};

export default StudentInfo;
