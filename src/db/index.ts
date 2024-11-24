import {drizzle} from "drizzle-orm/postgres-js"
import postgres from "postgres"
// import { createClient } from "@libsql/client";
// import { drizzle } from "drizzle-orm/libsql";

import env from "@/env";

import * as schema from "./schema";

const client = postgres(env.DATABASE_URL)

const db = drizzle(client, {schema})

// const client = createClient({
//   url: env.DATABASE_URL,
//   authToken: env.DATABASE_AUTH_TOKEN,
// });

// const db = drizzle(client, {
//   schema,
// });

export default db;
