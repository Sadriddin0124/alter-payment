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
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchEduYears } from "@/lib/actions/edu-years.action";
import { IEduYears, IPaginatedEduYears } from "@/lib/types/edu-year.types";
import TableSkeleton from "../ui/table-skeleton";
import EduYearsModal from "./edu-years-modal";
import EduYearsDelete from "./edu-years-delete";
import { TableNotFoundRow } from "../ui/table-not-found";
import { queryClient } from "../providers/react-query-provider";

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
}

export default function YearTable({ setPage, page }: Props) {
  const [search, setSearch] = useState("");
  const [eduYears, setEduYears] = useState<IEduYears[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const filterData = useMemo(() => {
    return { page, search, page_size: 10 };
  }, [search, page]);

  const { data: eduYearsData, isFetching } = useQuery<IPaginatedEduYears>({
    queryKey: ["edu-years", page, Object.values(filterData)],
    queryFn: () => fetchEduYears(filterData),
  });

  useEffect(() => {
    if (search) {
      setPage(1); // Reset page to 1 when search changes
      setEduYears([]); // Clear eduYears when search changes
    }
  }, [search, setPage]);

  const hasNextPage = eduYearsData?.next;

  useEffect(() => {
    if (eduYearsData?.results) {
      if (page === 1) {
        setEduYears(eduYearsData?.results);
      } else {
        setEduYears((prev) => [...prev, ...eduYearsData.results]);
      }
    }
  }, [eduYearsData, page]);

  const loadMoreEduYears = useCallback(() => {
    if (!hasNextPage || isFetching) return;
    setPage((prevPage) => prevPage + 1);
  }, [hasNextPage, isFetching, setPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreEduYears();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMoreEduYears]);

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
            <TableCell sx={{ fontWeight: "bold" }}>Oʻquv yili</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isFetching && eduYears?.length === 0 ? (
            <TableNotFoundRow
              colSpan={2}
              onReload={() => {
                queryClient.invalidateQueries({ queryKey: ["edu-years"] });
                setPage(1);
              }}
            />
          ) : (
            eduYears.map((year, idx) => (
              <motion.tr
                key={year.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => router.push(`/edu-years/students?id=${year.id}`)}
                className="cursor-pointer"
              >
                <TableCell>{year.edu_year}</TableCell>
                <TableCell align="right">
                  <div
                    className="flex full items-center gap-2 justify-end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EduYearsModal item={year} setPage={setPage} />
                    <EduYearsDelete id={year.id} setPage={setPage} />
                  </div>
                </TableCell>
              </motion.tr>
            ))
          )}
        </TableBody>
      </Table>
      {isFetching && eduYears.length === 0 && <TableSkeleton />}
      {isFetching && eduYears.length !== 0 && (
        <div ref={observerRef} className="w-full flex justify-center pt-6">
          <CircularProgress sx={{ color: "#5B72B5" }} />
        </div>
      )}
    </motion.div>
  );
}
