import Layout from "@/components/layout/layout";
import { AppDataProvider } from "@/components/providers/me-provider";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <AppDataProvider>
        <Layout>
          <Component {...pageProps} />
          <Toaster richColors position="top-right" />
        </Layout>
      </AppDataProvider>
    </ReactQueryProvider>
  );
}
