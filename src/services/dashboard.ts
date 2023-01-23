/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import client from "../database";
import { Product } from "../models/product";

export class DashboardQueries {
  // Get 5 most popular products
  async fiveMostPopular(): Promise<Product[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        "SELECT products.name, SUM(order_products.quantity) as total_quantity FROM products " +
        "INNER JOIN order_products ON products.id = order_products.product_id " +
        "GROUP BY products.name " +
        "ORDER BY total_quantity DESC LIMIT 5";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products: ${err}`);
    }
  }
}
