import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { type TArtistResponse } from "~/types/TArtist";


export const artistRouter = createTRPCRouter({
  getArtists: protectedProcedure
    .input(
      z.object({
        timeRange: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const { token } = ctx.session.user;

        const req = await fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${input.timeRange}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await req.json() as TArtistResponse;

        return data.items;
      } catch (error) {
        console.log(error)
      }
    }),
});
