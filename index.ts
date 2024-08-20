import Koa from "koa";
import { authMiddleware, loginRouter } from "./src/auth";
import { bodyParser } from "@koa/bodyparser";
import "./src/db";

const app = new Koa();
app.use(bodyParser()).use(loginRouter.routes()).use(authMiddleware);

app.listen(3000);
