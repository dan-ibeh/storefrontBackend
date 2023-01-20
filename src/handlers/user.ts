import express, { Request, Response, NextFunction } from "express";
import { User, UserStore } from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (_req: Request, res: Response) => {
  const user = await store.show(_req.body.id);
  res.json(user);
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
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(`${err} + ${user}`);
  }
};

const edit = async (req: Request, res: Response) => {
  const user: User = {
    id: parseInt(req.body.id),
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body,
  };

  try {
    // const authorizationHeader = req.headers.authorization as unknown as string;
    // const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(
      req.body.token,
      process.env.TOKEN_SECRET as unknown as string,
    ) as JwtPayload;
    if (decoded.id !== user.id) {
      throw new Error("User id does not match!");
    }
  } catch (err) {
    res.status(401);
    res.json(`Access denied, invalid token ${err}`);
    return;
  }
  try {
    const newUser = await store.edit(user);
    const token = jwt.sign(
      { user: newUser },
      process.env.TOKEN_SECRET as unknown as string,
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(`${err} + ${user}`);
  }
};

const destroy = async (_req: Request, res: Response) => {
  const deleted = await store.authenticate(
    _req.body.username,
    _req.body.password,
  );
  res.json(deleted);
};

const authenticate = async (_req: Request, res: Response) => {
  try {
    const authenticated = await store.authenticate(
      _req.body.username,
      _req.body.password,
    );
    const token = jwt.sign(
      { user: authenticated },
      process.env.TOKEN_SECRET as unknown as string,
    );
    res.json(token);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    // const authorizationHeader = req.headers.authorization;
    // const token = authorizationHeader?.split(" ")[1];
    jwt.verify(
      req.body.token as unknown as string,
      process.env.TOKEN_SECRET as unknown as string,
    );
    next();
  } catch (err) {
    res.status(401);
    res.json(`Access denied, invalid token ${err}`);
  }
};

const user_routes = (app: express.Application) => {
  app.get("/user", verifyAuthToken, index);
  app.get("/user/:id", verifyAuthToken, show);
  app.put("/user/:id", edit);
  app.post("/user", verifyAuthToken, create);
  app.delete("/user", destroy);
  app.get("/authenticate", authenticate);
};

export default user_routes;
