import Koa from "koa";
import { authMiddleware, loginRouter } from "./src/auth";
import { bodyParser } from "@koa/bodyparser";

const app = new Koa();
app.use(bodyParser()).use(loginRouter.routes()).use(authMiddleware);

// app.use(bodyParser());

// app.use((ctx) => {
//   // the parsed body will store in ctx.request.body
//   // if nothing was parsed, body will be an empty object {}
//   ctx.body = ctx.request.body;
// });
app.listen(3000);
