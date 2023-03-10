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
  res.send("Hello Shopper!");
});

user_routes(app);
product_routes(app);
order_routes(app);
dashboard_routes(app);

app.listen(port, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
