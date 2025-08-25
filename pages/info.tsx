import { useAppData } from "@/components/providers/me-provider";
import StudentDetails from "@/components/student-info/student-details";
import StudentPayments from "@/components/student-info/student-payments";
import Typography from "@/components/ui/typography";
import {
  fetchStudent,
  fetchStudentPayment,
} from "@/lib/actions/students.action";
import { IStudentPayments } from "@/lib/types/student.types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const StudentInfo = () => {
  const { me } = useAppData();

  const id = me?.id;

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
        <Typography variant="h1">
          Talaba ma’lumotlari
        </Typography>
      </div>
      <div className="flex gap-6 items-start w-full">
        <StudentDetails student={student}  />
        <StudentPayments data={payments?.[0]?.installment_payments ?? []} />
      </div>
    </div>
  );
};

export default StudentInfo;
