import Link from "next/link";

import { CreatePoster } from "~/app/_components/create-poster";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen text-gray-950 px-12">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">

        {!session && (
          <div className="flex flex-col items-center gap-2">

            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>
        )}

        {session && <CreatePoster />}
      </div>
    </main>
  );
}