import express, { Request, Response } from "express";

import { DashboardQueries } from "../services/dashboard";

const dashboard = new DashboardQueries();

const fiveMostPopular = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.fiveMostPopular();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const dashboard_routes = (app: express.Application) => {
  app.get("/five_most_popular", fiveMostPopular);
};

export default dashboard_routes;
