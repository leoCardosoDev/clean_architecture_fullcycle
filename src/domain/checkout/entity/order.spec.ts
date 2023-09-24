import Order from "./order";
import OrderItem from "./order_item";

describe("Order Unit test", () => {
  
  it("Should throw error when ID is empty", () => {
    expect(() => {
      const order = new Order("", "123", []);
    }).toThrowError("ID is required!");
  });

  it("Should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("123", "", []);
    }).toThrowError("CustomerId is required!");
  });

  it("Should throw error when OrderItem is 0", () => {
    expect(() => {
      const order = new Order("123", "123", []);
    }).toThrowError("Item qtd must be greater than 0");
  });

  it("Should calculate total", () => {
    const item1 = new OrderItem("it1", "p1", "Item 1", 100, 2);
    const item2 = new OrderItem("it2", "p2", "Item 2", 200, 2);
    const item3 = new OrderItem("it3", "p3", "Item 3", 0, 2);
    const order = new Order("123", "123", [item1, item2, item3]);
    const total = order.total();
    expect(total).toBe(600);
  });

  it("Should throw error if quantity is greater than zero(0)", () => { 
    expect(() => {
      const item1 = new OrderItem("it1", "p1", "Item 1", 100, 0);
      const order = new Order("123", "123", [item1]);
    }).toThrowError("Quantity must be greater than zero!");
  });

});
