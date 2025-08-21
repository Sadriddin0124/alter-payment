import UserAvatar from "@/components/ui/icons/user-avatar";
import Typography from "@/components/ui/typography";
import { formatCurrency } from "@/lib/utils";
import React from "react";
import StudentPaymentCard from "./student-payment-card";

const student = {
  name: "Azizbek Ergashev",
  group: "21-IT-1-guruh",
  phone: "+998 90 123 45 68",
  direction: "Dasturiy Injenering",
  contract: 12000000,
  paid: 6000000,
  debt: 6000000,
};

const StudentDetails = () => {
  const payments = [
    {
      label: "Kontrakt summasi",
      value: student.contract,
      color: "#6E8AC3",
    },
    {
      label: "To'langan summa",
      value: student.paid,
      color: "#12B76A",
    },
    {
      label: "Qarz summasi",
      value: student.debt,
      color: "#F04438",
    },
  ];
  
  return (
    <div className="rounded-2xl shadow-md p-6 flex flex-col gap-4 max-w-[400px] w-full border border-gray-200">
      <div className="flex items-center gap-4">
        <UserAvatar />
        <div>
          <Typography variant="h5">{student.name}</Typography>
          <Typography variant="h7" color="gray">
            {student.group}
          </Typography>
        </div>
      </div>

      <div className="mt-2 space-y-2 text-sm">
        <div className="flex flex-col gap-3">
          <Typography variant="h6" className="font-medium">
            Telefon raqami
          </Typography>
          <Typography variant="h7" color="gray">
            {student.phone}
          </Typography>
        </div>
        <div className="flex flex-col gap-3">
          <Typography variant="h6" className="font-medium">
            Yo’nalish
          </Typography>
          <Typography variant="h7" color="gray">
            {student.direction}
          </Typography>
        </div>
      </div>

      {/* Contract info */}
      <div className="mt-6 space-y-3 text-sm">
        {payments.map((payment, index) => (
          <StudentPaymentCard
            key={index}
            label={payment.label}
            value={formatCurrency(payment.value)}
            color={payment.color}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentDetails;
