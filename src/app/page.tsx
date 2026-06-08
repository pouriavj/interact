import * as acions from "@/actions";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return (
      <form action={acions.signIn}>
        <button type="submit">Login with GitHub</button>
      </form>
    );
  }

  return (
    <div>
      <h1>Welcome {session.user?.name}</h1>

      <img src={session.user?.image ?? ""} alt="" width={100} />

      <form action={acions.signOut}>
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
