import { postRouter } from "~/server/api/routers/post";
import { createTRPCRouter } from "~/server/api/trpc";
import { artistRouter } from "./routers/artist";
import { trackRouter } from "./routers/track";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  artist: artistRouter,
  track: trackRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
