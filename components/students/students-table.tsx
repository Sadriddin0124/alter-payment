"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Typography from "../ui/typography";
import Search from "../ui/inputs/search";
import { useState } from "react";
import Badge from "../ui/badge";
import MyCheckbox from "../ui/checkbox";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useRouter } from "next/router";

const data = [
  {
    id: 1,
    name: "Umidbek",
    phone: "+998 99 999 99 99",
    jshshir: "1234567",
    contract: "1000000",
    paid: "500000",
  },
  {
    id: 2,
    name: "Umidbek",
    phone: "+998 99 999 99 99",
    jshshir: "1234567",
    contract: "1000000",
    paid: "500000",
  },
  {
    id: 3,
    name: "Umidbek",
    phone: "+998 99 999 99 99",
    jshshir: "1234567",
    contract: "1000000",
    paid: "500000",
  },
];

export default function StudentsTable() {
  const router = useRouter()
  const [search, setSearch] = useState("");

  const { control, watch } = useFormContext();
  const { append, remove } = useFieldArray({
    control,
    name: "selectedStudents", // field array to store selected IDs
  });

  const selected = watch("selectedStudents") || [];

  const toggleStudent = (id: number) => {
    const exists = selected.find((s: { id: number }) => s.id === id);
    if (exists) {
      const idx = selected.findIndex((s: { id: number }) => s.id === id);
      remove(idx);
    } else {
      append({ id });
    }
  };

  const toggleAll = () => {
    if (selected.length === data.length) {
      // clear all
      remove();
    } else {
      // select all
      remove();
      data.forEach((student) => append({ id: student.id }));
    }
  };

  const isAllChecked = selected.length === data.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="shadow-md rounded-2xl p-4 flex flex-col border border-gray-200 w-full"
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Typography variant="h5">Talabalar roʻyxati</Typography>
          <Badge>{data.length} ta talaba</Badge>
        </div>
        <Search value={search} onChange={setSearch} placeholder="Qidirish" />
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>
                <MyCheckbox
                  value={isAllChecked}
                  onChange={toggleAll}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Ism va Familiya</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Telefon raqami</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>JSHSHIR</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Kontrakt summasi</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Toʻlangan summa</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((student, idx) => {
              const isChecked = selected.some((s: { id: number }) => s.id === student.id);
              return (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="cursor-pointer"
                  onClick={() => router.push(`/edu-years/info?id=${student.id}`)}
                >
                  <TableCell sx={{ width: 24 }}>
                    <MyCheckbox
                      value={isChecked}
                      onChange={() => toggleStudent(student.id)}
                    />
                  </TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>{student.jshshir}</TableCell>
                  <TableCell>{student.contract}</TableCell>
                  <TableCell>{student.paid}</TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
}
