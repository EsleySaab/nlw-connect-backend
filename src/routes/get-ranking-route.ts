import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { env } from "../env"
import { accessInviteLink } from "../functions/access-invite-link"
import { getRanking } from "../functions/get-ranking"
import { getSubscriberInviteCLicks } from "../functions/get-subscriber-invite-clicks"

export const getRankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    "/ranking",
    {
      schema: {
        summary: "Get ranking",
        tags: ["referral"],

        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },
    async request => {
      const { rankingWithScore } = await getRanking()

      return {
        ranking: rankingWithScore,
      }
    }
  )
}
