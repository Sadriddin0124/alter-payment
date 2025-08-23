import PaymentSettings from "@/components/students/student-info/payment-settings";
import StudentDetails from "@/components/students/student-info/student-details";
import StudentPayments from "@/components/students/student-info/student-payments";
import Button from "@/components/ui/button";
import {
  fetchStudent,
  fetchStudentPayment,
} from "@/lib/actions/students.action";
import { IStudentPayments } from "@/lib/types/student.types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

const StudentInfo = () => {
  const router = useRouter();

  const id = router.query.id;

  const { data: student } = useQuery({
    queryKey: ["student-info"],
    queryFn: () => fetchStudent(Number(id)),
    enabled: !!id,
  });

  const { data: payments } = useQuery<IStudentPayments[]>({
    queryKey: ["payments", id],
    queryFn: () => fetchStudentPayment({ student: Number(id) }),
    enabled: !!id,
  });

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
        <PaymentSettings contract={student?.contract ?? 0} data={payments?.[0] as IStudentPayments} />
      </div>
      <div className="flex gap-6 items-start w-full">
        <StudentDetails student={student}  />
        <StudentPayments data={payments?.[0]?.installment_payments ?? []} />
      </div>
    </div>
  );
};

export default StudentInfo;
