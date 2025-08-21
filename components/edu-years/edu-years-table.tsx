"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Typography from "../ui/typography";
import Search from "../ui/inputs/search";
import { useState } from "react";
import { useRouter } from "next/router";

const data = [
  { id: 1, startYear: "2022", endYear: "2023" },
  { id: 2, startYear: "2022", endYear: "2023" },
  { id: 3, startYear: "2022", endYear: "2023" },
  { id: 4, startYear: "2022", endYear: "2023" },
  { id: 5, startYear: "2022", endYear: "2023" },
  { id: 6, startYear: "2022", endYear: "2023" },
  { id: 7, startYear: "2022", endYear: "2023" },
  { id: 8, startYear: "2022", endYear: "2023" },
  { id: 9, startYear: "2022", endYear: "2023" },
  { id: 10, startYear: "2022", endYear: "2023" },
];

export default function YearTable() {
  const [search, setSearch] = useState("");

  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="shadow-md rounded-2xl p-4 flex flex-col border border-gray-200"
    >
      <div className="flex items-center justify-between p-4">
        <Typography variant="h5">Oʻquv yillari roʻyxati</Typography>
        <Search value={search} onChange={setSearch} placeholder="Qidirish" />
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Start Year</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>End Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((year, idx) => (
            <motion.tr
              key={year.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => router.push(`/edu-years/students?id=${year.id}`)}
            >
              <TableCell>{year.startYear}</TableCell>
              <TableCell>{year.endYear}</TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
