"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { SessionProvider } from "next-auth/react";

interface ProvidersProps {
  children: React.ReactNode;
}
export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
    </SessionProvider>
  );
}
