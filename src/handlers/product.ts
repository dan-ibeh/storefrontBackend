import express, { Request, Response, NextFunction } from "express";
import { Product, ProductStore } from "../models/product";
import jwt from "jsonwebtoken";

const store = new ProductStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as unknown as string);
    const product = await store.show(id);
    res.json({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const product: Product = {
    name: req.body.name as unknown as string,
    price: parseInt(req.body.price as unknown as string),
    category: req.body.category as unknown as string,
  };

  try {
    const newProduct = await store.create(product);
    res.json({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const edit = async (req: Request, res: Response): Promise<void> => {
  const product: Product = {
    id: parseInt(req.params.id as unknown as string),
    name: req.body.name as unknown as string,
    price: parseInt(req.body.price as unknown as string),
    category: req.body.category as unknown as string,
  };
  try {
    const editedProduct = await store.edit(product);
    res.json({
      id: editedProduct.id,
      name: editedProduct.name,
      price: editedProduct.price,
      category: editedProduct.category,
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const del = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id as unknown as string);
    const product = await store.delete(id);
    res.json({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productByCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const category = req.body.category as unknown as string;
    const products = await store.productByCategory(category);
    res.json(products);
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

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.get("/products/category/:category", productByCategory);
  app.post("/products", verifyAuthToken, create);
  app.put("/products/:id", edit);
  app.delete("/products/:id", verifyAuthToken, del);
};

export default product_routes;
