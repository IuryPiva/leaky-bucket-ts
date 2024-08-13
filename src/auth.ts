import Router from "@koa/router";
import type Application from "koa";
import { UserSchema, usersMap, type User } from "./users";
import jwt from "jsonwebtoken";
import { z } from "zod";

const SECRET_KEY = "secret";

export const authMiddleware: Application.Middleware<{ user?: User }> = async (
  ctx
) => {
  const authHeader = ctx.request.headers.authorization;

  if (!authHeader) {
    return ctx.throw(401, "Unauthorized");
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return ctx.throw(401, "Unauthorized");
  }

  jwt.verify(token, SECRET_KEY, (err, jwtPayload) => {
    if (err || !jwtPayload) return ctx.throw(403);

    const userPayload = z.object({ username: z.string() }).parse(jwtPayload);
    const user = usersMap.get(userPayload.username);

    ctx.state.user = user;
  });
};

export const loginRouter = new Router();

loginRouter.post("/login", (ctx) => {
  try {
    const body = ctx.request.body;
    const userRequested = UserSchema.parse(body);

    const user = usersMap.get(userRequested.username);

    if (!user || user.password !== userRequested.password)
      throw new Error("Invalid credentials");

    const token = jwt.sign({ username: user.username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    ctx.body = { token };
  } catch (error) {
    return ctx.throw(401, "Unauthorized");
  }
});
