import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

let _pool: Pool | undefined;
let _db: NodePgDatabase<typeof schema> | undefined;

function pool(): Pool {
  if (!_pool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    _pool = new Pool({ connectionString: url });
  }
  return _pool;
}

/**
 * Lazily build and memoize the drizzle client. Importing this module never
 * touches the database; the pool/connection is created on first call only.
 */
export function getDb(): NodePgDatabase<typeof schema> {
  if (!_db) {
    _db = drizzle(pool(), { schema });
  }
  return _db;
}
