import { z } from "zod";

export const UserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const users: User[] = [
  {
    username: "admin",
    password: "admin",
  },
];

export const usersMap = new Map<string, User>(
  users.map((user) => [user.username, user])
);
