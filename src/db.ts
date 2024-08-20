import { Database } from "bun:sqlite";

export const db = new Database(":memory:");

export const insertInto = (table: string, data: Record<string, any>) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => "?").join(", ");
  const query = `INSERT INTO ${table} (${keys.join(
    ", "
  )}) VALUES (${placeholders})`;

  return db.run(query, values);
};
