"use client";

import { motion } from "framer-motion";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Typography from "../ui/typography";
import Search from "../ui/inputs/search";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Badge from "../ui/badge";
import MyCheckbox from "../ui/checkbox";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useRouter } from "next/router";
import { IPaginatedStudent, IStudentList } from "@/lib/types/student.types";
import { useQuery } from "@tanstack/react-query";
import { fetchStudents } from "@/lib/actions/students.action";
import TableSkeleton from "../ui/table-skeleton";
import { TableNotFoundRow } from "../ui/table-not-found";
import { queryClient } from "../providers/react-query-provider";

interface Props {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function StudentsTable({ page, setPage }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<IStudentList[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { control, watch } = useFormContext();
  const { append, remove } = useFieldArray({
    control,
    name: "selectedStudents", // field array to store selected IDs
  });

  const selected = watch("selectedStudents") || [];

  const id = router.query.id;

  const filterData = useMemo(() => {
    return { page, search, page_size: 10 };
  }, [search, page]);

  const { data: studentsData, isFetching } = useQuery<IPaginatedStudent>({
    queryKey: ["students", page, id, Object.values(filterData)],
    queryFn: () => fetchStudents(Number(id), filterData),
    enabled: !!id,
  });

  useEffect(() => {
    if (search) {
      setPage(1); // Reset page to 1 when search changes
      setStudents([]); // Clear students when search changes
    }
  }, [search, setPage]);

  const hasNextPage = studentsData?.next;

  useEffect(() => {
    if (studentsData?.results) {
      if (page === 1) {
        setStudents(studentsData?.results);
      } else {
        setStudents((prev) => [...prev, ...studentsData.results]);
      }
    }
  }, [studentsData, page]);

  const loadMoreStudents = useCallback(() => {
    if (!hasNextPage || isFetching) return;
    setPage((prevPage: number) => prevPage + 1);
  }, [hasNextPage, isFetching, setPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreStudents();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMoreStudents]);

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
    if (selected.length === students.length) {
      // clear all
      remove();
    } else {
      // select all
      remove();
      students.forEach((student) => append({ id: student.id }));
    }
  };

  const isAllChecked = selected.length === students.length;

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
          <Badge>{studentsData?.count ?? 0} ta talaba</Badge>
        </div>
        <Search value={search} onChange={setSearch} placeholder="Qidirish" />
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>
              <MyCheckbox value={isAllChecked} onChange={toggleAll} />
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>T/R</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Ism va Familiya</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Telefon raqami</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>JSHSHIR</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Kontrakt summasi</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Toʻlangan summa</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {!isFetching && students?.length === 0 ? (
            <TableNotFoundRow
              colSpan={2}
              onReload={() => {
                queryClient.invalidateQueries({ queryKey: ["students"] });
                setPage(1);
              }}
            />
          ) : (
            students?.map((student, idx) => {
              const isChecked = selected.some(
                (s: { id: number }) => s.id === student.id
              );
              return (
                <motion.tr
                  key={student.id}
                  // initial={{ opacity: 0, y: 10 }}
                  // animate={{ opacity: 1, y: 0 }}
                  // transition={{ delay: idx * 0.1 }}
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(`/edu-years/info?id=${student.id}`)
                  }
                >
                  <TableCell
                    sx={{ width: 24 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MyCheckbox
                      value={isChecked}
                      onChange={() => toggleStudent(student.id)}
                    />
                  </TableCell>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{student.full_name}</TableCell>
                  <TableCell>{student.phone_number || "-"}</TableCell>
                  <TableCell>{student.jshshir}</TableCell>
                  <TableCell>{student.contract}</TableCell>
                  <TableCell>-</TableCell>
                </motion.tr>
              );
            })
          )}
        </TableBody>
      </Table>
      {isFetching && students.length === 0 && <TableSkeleton />}
      {isFetching && students.length !== 0 && (
        <div className="w-full flex justify-center pt-6">
          <CircularProgress sx={{ color: "#5B72B5" }} />
        </div>
      )}
      <div ref={observerRef} />
    </motion.div>
  );
}
