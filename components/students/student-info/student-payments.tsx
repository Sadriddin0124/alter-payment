"use client";

import { IStudentPaymentSplits } from "@/lib/types/student.types";
import { formatCurrency } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import { motion } from "framer-motion";

type Props = {
  data: IStudentPaymentSplits[];
};

export default function StudentPayments({ data }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Right table */}
      <div className="md:col-span-2 shadow rounded-xl border border-gray-200 min-h-[600px] overflow-hidden">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ maxHeight: 44 }}>
                <TableCell sx={{ fontWeight: "bold" }}>
                  To’lanishi kerak
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Muddat</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  To’langan summa
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Qolgan summa
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((p, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <TableCell>{formatCurrency(Number(p.amount))}</TableCell>
                  <TableCell>{format(new Date(p.payment_date), "dd.MM.yyyy")}</TableCell>
                  <TableCell>{formatCurrency(Number(p.amount) - Number(p.left))}</TableCell>
                  <TableCell>{formatCurrency(Number(p.left))}</TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </motion.div>
  );
}
