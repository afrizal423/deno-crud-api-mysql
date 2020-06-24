import { Client } from "https://deno.land/x/mysql/mod.ts";
import { dbKonfig } from "../settings/config.ts"

export const client = await new Client().connect({
    hostname: dbKonfig.hostname,
    username: dbKonfig.user,
    db: dbKonfig.database,
    poolSize: dbKonfig.poolsize,
    password: dbKonfig.password,
  });
