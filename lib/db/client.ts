import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

// Conexión perezosa con el driver HTTP serverless de Neon: sin conexiones TCP
// persistentes (que fallaban en arranque en frío cuando Neon estaba suspendida).
// Cada consulta es una petición HTTP sin estado, ideal para Vercel serverless.
let _db: Db | null = null;

function getDb(): Db {
  if (_db) return _db;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  _db = drizzle(neon(url), { schema });
  return _db;
}

export const db = new Proxy({} as Db, {
  get(_target, prop) {
    const real = getDb() as unknown as Record<string | symbol, unknown>;
    const value = real[prop];
    return typeof value === "function" ? value.bind(real) : value;
  },
});
