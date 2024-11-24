import {drizzle} from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import env from '@/env';

const pgClient = postgres(env.DATABASE_URL, {max: 1})

async function main () {
  try {
    await migrate(drizzle(pgClient), {migrationsFolder: "./src/db/migrations"});
    // eslint-disable-next-line no-console
    console.log('Migration completed');
    pgClient.end()
  } catch (error) {
    console.error('Error during migration:', error);

    pgClient.end()
    process.exit(1);
  }
}

main();