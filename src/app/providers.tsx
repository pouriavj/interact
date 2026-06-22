"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
    </SessionProvider>
  );
}
