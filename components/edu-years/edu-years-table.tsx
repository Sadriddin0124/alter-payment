"use client";

import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#4C5CA8" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                Start Year
              </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                End Year
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((year, idx) => (
              <motion.tr
                key={year.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
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
