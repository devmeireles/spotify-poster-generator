import { CreatePoster } from "~/app/_components/create-poster";

export default function Home() {
  // const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen text-gray-950 px-12">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        {<CreatePoster />}
      </div>
    </main>
  );
}
