import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import user_routes from "./handlers/user";
import product_routes from "./handlers/product";
import order_routes from "./handlers/order";
import dashboard_routes from "./handlers/dashboard";

const app: express.Application = express();

const { POSTGRES_HOST: host, POSTGRES_PORT: port } = process.env;
const address: string = `${host}:${port}`;

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6IkZpcnN0IFVzZXIiLCJmaXJzdF9uYW1lIjpudWxsLCJsYXN0X25hbWUiOm51bGwsInBhc3N3b3JkIjoiJDJiJDEwJFZ3VWJvYjQ0UHlBOHVuejBFSGhncXVwRlpKLzFranZQSWtUWEszWE00Uno1LnRpNTQ1U2lHIn0sImlhdCI6MTY3NDIyMTkyMH0.jO71FVr0BCuusfihV6IGs5kk6UT2whrNng3f5Tb9Dnk";

  try {
    req.headers.authorization = "Bearer " + token;
  } catch(err) {
    throw new Error(`Token undefined: ${err}`)
  }
  next();
});

user_routes(app);
product_routes(app);
order_routes(app);
dashboard_routes(app);

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
