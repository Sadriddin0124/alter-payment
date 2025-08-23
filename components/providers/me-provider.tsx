"use client";

import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "@/lib/actions/auth.action";
import type { IStudentList } from "@/lib/types/student.types";

type AppDataValue = {
  me: IStudentList | null;
  isLoading: boolean;
  error: unknown;
};

const AppDataContext = createContext<AppDataValue | undefined>(undefined);

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (ctx === undefined) {
    // only thrown when provider is missing
    throw new Error("useAppData must be used within <AppDataProvider>");
  }
  return ctx;
}

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, error } = useQuery<IStudentList>({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  const value: AppDataValue = {
    me: data ?? null,      // never undefined
    isLoading,
    error,
  };

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
}
