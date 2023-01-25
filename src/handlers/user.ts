import express, { Request, Response, NextFunction } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as unknown as string);
    const user = await store.show(id);
    res.json({
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const user: User = {
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };
  try {
    const newUser = await store.create(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as unknown as string,
    );
    res.json({
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      token
    });
  } catch (err) {
    res.status(400);
    res.json(`${err} + ${user}`);
  }
};

const edit = async (req: Request, res: Response) => {
  const user: User = {
    id: parseInt(req.params.id),
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };

  try {
    const newUser = await store.edit(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as unknown as string,
    );
    res.json({
      username: newUser.username,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      password: newUser.password,
    });
  } catch (err) {
    res.status(400);
    res.json(`${err} + ${user}`);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as unknown as string);
    const user = await store.delete(id);
    res.json({
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const provideToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJ1c2VybmFtZSI6IkZpcnN0IFVzZXIiLCJmaXJzdF9uYW1lIjpudWxsLCJsYXN0X25hbWUiOm51bGwsInBhc3N3b3JkIjoiJDJiJDEwJGdiZkJ2SDcyVGs1MjZMa3cyZ09iMi5CQjFKcC5wTHJzaFh5cjZsOEUyOHVQdFRWbEhEaVhpIn0sImlhdCI6MTY3NDM5ODE0MH0.8HtOWUsyRbOGmt9FJCEi4JEnmSh5k5gHJ_S4mlW-vck";

  if (!token) {
    console.log("token: undefined");
  } else {
    req.headers.authorization = "Bearer " + token;
  }
  next();
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

const user_routes = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.put("/users/:id", edit);
  app.post("/users", create);
  app.delete("/users/:id", destroy);
};

export default user_routes;
