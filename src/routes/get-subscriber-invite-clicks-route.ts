import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import z from "zod"
import { env } from "../env"
import { accessInviteLink } from "../functions/access-invite-link"
import { getSubscriberInviteCLicks } from "../functions/get-subscriber-invite-clicks"

export const getSubscriberInviteClicksRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      "/subscribers/:subscriberId/ranking/clicks",
      {
        schema: {
          summary: "Get subscriber invite clicks count",
          tags: ["referral"],
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params

        const { count } = await getSubscriberInviteCLicks({
          subscriberId,
        })

        return {
          count,
        }
      }
    )
  }
