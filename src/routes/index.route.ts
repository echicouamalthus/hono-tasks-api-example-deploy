import { createRoute } from "@hono/zod-openapi";
// import { Hono } from "hono";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import env from "@/env";
import { createRouter } from "@/lib/create-app";

const router = createRouter()
  .openapi(
    createRoute({
      tags: ["Index"],
      method: "get",
      path: "/",
      responses: {
        [HttpStatusCodes.OK]: jsonContent(
          createMessageObjectSchema("Tasks API"),
          "Tasks API Index",
        ),
      },
    }),
    (c) => {
      return c.json({
        message: "Tasks API",
      }, HttpStatusCodes.OK);
    },
  );

// const app = new Hono();

// app.get("/", (c) => {
//   return c.json({ message: `Voici le lien pour la documentation api. <${env.DEPLOY_URL}/reference>` });
// });

export default router;
