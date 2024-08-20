import { z } from "zod";
import { db } from "./db";

db.query(`create table users (
  id serial primary key,
  username text not null,
  password text not null
)`);

export const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof UserSchema>;

// CRUD USERS
// export const createUser = async (user: User) => {
//   users.push(
//     UserSchema.parse({
//       ...user,
//       password: await Bun.password.hash(user.password),
//     })
//   );
// };

// export const getUser = (username: string) => {
//   return usersMap.get(username);
// };
