import express, { Request, Response } from "express";

import { DashboardQueries } from "../services/dashboard";

const dashboard = new DashboardQueries();

const productsInOrders = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.productsInOrders();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const fiveMostExpensive = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.fiveMostExpensive();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const usersWithOders = async (_req: Request, res: Response) => {
  try {
    const users = await dashboard.usersWithOders();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const dashboard_routes = (app: express.Application) => {
  app.get("/products_in_orders", productsInOrders);
  app.get("/five_most_expensive", fiveMostExpensive);
  app.get("/users_with_orders", usersWithOders);
};

export default dashboard_routes;
