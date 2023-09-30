import {app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
  beforeEach(async () => {
    await sequelize.sync({force: true})
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "John",
      address: {
        street: "Street",
        number: 12,
        zip: "00000000",
        city: "City"
      }
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John");
    expect(response.body.address.street).toBe("Street");
    expect(response.body.address.number).toBe(12);
    expect(response.body.address.zip).toBe("00000000");
    expect(response.body.address.city).toBe("City");
  });

  it("Should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "John"
    });
    expect(response.status).toBe(500);
  });

  it("Should list all customer", async () => {
    const customer1 = await request(app).post("/customer").send({
      name: "John",
      address: {
        street: "Street 1",
        number: 12,
        zip: "00000000",
        city: "City"
      }
    });
    expect(customer1.status).toBe(200);
    const customer2 = await request(app).post("/customer").send({
      name: "Ana",
      address: {
        street: "Street 2",
        number: 12,
        zip: "00000000",
        city: "City"
      }
    });
    expect(customer2.status).toBe(200);
    const listResponse = await request(app).get("/customer").send();
    expect(listResponse.statusCode).toBe(200);
    expect(listResponse.body.customers.length).toBe(2);
    const customeroutput1 = listResponse.body.customers[0];
    expect(customeroutput1.name).toBe("John");
    expect(customeroutput1.address.street).toBe("Street 1");
    const customeroutput2 = listResponse.body.customers[1];
    expect(customeroutput2.name).toBe("Ana");
    expect(customeroutput2.address.street).toBe("Street 2");

    const listResponseXml = await request(app).get("/customer")
    .set("Accept", "application/xml")
    .send();
    expect(listResponseXml.status).toBe(200);
    expect(listResponseXml.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
  });
});
