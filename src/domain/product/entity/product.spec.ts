import Product from "./product";

describe("Product Unit test", () => {

  it("Should throw error when ID is required", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("ID is required!");
  });

  it("Should throw error when Name is required", () => {
    expect(() => {
      const product = new Product("1", "", 100);
    }).toThrowError("Name is required!");
  });

  it("Should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("1", "Product 1", -1);
    }).toThrowError("Price must be greater than zero!");
  });

  it("Should change name", () => {
    const product = new Product("1", "Product Name 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("Should change price", () => {
    const product = new Product("1", "Product Name 1", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });

});
