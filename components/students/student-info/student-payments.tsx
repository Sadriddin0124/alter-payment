"use client";

import { fetchStudentPayment } from "@/lib/actions/students.action";
import { formatCurrency } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

export default function StudentPayments() {
  const { data: payments } = useQuery({
    queryKey: ["payments"],
    queryFn: () => fetchStudentPayment({}),
  });

  console.log(payments);
  

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
                  To’langan sana
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {payments.map((p, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <TableCell>{formatCurrency(p.required)}</TableCell>
                  <TableCell>{p.deadline}</TableCell>
                  <TableCell>{formatCurrency(p.paid)}</TableCell>
                  <TableCell>{p.date}</TableCell>
                </motion.tr>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </motion.div>
  );
}
