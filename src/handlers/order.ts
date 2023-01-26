import express, { Request, Response, NextFunction } from "express";
import { Order, OrderStore } from "../models/order";
import jwt from "jsonwebtoken";

const store = new OrderStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as unknown as string);
    const order = await store.show(id);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const order: Order = {
    status: req.body.status as unknown as string,
    user_id: parseInt(req.body.user_id as unknown as string),
  };

  try {
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const edit = async (req: Request, res: Response): Promise<void> => {
  const order: Order = {
    id: parseInt(req.body.id as unknown as string),
    status: req.body.status as unknown as string,
    user_id: parseInt(req.body.user_id as unknown as string),
  };
  try {
    const editedOrder = await store.edit(order);
    res.json(editedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const del = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as unknown as string);
    const deletedOrder = await store.delete(id);
    res.json(deletedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  const orderId: number = parseInt(req.params.id as unknown as string);
  const productId: number = parseInt(req.body.productId as unknown as string);
  const quantity: number = parseInt(req.body.quantity as unknown as string);

  try {
    const newOrder = await store.addProduct(quantity, orderId, productId);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const currentOrderByUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = parseInt(req.params.user_id as unknown as string);
    const order = await store.currentOrderByUser(userId);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const completedOrdersByUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const userId = parseInt(req.params.user_id as unknown as string);
    const order = await store.completedOrdersByUser(userId);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    const token = authorizationHeader?.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as unknown as string);
    next();
  } catch (err) {
    res.status(401);
    res.json(`Access denied, invalid token ${err}`);
  }
};

const order_routes = (app: express.Application) => {
  app.get("/orders", index);
  app.get("/orders/:id", show);
  app.post("/orders", verifyAuthToken, create);
  app.post("/orders/:id/products", verifyAuthToken, addProduct);
  app.put("/orders/:id", verifyAuthToken, edit);
  app.delete("/orders/:id", verifyAuthToken, del);

  app.get("/orders/active/:user_id", verifyAuthToken, currentOrderByUser);
  app.get("/orders/completed/:user_id", verifyAuthToken, completedOrdersByUser);
};

export default order_routes;
