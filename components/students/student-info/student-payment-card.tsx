import React from "react";
import { motion } from "framer-motion";
import Typography from "@/components/ui/typography";

interface Props {
  label: string;
  value: string;
  color?: string;
}

const StudentPaymentCard = ({ label, value, color }: Props) => {
  return (
    <motion.div className="flex flex-col gap-3 p-3 rounded-xl bg-[#F5F5F5]">
      <Typography variant="h5">{label}</Typography>
      <p className="font-semibold" style={{color}}>{value}</p>
    </motion.div>
  );
};

export default StudentPaymentCard;
