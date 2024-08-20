import { describe, test } from "bun:test";
import { db, insertInto } from "./db";
import { UserSchema } from "./users";

describe("DB methods", () => {
  test("insertInto", () => {
    for (const key of Object.keys(UserSchema.shape)) {
      console.log(
        key,
        UserSchema.shape[key as keyof typeof UserSchema.shape]._def
      );
    }
    // db.run("CREATE TABLE foo (bar TEXT)");
    // // clean table
    // db.run("DELETE FROM foo");

    // insertInto("foo", { bar: "baz" });
  });
});
