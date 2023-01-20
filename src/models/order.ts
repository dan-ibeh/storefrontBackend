/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import client from "../database";

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get order ${id}. Error: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (status, user_id) VALUES($1, $2)  RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [order.status, order.user_id]);

      const order1 = result.rows[0];

      conn.release();

      return order1;
    } catch (err) {
      throw new Error(`Could not add order ${order}. Error: ${err}`);
    }
  }

  async edit(order: Order): Promise<Order> {
    try {
      const sql =
        "UPDATE orders SET status = $2, user_id = $3 WHERE id = $1 RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [
        order.id,
        order.status,
        order.user_id,
      ]);

      const order1 = result.rows[0];

      conn.release();

      return order1;
    } catch (err) {
      throw new Error(`Could not edit order ${order.id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1)";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: number,
    productId: number,
  ): Promise<{
    id: number;
    quantity: number;
    order_id: number;
    product_id: number;
  }> {
    try {
      const sql = "SELECT * FROM orders WHERE id = $1 AND status = 'active'";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [orderId]);

      const order = result.rows[0];

      conn.release();
    } catch (err) {
      throw new Error(`Could not find active order ${orderId}. Error: ${err}`);
    }
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3)  RETURNING *";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}. Error: ${err}`,
      );
    }
  }

  async currentOrderByUser(user_id: number): Promise<Order> {
    try {
      const sql =
        "SELECT * FROM orders WHERE user_id=($1) AND status = 'active'";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not get active order for user ${user_id}. Error: ${err}`,
      );
    }
  }

  async completedOrdersByUser(user_id: number): Promise<Order[]> {
    try {
      const sql =
        "SELECT * FROM orders WHERE user_id=($1) AND status = 'completed'";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get completed orders for user ${user_id}. Error: ${err}`,
      );
    }
  }
}
