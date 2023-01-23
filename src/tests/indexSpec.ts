import app from "../server";
import supertest from "supertest";

describe("Test endpoint responses", (): void => {
  const request = supertest(app);
  it("gets the api endpoint successfully", async (): Promise<void> => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});

describe("User endpoint", () => {
  const request = supertest(app);
  it("gets the index api endpoint successfully", async (): Promise<void> => {
    const response = await request.get("/users");
    expect(response.status).toBe(200);
  });

  it("gets the create api endpoint successfully", async (): Promise<void> => {
    const response = await request.post("/users").send({
      username: "daniel.ibeh",
      first_name: "Daniel",
      last_name: "Ibeh",
      password: "charity",
    });
    expect(response.status).toBe(200);
  });

  it("gets the show api endpoint successfully", async (): Promise<void> => {
    const response = await request.get("/users/1");
    expect(response.status).toBe(200);
  });

  it("gets the edit api endpoint successfully", async (): Promise<void> => {
    const response = await request.put("/users/1").send({
      username: "daniel.ibeh",
      first_name: "Michael",
      last_name: "Ibeh",
      password: "charity",
    });
    expect(response.status).toBe(200);
  });
});

describe("Product endpoint", () => {
  const request = supertest(app);
  it("gets the index api endpoint successfully", async (): Promise<void> => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });

  it("gets the create api endpoint successfully", async (): Promise<void> => {
    const response = await request.post("/products").send({
      name: "Pencil",
      price: 10,
      category: "stationery",
    });
    expect(response.status).toBe(200);
  });

  it("gets the show api endpoint successfully", async (): Promise<void> => {
    const response = await request.get("/products/1");
    expect(response.status).toBe(200);
  });

  it("gets the edit api endpoint successfully", async (): Promise<void> => {
    const response = await request.put("/products/1").send({
      name: "Eraser",
      price: 20,
      category: "stationery",
    });
    expect(response.status).toBe(200);
  });
});

describe("Order endpoint", () => {
  const request = supertest(app);
  it("gets the index api endpoint successfully", async (): Promise<void> => {
    const response = await request.get("/orders");
    expect(response.status).toBe(200);
  });

  it("gets the create api endpoint successfully", async (): Promise<void> => {
    const response = await request.post("/orders").send({
      id: 1,
      status: "active",
      user_id: 1,
    });
    expect(response.status).toBe(200);
  });

  it("gets the show api endpoint successfully", async (): Promise<void> => {
    const response = await request.get("/orders/1");
    expect(response.status).toBe(200);
  });

  it("gets the addProducts api endpoint successfully", async (): Promise<void> => {
    const response = await request.post("/orders/1/products").send({
      productId: 1,
      quantity: 5,
    });
    expect(response.status).toBe(200);
  });

  it("gets the currentOrderByUser api endpoint successfully", async (): Promise<void> => {
    const response = await request.get("/orders/active/1");
    expect(response.status).toBe(200);
  });

  it("gets the edit api endpoint successfully", async (): Promise<void> => {
    const response = await request.put("/orders/1").send({
      id: 1,
      status: "completed",
      user_id: 1,
    });
    expect(response.status).toBe(200);
  });

  it("gets the completedOrdersByUser api endpoint successfully", async (): Promise<void> => {
    const response = await request.get("/orders/completed/1");
    expect(response.status).toBe(200);
  });

  it("gets the delete api endpoint successfully", async (): Promise<void> => {
    const response = await request.delete("/orders/1");
    expect(response.status).toBe(200);
  });
});

describe("Dashboard Endpoint", () => {
  const request = supertest(app);
  it("gets the fiveMostPopular api endpoint successfully", async (): Promise<void> => {
    const response = await request.get("/five_most_popular");
    expect(response.status).toBe(200);
  });
});

describe("User endpoint", () => {
  const request = supertest(app);
  it("gets the delete api endpoint successfully", async (): Promise<void> => {
    const response = await request.delete("/users/1");
    expect(response.status).toBe(200);
  });
});

describe("Product endpoint", () => {
  const request = supertest(app);
  it("gets the delete api endpoint successfully", async (): Promise<void> => {
    const response = await request.delete("/products/1");
    expect(response.status).toBe(200);
  });
});
