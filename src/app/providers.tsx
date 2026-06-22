"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

interface ProvidersProps {
  children: ReactNode;
  session: Session | null;
}

export default function Providers({
  children,
  session,
}: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
    </SessionProvider>
  );
}