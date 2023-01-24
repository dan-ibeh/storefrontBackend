import { OrderStore } from "../models/order";
import { ProductStore } from "../models/product";
import { UserStore } from "../models/user";
import { DashboardQueries } from "../services/dashboard";

describe("User Model", () => {
  const store = new UserStore();
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a update method", () => {
    expect(store.edit).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add a user", async () => {
    const result = await store.create({
      id: 2,
      username: "daniel.ibeh",
      first_name: "Daniel",
      last_name: "Ibeh",
      password: "charity",
    });
    expect(result).toBeDefined();
  });

  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(result.length).toEqual(1);
  });

  it("show method should return the correct user", async () => {
    const result = await store.show(2);
    expect(result.username).toEqual("daniel.ibeh");
  });
});

describe("Product Model", () => {
  const store = new ProductStore();
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a update method", () => {
    expect(store.edit).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add a product", async () => {
    const result = await store.create({
      id: 2,
      name: "Pencil",
      price: 5,
      category: "stationery",
    });
    expect(result).toEqual({
      id: 2,
      name: "Pencil",
      price: 5,
      category: "stationery",
    });
  });

  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 2,
        name: "Pencil",
        price: 5,
        category: "stationery",
      },
    ]);
  });

  it("show method should return the correct product", async () => {
    const result = await store.show(2);
    expect(result).toEqual({
      id: 2,
      name: "Pencil",
      price: 5,
      category: "stationery",
    });
  });

  it("edit method should return the edited product", async () => {
    const result = await store.edit({
      id: 2,
      name: "Pencil",
      price: 10,
      category: "stationery",
    });
    expect(result).toEqual({
      id: 2,
      name: "Pencil",
      price: 10,
      category: "stationery",
    });
  });

  it("show method should return the correct product", async () => {
    const result = await store.show(2);
    expect(result).toEqual({
      id: 2,
      name: "Pencil",
      price: 10,
      category: "stationery",
    });
  });

  it("productByCategory method should return the products specified category", async () => {
    const result = await store.productByCategory("stationery");
    expect(result).toEqual([
      {
        id: 2,
        name: "Pencil",
        price: 10,
        category: "stationery",
      },
    ]);
  });
});

describe("Order Model", () => {
  const store = new OrderStore();
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a update method", () => {
    expect(store.edit).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add a order", async () => {
    const result = await store.create({
      id: 2,
      status: "active",
      user_id: 2,
    });
    expect(result).toEqual({
      id: 2,
      status: "active",
      user_id: 2,
    });
  });

  it("index method should return a list of orders", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 2,
        status: "active",
        user_id: 2,
      },
    ]);
  });

  it("show method should return the correct order", async () => {
    const result = await store.show(2);
    expect(result).toEqual({
      id: 2,
      status: "active",
      user_id: 2,
    });
  });

  it("currentOrderByUser method should return the active order", async () => {
    const result = await store.currentOrderByUser(2);
    expect(result).toEqual({
      id: 2,
      status: "active",
      user_id: 2,
    });
  });

  it("addProduct method should return the added order-product", async () => {
    const result = await store.addProduct(5, 2, 2);
    expect(result).toEqual({
      id: 2,
      quantity: 5,
      order_id: 2,
      product_id: 2,
    });
  });

  it("edit method should return the edited order", async () => {
    const result = await store.edit({
      id: 2,
      status: "completed",
      user_id: 2,
    });
    expect(result).toEqual({
      id: 2,
      status: "completed",
      user_id: 2,
    });
  });

  it("show method should return the correct order", async () => {
    const result = await store.show(2);
    expect(result).toEqual({
      id: 2,
      status: "completed",
      user_id: 2,
    });
  });

  it("completedOrdersByUser method should return the completed order(s)", async () => {
    const result = await store.completedOrdersByUser(2);
    expect(result).toEqual([
      {
        id: 2,
        status: "completed",
        user_id: 2,
      },
    ]);
  });

  it("delete method should remove the order", async () => {
    store.delete(2);
    const result = await store.index();

    expect(result.length).toEqual(0);
  });
});

describe("Dashboard Query", () => {
  const store = new DashboardQueries();

  it("fiveMostPopular method should return the five most popular products", async () => {
    const result = await store.fiveMostPopular();
    expect(result.length).toBeLessThanOrEqual(5);
  });
});

describe("User Model", () => {
  const store = new UserStore();
  it("delete method should remove the user", async () => {
    await store.delete(2);
    const result = await store.index();

    expect(result).toEqual([]);
  });
});

describe("Product Model", () => {
  const store = new ProductStore();
  it("delete method should remove the product", async () => {
    await store.delete(2);
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
