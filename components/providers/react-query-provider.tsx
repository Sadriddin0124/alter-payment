import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* < ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};
