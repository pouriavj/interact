import type { Session } from "next-auth";

import BottomNavClient from "./BottomNavClient";

interface BottomNavProps {
  session: Session | null;
}

export default function BottomNav({ session }: BottomNavProps) {
  return <BottomNavClient session={session} />;
}