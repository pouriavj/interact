import * as acions from "@/actions";
import { auth } from "@/auth";
import PrimaryButton from "@/components/PrimaryButton";
import Profile from "@/components/Profile";
import SecondaryButton from "@/components/SecondaryButton";

export default async function Home() {
  const session = await auth();
  
  if (!session) {
    return (
      <form action={acions.signIn}>
        <PrimaryButton type="submit" children="Login with GitHub" />
      </form>
    );
  }

  return (
    <div>
      <h1>Welcome {session.user?.name}</h1>

      <img src={session.user?.image ?? ""} alt="" width={100} />

      <form action={acions.signOut}>
        <SecondaryButton type="submit" children="Logout" color="warning" />
      </form>
      <Profile />
    </div>
  );
}
