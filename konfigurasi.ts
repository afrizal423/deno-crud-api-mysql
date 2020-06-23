import { Client } from "https://deno.land/x/mysql/mod.ts";

const dbKonfig = {
    user: "root",
    database: "deno_test",
    password: "",
    hostname: "127.0.0.1",
    port: 3306,
    poolsize: 3,
}

const client = await new Client().connect({
    hostname: dbKonfig.hostname,
    username: dbKonfig.user,
    db: dbKonfig.database,
    poolSize: dbKonfig.poolsize,
    password: dbKonfig.password,
  });

export { client }